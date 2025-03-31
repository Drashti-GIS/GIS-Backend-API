import { Router } from 'express';
import * as userController from './users.controller.js';
import * as userValidation from './users.validation.js';

import authMiddleware from '../../middlewares/auth.middleware.js';
import { systemRoles } from '../../shared/constants/constant.js';
import validate from '../../middlewares/validate.js';

const router = Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(authMiddleware([systemRoles.superAdmin, systemRoles.admin]), userController.getUsers);

router.route('/:userId').get(authMiddleware([systemRoles.superAdmin, systemRoles.distributor]), userController.getUser);

export default router;
