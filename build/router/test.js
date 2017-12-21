"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var express = require("express");
var router = express.Router();
//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use(function (request, response, next) {
    console.log('test');
    next(); //调用next后才能继续往下执行
});
router.get('/', function (request, response) {
    response.render('index', { title: '首页' });
});
router.get('/admin', function (request, response) {
    response.render('admin', { title: 'admin' });
});
router.get('/detail', function (request, response) {
    response.render('detail', { title: 'detail' });
});
router.get('/list', function (request, response) {
    response.render('list', { title: 'list' });
});
module.exports = router;
