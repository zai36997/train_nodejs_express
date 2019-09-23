var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose')
const config = require('./config/index')
const settingRouter = require('./routes/setting')
const errorHander = require('./middlewares/errorHandler')
const passportJWT = require('./middlewares/passoprtJWT')
const shopRouter = require('./routes/shop')
const cors = require ('cors')


mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true , useCreateIndex: true})
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/user',usersRouter)
app.use('/api/setting',passportJWT.isLogin, settingRouter);
app.use('/api/shop', shopRouter);
//Mongoose เชื่อมต่อ MongoDB

app.use(errorHander)
  
module.exports = app;
