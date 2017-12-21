"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var express = require("express");
var Movie = require('../database/model/movie_model');
var router = express.Router();
//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use(function (request, response, next) {
    next(); //调用next后才能继续往下执行
});
router.get('/', function (request, response) {
    Movie.find({}, function (err, demo) {
        if (err) {
            console.log(err);
        }
        else {
            response.render('index', {
                title: '首页',
                demo: demo
            });
        }
    });
});
router.get('/add', function (request, response) {
    response.render('add', {
        title: '添加list',
    });
});
router.post('/create', function (request, response) {
    var demo = new Movie({
        uid: request.body.uid,
        title: request.body.title,
        content: request.body.content
    });
    console.log('create----');
    demo.save(function (err, doc) {
        console.log(doc);
        response.redirect('/movie');
    });
});
router.get('/del/:id', function (request, response) {
    var id = request.params.id;
    console.log(id);
    if (id) {
        Movie.findByIdAndRemove(id, function (err, docs) {
            response.redirect('/movie');
        });
    }
});
router.get('/modify/:id', function (request, response) {
    console.log(2222);
    var id = request.params.id;
    if (id) {
        Movie.findById(id, function (err, docs) {
            response.render('modify', {
                title: '修改',
                demo: docs
            });
        });
    }
});
router.post('/modify', function (request, response) {
    console.log(request.body);
    var demo = {
        uid: request.body.uid,
        title: request.body.title,
        content: request.body.content
    };
    var id = request.body.id;
    if (id) {
        Movie.findByIdAndUpdate(id, demo, function (err, docs) {
            response.redirect('/movie');
        });
    }
});
module.exports = router;
