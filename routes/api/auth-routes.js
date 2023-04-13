const express = require('express');

const { validateBody } = require('../../utils');

const { register } = require('../../controllers/authControllers');

const schemas = require('../../utils/validating/userValidation');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), register);

module.exports = router;
