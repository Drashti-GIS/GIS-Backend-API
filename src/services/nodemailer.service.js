import { createTransport } from 'nodemailer';
import getSignUpEmail from '../templates/welcomeEmail.template.js';
import { mailSubject, SYSTEM_ROLES } from '../shared/constants/constant.js';

import db from '../database/models/index.js';

const { Users } = db;

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendEmail = async (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

export const sendSignUpEmail = async (email, name) => {
  const mailOptions = {
    from: '"Yamaha-music" <no-reply@yamaha.com>',
    to: email,
    subject: mailSubject.signup,
    html: getSignUpEmail(name),
  };

  await sendEmail(mailOptions);
};
