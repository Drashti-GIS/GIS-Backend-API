import { Router } from 'express';
import validate from '../../middlewares/validate.js';

import * as authController from './auth.controller.js';
import { register, login, changePassword, verifyToken, TwoFA } from './auth.validation.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { systemRoles } from '../../shared/constants/constant.js';

const router = Router();

router.post('/register', validate(register), authController.register);
router.post('/verify', validate(verifyToken), authController.verifyOTP);
router.post('/login', validate(login), authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-forgot-password', authController.verifyforgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post(
  '/change-password',
  authMiddleware([systemRoles.superAdmin, systemRoles.distributor]),
  validate(changePassword),
  authController.changePassword
);

export default router;
