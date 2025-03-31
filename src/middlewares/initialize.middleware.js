import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { successHandler, errorHandler as _errorHandler } from '../config/morgan.js';
import { errorConverter, errorHandler } from './error.middleware.js';
import { successResponse } from '../shared/utils/index.js';

import routes from '../routes/index.js';

export default function CommonMiddleware(app) {
  // parse json request body
  app.use(
    express.json({
      limit: `10mb`,
    })
  );

  // parse urlencoded request body
  app.use(
    express.urlencoded({
      limit: '10mb',
      extended: true,
      parameterLimit: 10000,
    })
  );

  app.use(successHandler);
  app.use(_errorHandler);

  // set security HTTP headers
  app.use(helmet());

  /**
   * CORS middleware
   */
  app.use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Origin', ' X-Requested-With', ' Content-Type', ' Accept ', 'Authorization'],
      credentials: true,
    })
  );

  // Against brute attack
  const rateLimiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!',
  });

  app.use('api', rateLimiter);

  /**
   * Register Routes
   */
  app.use(
    '/api',
    (req, res, next) => {
      res.successResponse = successResponse;
      next();
    },
    routes
  );

  // Send back a 404 error for any unknown api request
  app.use((req, res, next) => {
    next(new ApiError(STATUS_CODES.NOT_FOUND, `The requested resource ${req.originalUrl} was not found `));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  /**
   * Mount global error handler
   */
  app.use(errorHandler);
}
