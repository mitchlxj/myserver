"use strict";
/**
 * Created by Administrator on 2017/11/28.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ip = 'localhost';
var port = '27017';
var DATABASE = 'myApp';
var DB_URL = "mongodb://" + ip + ":" + port + "/" + DATABASE;
var db = null;
exports.connectDataBase = function () {
    // mongoose.Promise = global.Promise;
    db = mongoose.connect(DB_URL);
    db.connection.on('connected', function () {
        console.log('——数据库连接成功！——');
    });
    /**
     * 连接异常
     */
    db.connection.on('error', function (err) {
        console.log('数据库连接失败： ' + err);
    });
    /**
     * 连接断开
     */
    db.connection.on('disconnected', function () {
        console.log('数据库断开连接');
    });
};
