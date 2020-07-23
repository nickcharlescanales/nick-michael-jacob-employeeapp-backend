var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require ('cors');
var mongoose = require ('mongoose');
//var bodyParser = require ('body-parser');
var dbConfig = require('./database/db');

// Connecting with mongo db
mongoose.Promise = global.Promise;
console.log(dbConfig)
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//a backend api doesnet require views we only respond with json
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Setting up port with express js
const employeeRoute = require('./routes/employee')
app.use('/api', employeeRoute);

app.use(cors()); 
//app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
//app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));


// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

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
console.log("hello its wensday")
module.exports = app;
