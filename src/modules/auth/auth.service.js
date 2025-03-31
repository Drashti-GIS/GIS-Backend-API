import db from '../../database/models/index.js';
import { generateOtp, generateRandomKey, validateOtp } from '../../shared/utils/common.js';
import { jwt as _jwt } from '../../config/config.js';
import { hashPassword } from '../../services/bcrypt.service.js';

const { Users } = db;

export const loginUserWithEmailAndPassword = async (email, password, role) => {
  const user = await Users.scope('withPassword').findOne({ where: { email, role } });
  if (!user) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Incorrect email or role.');
  }
  if (!(await user.isPasswordMatch(password))) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Incorrect password.');
  }

  return user;
};

export const sendForgotPasswordEmail = async (body) => {
  const { email } = body;
  const { otp, otpExpiration } = generateOtp();

  const user = await Users.findOne({ where: { email, status: 'active' } });
  if (!user) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'User not found.');
  }
  const name = `${user.firstName}`;

  await Users.update({ otp, otpExpiration }, { where: { email } });
};

export const forgotPasswordVerification = async (body) => {
  const { otp, email } = body;
  const user = await validateOtp(email, otp);
  if (!user) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'The OTP you entered is invalid or has expired.');
  }
  const passwordResetKey = await generateRandomKey();
  await Users.update({ passwordResetKey, otp: null, otpExpiration: null }, { where: { email } });
  return passwordResetKey;
};

export const resetUserPassword = async (body) => {
  const { email, password, resetKey } = body;
  const isValidToUpdate = await Users.findOne({
    where: { email, passwordResetKey: resetKey },
  });
  if (!isValidToUpdate) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'The password reset key is invalid or has expired.');
  }
  const hashedPassword = await hashPassword(password);
  await Users.update({ password: hashedPassword, passwordResetKey: null }, { where: { email } });
};

export const updateUserPassword = async (userId, body) => {
  const { oldPassword, newPassword } = body;
  const user = await Users.scope('withPassword').findByPk(userId);
  if (!user) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, 'user not found.');
  }
  const isMatch = await user.isPasswordMatch(oldPassword);
  if (!isMatch) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Old password is incorrect.');
  }
  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();
};
