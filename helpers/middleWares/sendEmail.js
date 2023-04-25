const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SG_API_KEY } = process.env;

sgMail.setApiKey(SG_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: 'alsermak@gmail.com' };
  await sgMail.send(email);
  return true;
};

// const email = {
//   to: 'wotaged780@larland.com',
//   from: 'alsermak@gmail.com',
//   subject: 'Test mail',
//   html: '<p>Test EMAIL from localhost:3000</p>',
// };

// sgMail
//   .send(email)
//   .then(() => console.log('Email send successfully'))
//   .catch(err => console.log(err.message));

module.exports = sendEmail;
