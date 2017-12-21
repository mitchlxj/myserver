"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/28.
 */
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    email: String,
    password: String,
});
// userSchema.pre('save', (next) => {
//     console.log(111);
//     if(this.isNew){
//         this.meta.createAt = this.meta.updateAt = Date.now();
//     }else{
//         this.meta.updateAt = Date.now();
//     }
//     next();
// });
module.exports = userSchema;
