import Joi from 'joi';
import { password } from '../../shared/validations/custom.validation.js';

export const register = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().optional(),
    referralSource: Joi.string().optional(),
  }),
};

export const verifyToken = {
  email: Joi.string().required().email(),
  otp: Joi.string().required(),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  }),
};

export const headerSchema = {
  headers: Joi.object({
    authorization: Joi.string()
      .required()
      .pattern(/^Bearer\s/)
      .messages({
        'string.empty': 'Authorization header is required!',
        'string.pattern.base': "Authorization header must start with 'Bearer '",
      }),
  }).unknown(),
};

export const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
  }),
};

export const TwoFA = {
  body: Joi.object().keys({
    isTwoFactorEnabled: Joi.boolean().required(),
  }),
};
