"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/24.
 */
var express = require("express");
var ws_1 = require("ws");
var app = express();
app.get('/', function (request, response) { return response.send('欢迎您登陆222'); });
app.get('/login', function (request, response) { return response.send('接收到login'); });
var server = app.listen(8080, 'localhost', function () {
    console.log('服务器已经启动');
});
var wsServer = new ws_1.Server({ port: 8081 });
var subscriptions = new Set();
wsServer.on('connection', function (websocket) {
    subscriptions.add(websocket);
    websocket.on('message', function (message) {
        console.log('接收到客户端消息,消息内容是:' + message);
        console.log(subscriptions);
    });
});
var messageCount = 0;
setInterval(function () {
    subscriptions.forEach(function (ws) {
        if (ws.readystate === 1) {
            ws.send(JSON.stringify({ messageCount: messageCount++ }));
        }
        else {
        }
    });
}, 2000);
