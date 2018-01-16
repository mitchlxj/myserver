"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/27.
 */
var express = require("express");
var db = require("./database/db");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var ws_1 = require("ws");
var socket_1 = require("./socket");
var global_1 = require("./global");
var indexRouter = require('./router/index');
var userRouter = require('./router/taskmgr/user');
var testRouter = require('./router/test');
var movieRouter = require('./router/movie');
var authRouter = require('./router/myApp/auth');
var userQuestionRouter = require('./router/myApp/userQuestion');
var userAnswerRouter = require('./router/myApp/userAnswer');
var chatRouter = require('./router/myApp/chat');
var path = require('path');
var app = express();
var g = new global_1.global();
var ip = g.ip;
var port = Number(process.env.PORT) || g.port;
//连接数据库
db.connectDataBase();
app.set('superSecret', g.superSecret);
app.set('views', path.join(__dirname, 'views/pages'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var server = app.listen(port, ip, function () {
    console.log('服务器已经启动,端口为：' + port + ' IP地址为:' + ip);
});
//webSocket服务器
var socketDeal = new socket_1.SocketDeal();
var wsSever = new ws_1.Server({ port: g.socketPort });
wsSever.on('connection', function (websocket, request) {
    // console.log(websocket);
    var data = socketDeal.socketDealUrl(request.url);
    //添加websocket到数组中保存
    var msg = { type: 'connection', message: '欢迎连接服务器' };
    websocket.send(JSON.stringify(msg));
    socketDeal.socketAddClient(websocket, data['userId']);
    //开启监听socketClient的消息;
    socketDeal.socketGetMsgFromClientEvent(websocket);
    //开启群发推送心跳
    socketDeal.socketTimeSend();
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
app.use('/chat', chatRouter);
