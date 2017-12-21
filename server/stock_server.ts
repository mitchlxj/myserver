/**
 * Created by Administrator on 2017/11/24.
 */
import * as express from 'express';
import {Server} from "ws";

const app = express();

app.get('/', (request, response) => response.send('欢迎您登陆222'));

app.get('/login', (request, response) => response.send('接收到login'));

const server = app.listen(8080, 'localhost', () => {
    console.log('服务器已经启动');
});


const wsServer = new Server({port: 8081});
const subscriptions =new Set<any>();

wsServer.on('connection', websocket => {
        subscriptions.add(websocket);
        websocket.on('message', message => {
       console.log('接收到客户端消息,消息内容是:'+ message);
       console.log(subscriptions);
   })
});



let messageCount = 0;

setInterval(() => {

    subscriptions.forEach(ws => {
        if(ws.readystate === 1) {
            ws.send(JSON.stringify({messageCount: messageCount++}));
        } else {

        }
    })
}, 2000);