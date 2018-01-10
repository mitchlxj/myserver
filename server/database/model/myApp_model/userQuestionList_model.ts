/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
const userQuestion = require('../../schemas/myApp_schemas/userQuestionList_schemas');

const UserQusetion = mongoose.model('userQuestion', userQuestion);

module.exports = UserQusetion;