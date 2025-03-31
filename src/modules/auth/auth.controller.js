import {
  loginUserWithEmailAndPassword,
  sendForgotPasswordEmail,
  resetUserPassword,
  forgotPasswordVerification,
} from './auth.service.js';
import { usersServices } from '../users/index.js';
import { generateToken } from '../../services/jwt.service.js';

export const register = catchAsync(async (req, res) => {
  const user = await usersServices.createUser(req.body);
  return res.successResponse(STATUS_CODES.CREATED, { data: user, message: 'Registration successful !' });
});

export const verifyOTP = catchAsync(async (req, res) => {
  const result = await apiHandlerWithTransaction(async (transaction) => {
    const verifyResult = await usersServices.verifyUser(req.body, transaction);
    return verifyResult;
  });
  return res.successResponse(STATUS_CODES.OK, { data: result });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUserWithEmailAndPassword(email, password);
  if (!user.isVerified || !user.isActive) {
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Please verify your account.');
  }
  const tokenData = {
    id: user?.id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };

  const token = generateToken(tokenData);
  return res.successResponse(STATUS_CODES.OK, { data: { token }, message: 'Login successful!' });
});

export const forgotPassword = catchAsync(async (req, res) => {
  await sendForgotPasswordEmail(req.body);
  return res.successResponse(STATUS_CODES.OK, { message: 'Forgot password process successful!' });
});

export const verifyforgotPassword = catchAsync(async (req, res) => {
  const result = await forgotPasswordVerification(req.body);
  return res.successResponse(STATUS_CODES.OK, { data: result, message: 'OTP verification successful!' });
});

export const resetPassword = catchAsync(async (req, res) => {
  await resetUserPassword(req.body);
  return res.successResponse(STATUS_CODES.OK, { message: 'Password reset successful!' });
});

export const changePassword = catchAsync(async (req, res) => {
  // await updateUserPassword(req.user.id, req.body);
  return res.successResponse(STATUS_CODES.OK, { message: 'Password changed successfully!' });
});
