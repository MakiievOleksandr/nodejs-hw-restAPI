const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs/promises');
const moment = require('moment');

const contactsRouter = require('./routes/api/contacts');
const errorHandler = require('./helpers/middleWares/errorHandler')

const app = express(); 

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');
  await fs.appendFile('./public/server.log', `\n${method} ${url} ${date}`);
  next();
});

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use(errorHandler);

module.exports = app;
