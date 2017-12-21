"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var formatTime = require('date-fns/format');
var userSchema = new mongoose.Schema({
    mobile: String,
    password: String,
    nickname: String,
    token: String,
    avatar: {
        type: String,
        default: ''
    },
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
userSchema.pre('save', function (next) {
    if (_this.isNew) {
        _this.meta.createAt = _this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    }
    // else {
    //     this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    // }
    next();
});
module.exports = userSchema;
