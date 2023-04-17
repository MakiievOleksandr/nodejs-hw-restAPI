const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/api/auth-routes');
const contactsRouter = require('./routes/api/contactsRoutes');
const errorHandler = require('./helpers/middleWares/errorHandler');
const serverLogHandler = require('./helpers/middleWares/serverLogHandler');

require('dotenv').config();
const app = express();

app.use(serverLogHandler);

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((__, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use(errorHandler);

module.exports = app;
