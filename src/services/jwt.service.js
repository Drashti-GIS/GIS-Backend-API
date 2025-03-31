import pkg from 'jsonwebtoken';

import { jwt as _jwt } from '../config/config.js';

const { sign, verify } = pkg;

const { secretKey, expiresIn } = _jwt;

const generateToken = (user) => {
  try {
    const token = sign(user, secretKey, { expiresIn });
    return token;
  } catch (error) {
    return error;
  }
};

const generateResetPassToken = (email) => {
  try {
    const token = sign(email, secretKey, { expiresIn: '15m' });
    return token;
  } catch (error) {
    return null;
  }
};

const verifyToken = (token) => {
  try {
    const decoded = verify(token, secretKey);
    return decoded;
  } catch (error) {
    return error;
  }
};

export { generateToken, verifyToken, generateResetPassToken };
