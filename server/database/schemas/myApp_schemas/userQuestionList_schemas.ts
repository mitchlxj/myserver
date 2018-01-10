/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';


const UserModel = require('../../model/myApp_model/user_model');

const formatTime = require('date-fns/format');


const userQuestionList = new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:'auth'},
    title: String,
    content: String,
    answers:[{type:Schema.Types.ObjectId,ref:'userAnswer'}],
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

userQuestionList.pre('save', (next) => {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    } 
    // else {
    //     this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    // }
    next();
});



module.exports = userQuestionList;