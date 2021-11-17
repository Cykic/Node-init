const express = require('express');

const globalErrorHandler = require('./src/error/errorController');
const APIError = require('./src/error/apiError');
const docRoute = require('./src/routes/documentation');
const middlewares = require('./src/middlewares/middleware');

//Start express app
const app = express();

// MIDDLEWARES
middlewares(app);

// ROUTES
app.use('/api/v1/documentation', docRoute);

//404 Route
app.use('*', (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
