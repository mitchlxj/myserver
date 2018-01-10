"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var express = require("express");
var ensureAuthorized = require('../../ensureAuthorized');
var UserQuestion = require('../../database/model/myApp_model/userQuestionList_model');
var UserAnswer = require('../../database/model/myApp_model/userAnswer_model');
var UserModel = require('../../database/model/myApp_model/user_model');
var router = express.Router();
//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use(function (request, response, next) {
    console.log('UserQuestionModel');
    next(); //调用next后才能继续往下执行
});
router.post('/save', ensureAuthorized, function (request, response) {
    console.log(request.body);
    var userquestion = new UserQuestion({
        userId: request.body.userId,
        title: request.body.title,
        content: request.body.content
    });
    var data = {
        Status: '',
        StatusContent: '',
        UserId: null,
        title: null,
        content: null,
    };
    console.log('create----');
    userquestion.save(function (err, doc) {
        if (err) {
            console.log(err);
            data.Status = 'false';
            data.StatusContent = "提交失败";
        }
        else {
            data.Status = 'OK';
            data.StatusContent = "返回成功";
            data.UserId = doc.userId;
            data.title = doc.title;
            data.content = doc.content;
        }
        response.send(data);
    });
});
router.get('/getqusetionlist', function (request, response) {
    var index = Number(request.query.index);
    var count = Number(request.query.count);
    var data = {
        Status: '',
        StatusContent: '',
        QuestionList: '',
    };
    var Finish = false;
    UserQuestion.find({})
        .populate('userId', { nickname: 1, avatar: 1 })
        .limit(count)
        .skip(index)
        .sort({ _id: -1 })
        .exec(function (err, doc) {
        if (err) {
            console.log(err);
            data.Status = 'false';
            data.StatusContent = "获取数据失败";
        }
        else {
            data.Status = 'OK';
            data.StatusContent = "数据获取成功";
            data.QuestionList = doc;
        }
        response.send(data);
    });
});
router.get('/getquestion', ensureAuthorized, function (req, res) {
    var q_id = req.query.q_id;
    var data = {
        Status: '',
        StatusContent: '',
        question: '',
        answers: '',
        user: '',
    };
    UserQuestion.findOne({ _id: q_id })
        .populate('answers', null, null, { sort: { _id: -1 } })
        .exec(function (err, docs) {
        if (err) {
            console.log(err);
            data.Status = 'false';
            data.StatusContent = '获取失败: ' + err;
        }
        else {
            data.Status = 'OK';
            data.StatusContent = '获取成功';
            data.question = docs;
            data.answers = docs.answers;
        }
        res.send(data);
    });
});
module.exports = router;
