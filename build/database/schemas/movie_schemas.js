"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var mongoose = require("mongoose");
var formatTime = require('date-fns/format');
var movieSchema = new mongoose.Schema({
    uid: String,
    title: String,
    content: String,
    createTime: { type: String, default: formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss') }
});
movieSchema.pre('save', function (next) {
    if (_this.isNew) {
        _this.createTime = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
        console.log(_this.createTime);
    }
    next();
});
movieSchema.statics = {
    fetch: function (cb) {
        return _this.find({}).sort('meta.updateAt').exec(cb);
    },
    findbyId: function (id, cb) {
        return _this.find({ _id: id }).exec(cb);
    }
};
module.exports = movieSchema;
