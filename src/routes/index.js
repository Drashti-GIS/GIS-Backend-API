import { Router } from 'express';
import { authRoute } from '../modules/auth/index.js';
import { usersRoutes } from '../modules/users/index.js';

const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: usersRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
