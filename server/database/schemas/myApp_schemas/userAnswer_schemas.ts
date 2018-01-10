/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';


const UserModel = require('../../model/myApp_model/user_model');

const formatTime = require('date-fns/format');


const userAnswer = new mongoose.Schema({
    question:{type:Schema.Types.ObjectId,ref:'userQuestion'},
    userId:{type:Schema.Types.ObjectId,ref:'auth'},
    userNickName:String,
    avatar:String,
    content: String,
    meta: {
        createAt: {
            type: String,
            default: formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss')
        },
        updateAt: {
            type: String,
            default: formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss')
        },
    }
});

userAnswer.pre('save', (next) => {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    } 
    // else {
    //     this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    // }
    next();
});



module.exports = userAnswer;