const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
  to: 'wotaged780@larland.com',
  from: 'alsermak@gmail.com',
  subject: 'Test mail',
  html: '<p>Test EMAIL from localhost:3000</p>',
};

sgMail
  .send(email)
  .then(() => console.log('Email send successfully'))
  .catch(err => console.log(err.message));

module.exports = sgMail;
