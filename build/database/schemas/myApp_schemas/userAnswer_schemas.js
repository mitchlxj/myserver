"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var UserModel = require('../../model/myApp_model/user_model');
var formatTime = require('date-fns/format');
var userAnswer = new mongoose.Schema({
    question: { type: mongoose_1.Schema.Types.ObjectId, ref: 'userQuestion' },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'auth' },
    userNickName: String,
    avatar: String,
    content: String,
    meta: {
        createAt: {
            type: String,
            default: formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss')
        },
        updateAt: {
            type: String,
            default: formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss')
        },
    }
});
userAnswer.pre('save', function (next) {
    if (_this.isNew) {
        _this.meta.createAt = _this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    }
    // else {
    //     this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    // }
    next();
});
module.exports = userAnswer;
