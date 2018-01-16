/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
const formatTime = require('date-fns/format');


const userSchema = new mongoose.Schema({
    mobile: String,
    password: String,
    nickname: String,
    token:String,
    IsFavourite:[{type:Schema.Types.ObjectId,ref:'userQuestion'}],
    avatar: {
        type: String,
        default: ''
    },
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

userSchema.pre('save', (next) => {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    } 
    // else {
    //     this.meta.updateAt = formatTime(Date.now(), 'YYYY-MM-DD:hh:mm:ss');
    // }
    next();
});



module.exports = userSchema;