/**
 * Created by Administrator on 2017/11/27.
 */
import * as express from 'express';
import * as db from './database/db';
import * as ejs from 'ejs';
import * as bodyParser from 'body-parser';



const indexRouter = require('./router/index');
const userRouter = require('./router/taskmgr/user');
const testRouter = require('./router/test');
const movieRouter = require('./router/movie');
const authRouter = require('./router/myApp/auth');

const path = require('path');

const app = express();

const ip = '192.168.1.103';

const port = Number(process.env.PORT) || 3500;

//连接数据库
db.connectDataBase();

app.set('ip',ip);
app.set('port',port);

app.set('superSecret', 'mitchlxj have a good future');

app.set('views',path.join(__dirname,'views/pages'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const server = app.listen(port, ip, () => {
    console.log('服务器已经启动,端口为：'+ port+' IP地址为:'+ip);
});


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type,Accept,X-Access-Token,X-Key,multipart/form-data");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use('/', indexRouter);
app.use('/users',userRouter);

app.use('/test', testRouter);
app.use('/movie', movieRouter);
app.use('/myappAuth',authRouter);