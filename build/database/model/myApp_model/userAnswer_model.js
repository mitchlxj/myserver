"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var userAnswer = require('../../schemas/myApp_schemas/userAnswer_schemas');
var UserAnswer = mongoose.model('userAnswer', userAnswer);
module.exports = UserAnswer;
