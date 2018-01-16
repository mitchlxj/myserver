"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var chatSchema = new mongoose.Schema({
    messageId: String,
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'auth' },
    toUserId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'auth' },
    message: String,
    satatus: String,
});
chatSchema.pre('save', function (next) {
    next();
});
module.exports = chatSchema;
