"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var express = require("express");
var ensureAuthorized = require('../../ensureAuthorized');
var UserQuestion = require('../../database/model/myApp_model/userQuestionList_model');
var UserModel = require('../../database/model/myApp_model/user_model');
var UserAnswerModel = require('../../database/model/myApp_model/userAnswer_model');
var router = express.Router();
//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use(function (request, response, next) {
    console.log('UserAnswerModel');
    next(); //调用next后才能继续往下执行
});
router.get('/answer', ensureAuthorized, function (request, response) {
    console.log(request.query);
    var userId = request.query.user;
    UserModel.findOne({ _id: userId }).exec(function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            var useranwer = new UserAnswerModel({
                userId: userId,
                userNickName: user.nickname,
                avatar: user.avatar,
                question: request.query.question,
                content: request.query.content
            });
            var data_1 = {
                Status: '',
                StatusContent: '',
                userId: null,
                userNickName: null,
                avatar: null,
                question: null,
                content: null,
            };
            console.log('create----');
            useranwer.save(function (err, doc) {
                if (err) {
                    console.log(err);
                    data_1.Status = 'false';
                    data_1.StatusContent = "提交失败";
                }
                else {
                    data_1.Status = 'OK';
                    data_1.StatusContent = "返回成功";
                    data_1.userId = doc.userId;
                    data_1.userNickName = doc.userNickName;
                    data_1.avatar = doc.avatar;
                    data_1.question = doc.question;
                    data_1.content = doc.content;
                    //将回答的ID写入对应的问题model里
                    UserQuestion.findOne({ _id: doc.question }).exec(function (err, question) {
                        console.log(question);
                        question.answers.push(doc._id);
                        question.save(function (err, q) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                }
                response.send(data_1);
            });
        }
    });
});
module.exports = router;
