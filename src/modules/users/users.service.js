import { Op, Sequelize } from 'sequelize';
import moment from 'moment';
import db from '../../database/models/index.js';
import { generateToken } from '../../services/jwt.service.js';
import { sendSignUpEmail } from '../../services/nodemailer.service.js';
import { generatePaginatedResponse, getPagination, validateOtp } from '../../shared/utils/common.js';
import { hashPassword } from '../../services/bcrypt.service.js';

const { Users } = db;

export const createUser = async (userBody) => {
  const { fullName, email, password, role } = userBody;
  const userAlreadyExists = await Users.findOne({ where: { email } });
  if (userAlreadyExists) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'User already exists !');
  }
  const hashedPassword = await hashPassword(password);
  const [firstName, lastName] = fullName.split(' ');
  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  };

  await Users.create(newUser);

  await sendSignUpEmail(email, firstName);

  delete newUser.password;
  return newUser;
};
export const verifyUser = async (body, transaction) => {
  const { otp, email } = body;

  const user = await validateOtp(email, otp);
  if (!user) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'The OTP you entered is invalid or has expired.');
  }

  const users = await Users.findOne({
    where: { email },
    transaction,
  });

  if (!users) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, 'User does not exist !');
  }

  // Update user status and Stripe account ID if applicable
  await Users.update(
    {
      otp: null,
      otpExpiration: null,
      status: 'active',
    },
    {
      where: { email },
      transaction,
    }
  );

  const tokenPayload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };

  const token = await generateToken(tokenPayload);
  return {
    message: 'Verification successful!',
    data: { token },
  };
};
export const getUsers = async (queryParams) => {
  // Only apply pagination if both limit and page are provided
  const hasPagination = queryParams.limit && queryParams.page;
  const paginationOptions = hasPagination ? getPagination(queryParams) : {};
  const page = hasPagination ? parseInt(queryParams.page) : 1;

  const attributes = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'profileImage',
    'isActive',
    'isVerified',
    'countryCode',
    'createdAt',
    'updatedAt',
  ];

  const query = {
    attributes,
    ...(hasPagination ? paginationOptions : {}),
  };
  const userList = await Users.findAndCountAll(query);

  return generatePaginatedResponse(userList, paginationOptions, page);
};
export const getUserById = async (id) => {
  return Users.findById(id);
};

export const getUserByEmail = async (email) => {
  return Users.findOne({ email });
};
export const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};
