const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const HttpError = require('../helpers/middleWares/HttpError');
const { ctrlsWrapper } = require('../utils');
const User = require('../models/user');
// const { token } = require('morgan');
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }

  const hashPass = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPass });

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '20h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  // console.log(token);
  res.status(204).json();
};

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body.subscription, {
    new: true,
  });

  if (!result) {
    throw new HttpError(404, 'ID not found');
  }

  res.json({ email, subscription: req.body.subscription });
};

module.exports = {
  register: ctrlsWrapper(register),
  login: ctrlsWrapper(login),
  getCurrent: ctrlsWrapper(getCurrent),
  logout: ctrlsWrapper(logout),
  updateSubscription: ctrlsWrapper(updateSubscription),
};
