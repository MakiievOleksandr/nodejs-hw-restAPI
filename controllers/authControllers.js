const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../helpers/HttpError');
const { ctrlsWrapper } = require('../utils');

const User = require('../models/user');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email alredy in use');
  }

  const hashPass = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPass });

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '20h' });

  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { name, email } = req.user;

  res.json({ name, email });
};

module.exports = {
  register: ctrlsWrapper(register),
  login: ctrlsWrapper(login),
  getCurrent: ctrlsWrapper(getCurrent),
};
