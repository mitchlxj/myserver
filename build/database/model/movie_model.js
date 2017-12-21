"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var movieSchema = require('../schemas/movie_schemas');
var Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
