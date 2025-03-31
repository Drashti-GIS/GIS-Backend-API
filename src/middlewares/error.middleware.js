import { UniqueConstraintError, ValidationError } from 'sequelize';
import { env } from '../config/config.js';
import logger from '../config/logger.js';

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (error instanceof UniqueConstraintError) {
    const message = `${error.errors[0].path} must be unique`;
    error = new ApiError(STATUS_CODES.BAD_REQUEST, message, false, err.stack);
  } else if (error instanceof ValidationError) {
    const message = error.errors.map((e) => e.message).join(', ');
    error = new ApiError(STATUS_CODES.BAD_REQUEST, message, false, err.stack);
  } else if (!(error instanceof ApiError)) {
    const code = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
    const message = error.message || STATUS_CODES[code];
    error = new ApiError(code, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { message } = err;
  let code = err.statusCode || 500;
  if (env === 'production' && !err.isOperational) {
    code = STATUS_CODES.INTERNAL_SERVER_ERROR;
    message = STATUS_CODES.INTERNAL_SERVER_ERROR;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code,
    message,
    ...(env === 'development' && { stack: err.stack }),
  };

  if (env === 'development') {
    logger.error(err);
  }

  return res.status(code).send(response);
};

export { errorConverter, errorHandler };
