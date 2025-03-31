import bcryptjs from 'bcryptjs';

const hashPassword = async function (password) {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async function (password, hashedPassword) {
  const isValid = await bcryptjs.compare(password, hashedPassword);
  return isValid;
};

export { hashPassword, comparePassword };
