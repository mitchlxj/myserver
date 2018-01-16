/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';



const chatSchema = new mongoose.Schema({
    messageId: String,
    userId: {type:Schema.Types.ObjectId,ref:'auth'},
    toUserId:{type:Schema.Types.ObjectId,ref:'auth'},
    message:String,
    satatus:String,
});

chatSchema.pre('save', (next) => {
   
    next();
});



module.exports = chatSchema;