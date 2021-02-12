require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Route imports

var indexRouter = require('./routes/index');
var authRoutes = require('./routes/auth');
var eventRoutes = require('./routes/event');
var userRoutes = require('./routes/user');


var app = express();
const PORT = process.env.PORT
var mongoose = require('mongoose');

//Connecting to DATABASE
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex: true
})
.then(() => console.log("DB connection succesful!"))
.catch(err => console.log(err))


//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes 
app.use('/', indexRouter);
app.use('/auth',authRoutes)
app.use('/event',eventRoutes)
app.use('/user',userRoutes)

//Listen 
app.listen(PORT,() => {
  console.log(`Server is up and running on ${PORT}`);
} )

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../frontend/.next'));
}



module.exports = app;
