"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/27.
 */
var express = require("express");
var db = require("./database/db");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var indexRouter = require('./router/index');
var userRouter = require('./router/taskmgr/user');
var testRouter = require('./router/test');
var movieRouter = require('./router/movie');
var authRouter = require('./router/myApp/auth');
var userQuestionRouter = require('./router/myApp/userQuestion');
var userAnswerRouter = require('./router/myApp/userAnswer');
var path = require('path');
var app = express();
var ip = '192.168.1.111';
var port = Number(process.env.PORT) || 3500;
//连接数据库
db.connectDataBase();
app.set('ip', ip);
app.set('port', port);
app.set('superSecret', 'mitchlxj have a good future');
app.set('views', path.join(__dirname, 'views/pages'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var server = app.listen(port, ip, function () {
    console.log('服务器已经启动,端口为：' + port + ' IP地址为:' + ip);
});
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type,Accept,X-Access-Token,X-Key,multipart/form-data");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/test', testRouter);
app.use('/movie', movieRouter);
app.use('/myappAuth', authRouter);
app.use('/userQuestion', userQuestionRouter);
app.use('/userAnswer', userAnswerRouter);
