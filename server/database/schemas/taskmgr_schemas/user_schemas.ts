/**
 * Created by Administrator on 2017/11/28.
 */
import * as mongoose from 'mongoose';
const formatTime = require('date-fns/format');




const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    avatar: {type:String,default:''},
    projectIds: {type:[String],default:[]},
    address:{
        province: String,
        city: String,
        district: String,
        street: String,
    },
    identity:{
        identityNo: String,
        identityType:Number,
    },
    meta: {
        createAt: {type: String, default:formatTime(Date.now(),'YYYY-MM-DD:hh:mm:ss')},
        updateAt: {type: String, default:formatTime(Date.now(),'YYYY-MM-DD:hh:mm:ss')},
    }
});

userSchema.pre('save', (next) => {
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = formatTime(Date.now(),'YYYY-MM-DD:hh:mm:ss');
    }else{
        this.meta.updateAt = formatTime(Date.now(),'YYYY-MM-DD:hh:mm:ss');
    }
    next();
});



module.exports = userSchema;