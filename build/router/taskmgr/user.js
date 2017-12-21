"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var express = require("express");
var UserModel = require('../../database/model/taskmgr_model/user_model');
var router = express.Router();
//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use(function (request, response, next) {
    console.log('user');
    next(); //调用next后才能继续往下执行
});
router.get('/', function (request, response) {
    var req_query = request.query;
    console.log(req_query);
    response.send('gg');
});
router.get('/login', function (request, response) {
    response.send('login');
});
router.post('/register', function (request, response) {
    console.log(111);
    console.log(request.body);
});
module.exports = router;
