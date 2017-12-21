/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
const authSchema = require('../../schemas/myApp_schemas/user_schemas');

const User = mongoose.model('auth', authSchema);

module.exports = User;