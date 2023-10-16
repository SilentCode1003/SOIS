var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dashboardRouter = require('./routes/dashboard');
var masterEmployeeRouter = require('./routes/masteremployee');
// var masterAccessRouter = require('./routes/masteraccess');
// var masterPositionRouter = require('./routes/masterposition');
// var masterPaymentRouter = require('./routes/masterpayment');
// var masterCategoryRouter = require('./routes/mastercategory');
// var masterUserRouter = require('./routes/masteruser');
// var masterStoreRouter = require('./routes/masteruser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboardRouter);
app.use('/masteremployee', masterEmployeeRouter);
// app.use('/access', masterAccessRouter);
// app.use('/position', masterPositionRouter);
// app.use('/payment', masterPaymentRouter);
// app.use('/category', masterCategoryRouter);
// app.use('/user', masterUserRouter);
// app.use('/store', masterStoreRouter);

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
