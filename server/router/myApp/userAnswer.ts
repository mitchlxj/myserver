/**
 * Created by Administrator on 2017/11/29.
 */
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';
import * as formidable from 'formidable';

const ensureAuthorized = require('../../ensureAuthorized');

const UserQuestion = require('../../database/model/myApp_model/userQuestionList_model');

const UserModel = require('../../database/model/myApp_model/user_model');

const UserAnswerModel = require('../../database/model/myApp_model/userAnswer_model');

const router = express.Router();


//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use((request, response, next) => {
    console.log('UserAnswerModel');
    next(); //调用next后才能继续往下执行

});

router.get('/answer', ensureAuthorized, (request, response) => {
    console.log(request.query);
    const userId = request.query.user;
    UserModel.findOne({ _id: userId }).exec((err, user) => {
        if (err) {
            console.log(err);
        } else {

            const useranwer = new UserAnswerModel({
                userId: userId,
                userNickName: user.nickname,
                avatar: user.avatar,
                question: request.query.question,
                content: request.query.content
            });

            const data = {
                Status: '',
                StatusContent: '',
                userId: null,
                userNickName:null,
                avatar:null,
                question: null,
                content: null,
            };

            console.log('create----');
            useranwer.save(function (err, doc) {
                if (err) {
                    console.log(err);
                    data.Status = 'false';
                    data.StatusContent = "提交失败";
                } else {
                    data.Status = 'OK';
                    data.StatusContent = "返回成功";
                    data.userId = doc.userId;
                    data.userNickName = doc.userNickName;
                    data.avatar = doc.avatar;
                    data.question = doc.question;
                    data.content = doc.content;

                    //将回答的ID写入对应的问题model里
                    UserQuestion.findOne({ _id: doc.question }).exec((err, question) => {
                        console.log(question);
                        question.answers.push(doc._id);
                        question.save((err, q) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                    })

                }

                response.send(data);
            });


        }
    })




});


module.exports = router;
