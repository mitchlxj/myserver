/**
 * Created by Administrator on 2017/11/29.
 */
import * as mongoose from 'mongoose';
const formatTime = require('date-fns/format');

const movieSchema = new mongoose.Schema({
    uid:String,
    title:String,
    content:String,
    createTime : { type: String, default: formatTime(Date.now(),'YYYY-MM-DD:hh:mm:ss')}
});


movieSchema.pre('save', (next)=>{
    if(this.isNew) {
        this.createTime = formatTime(Date.now(),'YYYY-MM-DD:hh:mm:ss');
        console.log(this.createTime);
    }
    next();
});


movieSchema.statics = {
    fetch: (cb) => {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },

    findbyId:(id, cb) => {
        return this.find({_id:id}).exec(cb);
    }
};





module.exports = movieSchema;