/* eslint-disable radix */
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../../database/models/index.js';

// Resolve __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Users, disputes, projects, invoices } = db;

export const generateRandomKey = async () => {
  const passwordResetKey = uuidv4() + uuidv4();
  return passwordResetKey;
};

export const generateOtp = () => {
  const min = 100000;
  const max = 999999;
  const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return {
    otp: Math.floor(Math.random() * (max - min + 1)) + min,
    otpExpiration,
  };
};

export const validateOtp = async (email, otp) => {
  const user = await Users.findOne({
    where: {
      email,
      otp,
      otpExpiration: {
        [Op.gt]: new Date(), // Checks if otpExpiration is greater than the current time
      },
    },
  });

  // If user exists and OTP is valid
  if (user) {
    return user;
  }
  return false;
};

export const deleteLocalFile = (localPath) => {
  try {
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPagination = (queryParams, defaultLimit = 10) => {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || defaultLimit;
  const offset = (page - 1) * limit;

  let order = [];
  if (queryParams.sortBy && queryParams.order) {
    order = [[queryParams.sortBy, queryParams.order.toUpperCase()]];
  }

  return {
    limit,
    offset,
    order,
  };
};

export const generatePaginatedResponse = (data, paginationOptions, page) => {
  const limit = paginationOptions?.limit;
  return {
    result: data.rows,
    pagination: {
      totalItems: data.count,
      totalPages: limit ? Math.ceil(data.count / limit) : 1,
      currentPage: page,
    },
  };
};
