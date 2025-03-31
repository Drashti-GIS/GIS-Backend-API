export const validateUUID = (value, helpers) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(value)) {
    return helpers.message('{{#label}} must be a valid UUID');
  }
  return value;
};

// export const password = (value, helpers) => {
//   if (value.length < 8) {
//     return helpers.message('password must be at least 8 characters');
//   }
//   if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//     return helpers.message('password must contain at least 1 letter and 1 number');
//   }
//   return value;
// };
export const password = (value, helpers) => {
  if (value.length < 8 || value.length > 20) {
    return helpers.message('Password must be between 8 and 20 characters');
  }
  if (!value.match(/[A-Z]/)) {
    return helpers.message('Password must contain at least one uppercase letter');
  }
  if (!value.match(/\d/)) {
    return helpers.message('Password must contain at least one number');
  }
  if (!value.match(/[\W_]/)) {
    return helpers.message('Password must contain at least one special character');
  }
  if (value.match(/\s/)) {
    return helpers.message('Password must not contain spaces');
  }
  return value;
};
