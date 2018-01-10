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
var userQuestionList = new mongoose.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'auth' },
    title: String,
    content: String,
    answers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'userAnswer' }],
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
userQuestionList.pre('save', function (next) {
    if (_this.isNew) {
        _this.meta.createAt = _this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    }
    // else {
    //     this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    // }
    next();
});
module.exports = userQuestionList;
