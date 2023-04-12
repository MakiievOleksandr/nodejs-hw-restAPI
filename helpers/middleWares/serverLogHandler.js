const fs = require('fs/promises');
const moment = require('moment');

const serverLogHandler = async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');
  await fs.appendFile('./server.log', `\n${method} ${url} ${date}`);
  next();
};

module.exports = serverLogHandler;
