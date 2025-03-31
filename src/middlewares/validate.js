import Joi from 'joi';
import pick from '../shared/utils/pick.js';

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body', 'headers']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message.replace(/"/g, ''));
    return next(new ApiError(STATUS_CODES.BAD_REQUEST, errorMessage[0]));
  }

  Object.assign(req, value);
  return next();
};

export default validate;
