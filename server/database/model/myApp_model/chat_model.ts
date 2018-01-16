/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
const chatSchema = require('../../schemas/myApp_schemas/chat_schemas');

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;