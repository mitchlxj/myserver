"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var express = require("express");
var router = express.Router();
router.get('/', function (request, response, next) {
    response.send('index');
});
module.exports = router;
