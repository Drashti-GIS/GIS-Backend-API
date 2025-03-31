import Joi from 'joi';
import { password, validateUUID } from '../../shared/validations/custom.validation.js';

export const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required(),
  }),
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// export const getUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(validateUUID),
//   }),
// };
