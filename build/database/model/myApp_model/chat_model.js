"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var chatSchema = require('../../schemas/myApp_schemas/chat_schemas');
var Chat = mongoose.model('chat', chatSchema);
module.exports = Chat;
