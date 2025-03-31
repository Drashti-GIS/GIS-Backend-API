import { verifyToken } from '../services/jwt.service.js';
import db from '../database/models/index.js';

const { Users } = db;

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Authentication token is missing'));
      }
      const decoded = verifyToken(token);
      const user = await Users.findOne({ where: { id: decoded.id } });

      if (!user || (roles.length && !roles.includes(user.role))) {
        return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Access denied'));
      }

      req.user = user;
      return next();
    } catch (err) {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Unauthorized'));
    }
  };
};

export default authMiddleware;
