const express = require('express');

const { validateBody } = require('../../utils');
const { authenticate, upload } = require('../../helpers/middleWares');
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require('../../controllers/authControllers');
const schemas = require('../../utils/validating/userValidation');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), register);

router.post('/login', validateBody(schemas.loginSchema), login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.subscribeSchema),
  updateSubscription
);

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;
