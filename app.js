const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const contactsRouter = require('./routes/api/contactsRoutes');
const errorHandler = require('./helpers/middleWares/errorHandler');
const serverLogHandler = require('./helpers/middleWares/serverLogHandler');

const app = express();

app.use(serverLogHandler);

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((__, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use(errorHandler);

module.exports = app;
