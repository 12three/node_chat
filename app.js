const createError = require('http-errors');
const express = require('express');
const path = require('path');
const log = require('./libs/log')(module);
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./config');
const logger = require('morgan');
const mongoose = require('./libs/mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine' , 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    session({
        secret: config.get('session:secret'),
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    }),
);

app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

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
