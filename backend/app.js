var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./config/database');
const cors = require('cors');

database.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(error => console.log('Error: ' +error));

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var carRouter = require('./routes/car');
var rentalRouter = require('./routes/rental');


var app = express();
app.use(cors());

app.get('/', ((req, res) => {
  res.status(200);
  res.send("You are not my friend, you are my brother my friend");
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/car', carRouter);
app.use('/rental', rentalRouter);

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