"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var formatTime = require('date-fns/format');
var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    avatar: { type: String, default: '' },
    projectIds: { type: [String], default: [] },
    address: {
        province: String,
        city: String,
        district: String,
        street: String,
    },
    identity: {
        identityNo: String,
        identityType: Number,
    },
    meta: {
        createAt: { type: String, default: formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss') },
        updateAt: { type: String, default: formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss') },
    }
});
userSchema.pre('save', function (next) {
    if (_this.isNew) {
        _this.meta.createAt = _this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    }
    else {
        _this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    }
    next();
});
module.exports = userSchema;
