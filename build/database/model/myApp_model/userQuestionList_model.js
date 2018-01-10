"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var userQuestion = require('../../schemas/myApp_schemas/userQuestionList_schemas');
var UserQusetion = mongoose.model('userQuestion', userQuestion);
module.exports = UserQusetion;
