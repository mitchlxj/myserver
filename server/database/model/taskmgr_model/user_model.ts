/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
const userSchema = require('../../schemas/taskmgr_schemas/user_schemas');

const User = mongoose.model('users', userSchema);

module.exports = User;