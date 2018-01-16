/**
 * Created by Administrator on 2017/11/27.
 */
import * as express from 'express';
import * as db from './database/db';
import * as ejs from 'ejs';
import * as bodyParser from 'body-parser';

import { Server } from 'ws';
import { SocketDeal } from './socket';

import { setInterval } from 'timers';
import { Client } from '_debugger';

import {global} from './global';


const indexRouter = require('./router/index');
const userRouter = require('./router/taskmgr/user');
const testRouter = require('./router/test');
const movieRouter = require('./router/movie');
const authRouter = require('./router/myApp/auth');
const userQuestionRouter = require('./router/myApp/userQuestion');
const userAnswerRouter = require('./router/myApp/userAnswer');
const chatRouter =require('./router/myApp/chat');

const path = require('path');

const app = express();

const g = new global();

const ip = g.ip;

const port = Number(process.env.PORT) || g.port;

//连接数据库
db.connectDataBase();



app.set('superSecret', g.superSecret);

app.set('views', path.join(__dirname, 'views/pages'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(port, ip, () => {
    console.log('服务器已经启动,端口为：' + port + ' IP地址为:' + ip);

});

//webSocket服务器

const socketDeal = new SocketDeal();

const wsSever = new Server({ port: g.socketPort });

wsSever.on('connection', (websocket, request) => {
    // console.log(websocket);
    const data = socketDeal.socketDealUrl(request.url);
    //添加websocket到数组中保存
    const msg = {type:'connection',message:'欢迎连接服务器'};
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


