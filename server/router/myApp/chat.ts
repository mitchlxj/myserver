/**
 * Created by Administrator on 2017/11/29.
 */
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';
import * as formidable from 'formidable';

const ensureAuthorized = require('../../ensureAuthorized');

const chatModel = require('../../database/model/myApp_model/chat_model');

const router = express.Router();


//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use((request, response, next) => {
    console.log('chatModel');
    next(); //调用next后才能继续往下执行

});

router.get('/save', (request, response) => {

    const reData = {
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

    const data = request.query;
    console.log(request.query);
    const chat = new chatModel({
        messageId: data.messageId,
        userId: data.userId,
        toUserId: data.toUserId,
        message: data.message,
        satatus: data.satatus,
    })
    chat.save((err, chat) => {
        if (err) {
            console.log(err);
        } else {

            chatModel.findOne({ messageId: data.messageId })
                .populate('userId')
                .populate('toUserId')
                .exec((err, chat) => {

                    reData.Status = 'OK';
                    reData.StatusContent = '返回成功';
                    reData.messageId = chat.messageId;
                    reData.userId = chat.userId;
                    reData.toUserId = chat.toUserId;
                    reData.message = chat.message;
                    reData.satatus = chat.satatus;
                    reData.username = chat.userId.nickname;
                    reData.userImgUrl= chat.userId.avatar;
                    reData.tousername=chat.toUserId.nickname;
                    reData.touserImgUrl=chat.toUserId.avatar;
                    reData.time=Number(chat.time);

                    response.send(reData);

                })

        }
    })
});


router.get('/getmessgelist', (req, res) => {
    const userId = req.query.userId;
    const touserId = req.query.touserId;

    const chatAll = {
        Status: '',
        StatusContent: '',
        chatData: [],
    };



    chatModel.find({ $or: [{ userId: userId, toUserId: touserId }, { userId: touserId, toUserId: userId }] })
        .sort({ messageId: 1 })
        .populate('userId')
        .populate('toUserId')
        .exec((err, docs) => {

            if (err) {
                console.log(err);
            } else {
                chatAll.Status = 'OK';
                chatAll.StatusContent = '获取成功';
                for (let i = 0; i < docs.length; i++) {

                    const data = {
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
                    }

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



        })




})




module.exports = router;
