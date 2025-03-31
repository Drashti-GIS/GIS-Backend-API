import { app_name } from '../../config/config.js';

export const SYSTEM_ROLES = {
  admin: 'admin',
  user: 'user',
};

export const mailSubject = {
  signup: `Welcome to ${app_name}!`,
  forgotPass: 'Forgot Password - OTP',
};
