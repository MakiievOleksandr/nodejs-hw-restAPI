const errorHandler = (err, req, res, next) => {
  console.log('err.message:', err.message);
  const { name, code } = err;
  res
    .status(
      (err.statusCode =
        name === 'MongoServerError' && code === 11000
          ? 409
          : err.statusCode || 400) || 500
    )
    .json({
      message: err.message || 'Something went wrong! please, try again later',
    });
  next();
};

module.exports = errorHandler;
