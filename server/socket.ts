
//socket处理函数

import { global } from './global';
import * as http from 'http';
const querystring = require('querystring');

export class SocketDeal {


    public socketClient = [];

    g = new global();

    constructor() {

    }

    socketDealUrl(url: string) {

        const data = [];

        const val = url.split('/');
        for (let i = 1; i < val.length; i += 2) {
            data[val[i]] = val[i + 1];
        }
        return data;


    }


    socketAddClient(websocket, clientid) {

        if (!this.socketIsHaveClient(clientid)) {
            this.socketClient.push({ userId: clientid, ws: websocket });
        }
    }

    socketRemoveClient(clientid) {

        if (this.socketIsHaveClient(clientid)) {
            for (let i = 0; i < this.socketClient.length; i++) {
                if (this.socketClient[i].userId === clientid) {
                    this.socketClient.splice(i, 1);
                }
            }
        }
    }

    socketGetClient(clientid): any {
        let wsSocket = null;
        this.socketClient.forEach(socket => {
            if (socket.userId === clientid) {
                console.log('jjjjjjjjjjjj');

                wsSocket = socket;
            }
        })

        return wsSocket;
    }


    socketIsHaveClient(clientid): boolean {

        this.socketClient.forEach(socket => {
            if (socket.userId === clientid) {
                return true;
            }
        })

        return false;

    }
    /**
     * 接收客户端发送的JSON对象数据消息
     * 其中type为发送的数据类型，比如聊天为chat等等
     * 根据type类型来调用不同的处理方法，聊天会有对应的聊天对象。
     * 
     * @param {any} websocket 
     * @memberof SocketDeal
     */
    socketGetMsgFromClientEvent(websocket) {
        websocket.on('message', message => {
            console.log('这是客户端发送的消息:' + JSON.stringify(message));
            const tmpMessage = JSON.parse(message);
            console.log(JSON.parse(message).message);
            switch (tmpMessage.type) {
                case 'chat':
                    this.socketChatMessage(tmpMessage);
                    break;

                default:
                //默认处理
            }


        })
    }




    socketSendMsgToClient(clientid, message) {
        this.socketClient.forEach(socket => {
            if (socket.userId === clientid) {
                if (socket.ws.readyState === 1) {
                    socket.ws.send(JSON.stringify(message));
                } else {
                    this.socketRemoveClient(socket.userId);
                }

            }
        });
    }


    socketChatMessage(tmpMessage) {
        const ip = this.g.ip;
        const port = this.g.port.toString();
        const _message = querystring.stringify(tmpMessage);

        const options = {
            hostname: ip,
            port: port,
            path: '/chat/save?' + _message,
            method: 'GET'
        }

        const req = http.get(options, (res) => {
            let chat = '';
            res.on('data', (d) => {
                chat += d;
            });

            res.on('end', () => {
                const chatMessage = JSON.parse(chat);

                setTimeout(() => {
                    //返回回来对应发送的聊天对象，并发送到指定的客户端。
                    const tmpChat = this.socketGetClient(chatMessage.toUserId);

                    if (tmpChat != null) {

                        console.log(tmpChat.ws.readyState);
                        if (tmpChat.ws.readyState === 1) {
                        
                            console.log(chatMessage);
                            tmpChat.ws.send(JSON.stringify(chatMessage));
                        }

                    }
                }, 1000);

            })
        })

        req.on('error', e => {
            console.log(e.message);
        })

        req.end();

    }


    socketTimeSend() {
        const data = {
            type: 'interval',
            chatTabMessage:'',
            message: '这是定时发送的消息',
        }
        setInterval(() => {
            this.socketClient.forEach(socket => {
                if (socket.ws.readyState === 1) {
                    socket.ws.send(JSON.stringify(data));
                } else {
                    this.socketRemoveClient(socket.userId);
                }
            })
        }, 2000);
    }


}