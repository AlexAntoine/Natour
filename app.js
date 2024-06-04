const express = require('express');
const morgan = require('morgan');

const app = express();

// 1 Middlewares
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`))
app.use(express.json());

const tourRouter = require('./routes/tourRouter');
const usersRouter = require('./routes/usersRouter')

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',usersRouter);

module.exports = app;