"use strict";
//socket处理函数
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = require("./global");
var http = require("http");
var querystring = require('querystring');
var SocketDeal = /** @class */ (function () {
    function SocketDeal() {
        this.socketClient = [];
        this.g = new global_1.global();
    }
    SocketDeal.prototype.socketDealUrl = function (url) {
        var data = [];
        var val = url.split('/');
        for (var i = 1; i < val.length; i += 2) {
            data[val[i]] = val[i + 1];
        }
        return data;
    };
    SocketDeal.prototype.socketAddClient = function (websocket, clientid) {
        if (!this.socketIsHaveClient(clientid)) {
            this.socketClient.push({ userId: clientid, ws: websocket });
        }
    };
    SocketDeal.prototype.socketRemoveClient = function (clientid) {
        if (this.socketIsHaveClient(clientid)) {
            for (var i = 0; i < this.socketClient.length; i++) {
                if (this.socketClient[i].userId === clientid) {
                    this.socketClient.splice(i, 1);
                }
            }
        }
    };
    SocketDeal.prototype.socketGetClient = function (clientid) {
        this.socketClient.forEach(function (socket) {
            if (socket.userId === clientid) {
                return socket;
            }
        });
        return null;
    };
    SocketDeal.prototype.socketIsHaveClient = function (clientid) {
        this.socketClient.forEach(function (socket) {
            if (socket.userId === clientid) {
                return true;
            }
        });
        return false;
    };
    /**
     * 接收客户端发送的JSON对象数据消息
     * 其中type为发送的数据类型，比如聊天为chat等等
     * 根据type类型来调用不同的处理方法，聊天会有对应的聊天对象。
     *
     * @param {any} websocket
     * @memberof SocketDeal
     */
    SocketDeal.prototype.socketGetMsgFromClientEvent = function (websocket) {
        var _this = this;
        websocket.on('message', function (message) {
            console.log('这是客户端发送的消息:' + JSON.stringify(message));
            var tmpMessage = JSON.parse(message);
            console.log(JSON.parse(message).message);
            switch (tmpMessage.type) {
                case 'chat':
                    _this.socketChatMessage(tmpMessage);
                    break;
                default:
            }
        });
    };
    SocketDeal.prototype.socketSendMsgToClient = function (clientid, message) {
        var _this = this;
        this.socketClient.forEach(function (socket) {
            if (socket.userId === clientid) {
                if (socket.ws.readyState === 1) {
                    socket.ws.send(JSON.stringify(message));
                }
                else {
                    _this.socketRemoveClient(socket.userId);
                }
            }
        });
    };
    SocketDeal.prototype.socketChatMessage = function (tmpMessage) {
        var ip = this.g.ip;
        var port = this.g.port.toString();
        var _message = querystring.stringify(tmpMessage);
        var options = {
            hostname: ip,
            port: port,
            path: '/chat/save?' + _message,
            method: 'GET'
        };
        var req = http.get(options, function (res) {
            var json = '';
            res.on('data', function (d) {
                json += d;
            });
            res.on('end', function () {
                json = JSON.parse(json);
                //返回回来对应发送的聊天对象，并发送到指定的客户端。
            });
        });
        req.on('error', function (e) {
            console.log(e.message);
        });
        req.end();
    };
    SocketDeal.prototype.socketTimeSend = function () {
        var _this = this;
        setInterval(function () {
            _this.socketClient.forEach(function (socket) {
                if (socket.ws.readyState === 1) {
                    socket.ws.send('这是定时发送的消息');
                }
                else {
                    _this.socketRemoveClient(socket.userId);
                }
            });
        }, 2000);
    };
    return SocketDeal;
}());
exports.SocketDeal = SocketDeal;
