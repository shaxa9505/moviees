const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require("./routes/movies");
const directorRouter = require("./routes/directors");

const app = express();

const db = require("./helper/db")();


// dnU8HBFAi0kSEEec mongodb onlayn parol


// CONFIG SECRET_KEY MAHFIY KALITIMIZ
const config = require("./config");

app.set("api_secret_key", config.api_secter_key);


// MIDDLEWARE 

const tokenverify = require("./middleware/token-verify")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', tokenverify);
app.use('/api/movies', moviesRouter);
app.use('/api/directors', directorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
