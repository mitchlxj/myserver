"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var authSchema = require('../../schemas/myApp_schemas/user_schemas');
var User = mongoose.model('auth', authSchema);
module.exports = User;
