/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
const userAnswer = require('../../schemas/myApp_schemas/userAnswer_schemas');

const UserAnswer = mongoose.model('userAnswer', userAnswer);

module.exports = UserAnswer;