const express = require('express');

const { validateBody } = require('../../utils');

const { authenticate } = require('../../helpers/middleWares');

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
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

module.exports = router;
