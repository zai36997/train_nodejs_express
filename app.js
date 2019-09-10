var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose')
const config = require('./config/index')
const settingRouter = require('./routes/setting')

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true , useCreateIndex: true})
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/user',usersRouter)
app.use('/api/setting', settingRouter);
//Mongoose เชื่อมต่อ MongoDB

  
module.exports = app;
