import { Router } from 'express';
import * as userController from './users.controller.js';
import * as userValidation from './users.validation.js';

import authMiddleware from '../../middlewares/auth.middleware.js';
import { SYSTEM_ROLES } from '../../shared/constants/constant.js';
import validate from '../../middlewares/validate.js';

const router = Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(authMiddleware([SYSTEM_ROLES.admin]), userController.getUsers);

router.route('/:userId').get(authMiddleware([SYSTEM_ROLES.admin]), userController.getUser);

export default router;
