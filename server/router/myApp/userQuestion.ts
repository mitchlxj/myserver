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

const UserAnswer = require('../../database/model/myApp_model/userAnswer_model');


const UserModel = require('../../database/model/myApp_model/user_model');

const router = express.Router();


//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use((request, response, next) => {
    console.log('UserQuestionModel');
    next(); //调用next后才能继续往下执行

});

router.post('/save', ensureAuthorized, (request, response) => {
    console.log(request.body);
    const userquestion = new UserQuestion({
        userId: request.body.userId,
        title: request.body.title,
        content: request.body.content
    });

    const data = {
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
        } else {
            data.Status = 'OK';
            data.StatusContent = "返回成功";
            data.UserId = doc.userId;
            data.title = doc.title;
            data.content = doc.content;

        }

        response.send(data);
    });
});

router.get('/getqusetionlist', (request, response) => {

    const index = Number(request.query.index);
    const count = Number(request.query.count);

    var data = {
        Status: '',
        StatusContent: '',
        QuestionList: '',
    };

    let Finish = false;

    UserQuestion.find({})
        .populate('userId', { nickname: 1, avatar: 1 })
        .limit(count)
        .skip(index)
        .sort({ _id: -1 })
        .exec((err, doc) => {


            if (err) {
                console.log(err);
                data.Status = 'false';
                data.StatusContent = "获取数据失败";
            } else {
                data.Status = 'OK';
                data.StatusContent = "数据获取成功";
                data.QuestionList = doc;
            }
            response.send(data);
        });

});



router.get('/getquestion', ensureAuthorized, (req, res) => {

    const q_id = req.query.q_id;


    const data = {
        Status: '',
        StatusContent: '',
        question: '',
        answers: '',
        user: '',
    };

    UserQuestion.findOne({ _id: q_id })
        .populate('answers', null, null, { sort: { _id: -1 } })
        .exec((err, docs) => {
            if (err) {
                console.log(err);
                data.Status = 'false';
                data.StatusContent = '获取失败: ' + err;
            } else {
                data.Status = 'OK';
                data.StatusContent = '获取成功';
                data.question = docs;
                data.answers = docs.answers;

            }

            res.send(data);
        })


})

module.exports = router;
