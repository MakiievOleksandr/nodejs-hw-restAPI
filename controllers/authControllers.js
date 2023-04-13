const HttpError = require('../helpers/HttpError');

const { ctrlsWrapper } = require('../utils');

const User = require('../models/user');

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email alredy in use');
  }
  const result = await User.create(req.body);

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = {
  register: ctrlsWrapper(register),
};
