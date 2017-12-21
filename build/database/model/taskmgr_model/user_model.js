"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var userSchema = require('../../schemas/taskmgr_schemas/user_schemas');
var User = mongoose.model('users', userSchema);
module.exports = User;
