"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var express = require("express");
var ensureAuthorized = require('../../ensureAuthorized');
var chatModel = require('../../database/model/myApp_model/chat_model');
var router = express.Router();
//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use(function (request, response, next) {
    console.log('chatModel');
    next(); //调用next后才能继续往下执行
});
router.get('/save', function (request, response) {
    var reData = {
        Status: '',
        StatusContent: '',
        messageId: null,
        type: 'chat',
        userId: null,
        username: null,
        userImgUrl: null,
        toUserId: null,
        tousername: null,
        touserImgUrl: null,
        time: null,
        message: null,
        satatus: null,
    };
    var data = request.query;
    var chat = new chatModel({
        messageId: data.messageId,
        userId: data.userId,
        toUserId: data.toUserId,
        message: data.message,
        satatus: data.satatus,
    });
    chat.save(function (err, chat) {
        if (err) {
            console.log(err);
        }
        else {
            chatModel.findOne({ messageId: data.messageId })
                .populate('userId')
                .populate('toUserId')
                .exec(function (err, docs) {
                reData.Status = 'OK';
                reData.StatusContent = '返回成功';
                reData.messageId = docs.messageId;
                reData.userId = docs.userId._id;
                reData.toUserId = docs.toUserId._id;
                reData.message = docs.message;
                reData.satatus = docs.satatus;
                reData.username = docs.userId.nickname;
                reData.userImgUrl = docs.userId.avatar;
                reData.tousername = docs.toUserId.nickname;
                reData.touserImgUrl = docs.toUserId.avatar;
                reData.time = Number(docs.messageId);
                response.send(reData);
            });
        }
    });
});
router.get('/getmessgelist', function (req, res) {
    var userId = req.query.userId;
    var touserId = req.query.touserId;
    var chatAll = {
        Status: '',
        StatusContent: '',
        chatData: [],
    };
    chatModel.find({ $or: [{ userId: userId, toUserId: touserId }, { userId: touserId, toUserId: userId }] })
        .sort({ messageId: 1 })
        .populate('userId')
        .populate('toUserId')
        .exec(function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            chatAll.Status = 'OK';
            chatAll.StatusContent = '获取成功';
            for (var i = 0; i < docs.length; i++) {
                var data = {
                    messageId: null,
                    type: 'chat',
                    userId: null,
                    username: null,
                    userImgUrl: null,
                    toUserId: null,
                    tousername: null,
                    touserImgUrl: null,
                    time: null,
                    message: null,
                    satatus: null,
                };
                data.messageId = docs[i].messageId;
                data.userId = docs[i].userId._id;
                data.username = docs[i].userId.nickname;
                data.userImgUrl = docs[i].userId.avatar;
                data.toUserId = docs[i].toUserId._id;
                data.tousername = docs[i].toUserId.nickname;
                data.touserImgUrl = docs[i].toUserId.avatar;
                data.time = Number(docs[i].messageId);
                data.message = docs[i].message;
                data.satatus = docs[i].satatus;
                chatAll.chatData.push(data);
            }
            res.send(chatAll);
        }
    });
});
module.exports = router;
