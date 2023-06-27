
// node libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path'); // core node library for parsing file and directory paths
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Set routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// set up mongoose connection
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const mongoDB  = "mongodb+srv://rick:M66ztJXbLjt9xb3o@cluster0.fzh5ilb.mongodb.net/?retryWrites=true&w=majority"
main().catch((err) => console.log(err))
async function main() { await mongoose.connect(mongoDB)}



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware libraries
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve all the static files in the /public directory
app.use(express.static(path.join(__dirname, 'public')));

// define routes for the different parts of site
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
