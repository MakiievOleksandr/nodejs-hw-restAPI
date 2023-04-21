const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');

const HttpError = require('../helpers/middleWares/HttpError');
const { ctrlsWrapper } = require('../utils');
const User = require('../models/user');
require('dotenv').config();
const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');
const { editImage } = require('../utils');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }

  const hashPass = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const result = await User.create({
    ...req.body,
    password: hashPass,
    avatarUrl,
  });

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarUrl,
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

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  await editImage(tempUpload, 250, 250);
  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, avatarName);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join('avatars', avatarName);
  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({ avatarUrl });
};

module.exports = {
  register: ctrlsWrapper(register),
  login: ctrlsWrapper(login),
  getCurrent: ctrlsWrapper(getCurrent),
  logout: ctrlsWrapper(logout),
  updateSubscription: ctrlsWrapper(updateSubscription),
  updateAvatar: ctrlsWrapper(updateAvatar),
};
