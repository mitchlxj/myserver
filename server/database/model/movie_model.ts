/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
const movieSchema = require('../schemas/movie_schemas');

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;