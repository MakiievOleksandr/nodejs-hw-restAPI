const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const HttpError = require('../HttpError');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(new HttpError(401, 'Unauthorized'));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user) {
      next(new HttpError(401, 'Unauthorized error'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new HttpError(401, 'Unauthorized. Please, sign in again!'));
  }
};

module.exports = authenticate;
