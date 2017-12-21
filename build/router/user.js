"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var express = require("express");
var UserModel = require('../database/model/user_model');
var router = express.Router();
//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use(function (request, response, next) {
    console.log('dddddd');
    next(); //调用next后才能继续往下执行
});
router.get('/login', function (request, response) {
    response.send('login');
});
router.get('/register', function (request, response) {
    response.send('register');
    var _user = null;
    _user = new UserModel({
        email: 'fffdd@163.com',
        password: 'dfd'
    });
    return _user.save(function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(res);
        }
    });
});
module.exports = router;
