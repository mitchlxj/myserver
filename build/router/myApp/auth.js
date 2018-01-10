"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/11/29.
 */
var express = require("express");
var jwt = require("jsonwebtoken");
var path = require("path");
var fs = require("fs");
var formidable = require("formidable");
var ensureAuthorized = require('../../ensureAuthorized');
var UserModel = require('../../database/model/myApp_model/user_model');
var router = express.Router();
//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use(function (request, response, next) {
    console.log('myAppuser');
    next(); //调用next后才能继续往下执行
});
router.get('/userinfo', ensureAuthorized, function (request, response) {
    var _token = request.query.token;
    var userid = request.query.UserId;
    var data = {
        Status: '',
        StatusContent: '',
        UserHeadFace: null,
        UserId: null,
        UserNickName: null,
        token: null,
    };
    UserModel.findOne({ _id: userid }, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            data.Status = 'OK';
            data.StatusContent = "返回成功";
            if (user.avatar) {
                data.UserHeadFace = user.avatar;
            }
            data.UserId = user._id;
            data.UserNickName = user.nickname;
            data.token = user.token;
            response.send(data);
        }
    });
});
router.get('/login', function (request, response) {
    var data = {
        Status: '',
        StatusContent: '',
        UserHeadFace: null,
        UserId: null,
        UserNickName: null,
        token: null,
    };
    var _mobile = request.query.mobile;
    var _password = request.query.password;
    UserModel.findOne({
        mobile: _mobile,
    }, function (err, user) {
        if (err) {
            console.log("Error occured: " + err);
            data.Status = '403';
            data.StatusContent = '服务器拒绝访问';
            response.send(data);
        }
        else {
            if (user) {
                if (user.password !== _password) {
                    data.Status = '403';
                    data.StatusContent = '用户密码不正确';
                }
                else {
                    console.log(user);
                    //创建token
                    var token = jwt.sign({ userId: user._id }, 'app.get(superSecret)', {
                        expiresIn: '60m',
                    });
                    UserModel.findByIdAndUpdate(user._id, { token: token }, function (err, docs) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(docs);
                        }
                    });
                    data.Status = 'OK';
                    data.StatusContent = '登录成功';
                    data.token = token;
                    data.UserNickName = user.nickname;
                    data.UserId = user._id;
                    data.UserHeadFace = user.avatar;
                }
            }
            else {
                data.Status = '403';
                data.StatusContent = '账户不存在';
            }
            response.send(data);
        }
    });
});
router.get('/register', function (request, response) {
    var auth = new UserModel({
        mobile: request.query.mobile,
        password: request.query.password,
        nickname: request.query.nickname,
        avatar: 'http://192.168.1.111:3500/myappAuth/getimg/19-014845_297.jpg',
    });
    auth.save(function (err, user) {
        var data = {
            Status: '',
            StatusContent: '',
            UserHeadFace: null,
            UserId: null,
            UserNickName: null,
            token: null,
        };
        if (err) {
            data.Status = 'false';
            data.StatusContent = '注册失败';
            console.log(err);
        }
        else {
            data.Status = 'OK';
            data.StatusContent = '注册成功';
            data.UserId = user._id;
            data.UserHeadFace = user.avatar;
            data.UserNickName = user.nickname;
        }
        response.send(JSON.stringify(data));
    });
});
router.post('/uploadheadface', ensureAuthorized, function (req, res) {
    console.log(3333333333);
    var Userid = req.query.Userid;
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var tmpPath = __dirname.substring(0, __dirname.indexOf('build'));
    form.uploadDir = path.join(tmpPath + "/build/resouces/uploadHeaderFace");
    form.keepExtensions = true;
    form.maxFieldsSize = 1 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        if (err) {
            res.send({ error: err });
            console.log(err);
            return;
        }
        for (var key in files) {
            var nameArray = files[key].name.split('.');
            var type = nameArray[nameArray.length - 1];
            var name = '';
            for (var i = 0; i < nameArray.length - 1; i++) {
                name = name + nameArray[i];
            }
            var newPath = form.uploadDir + '/' + name + '.' + type;
            fs.renameSync(files[key].path, newPath);
            if (files[key].size > form.maxFieldsSize) {
                console.log('图片不能大于1M');
                res.send({ error: '图片不能大于1M' });
                return;
            }
            var uploadfilename = files[key].path;
            var upload_filename = files[key].name;
            var upload_filetype = type;
            var data = {
                Status: '',
                StatusContent: '',
                path: '',
                name: '',
                type: '',
            };
            if (err) {
                data.Status = 'false';
                data.StatusContent = '图片上传失败';
            }
            else {
                data.Status = 'OK';
                data.StatusContent = '图片上传成功';
                data.path = uploadfilename;
                data.name = upload_filename;
                data.type = type;
            }
            //改变数据库中的avatar路径链接
            var fullName = name + '.' + type;
            console.log(fullName);
            //图片获取链接
            var _avatar = 'http://192.168.1.111:3500/myappAuth/getimg/' + fullName;
            console.log(_avatar);
            console.log(Userid);
            UserModel.findByIdAndUpdate(Userid, { avatar: _avatar }, function (err, docs) {
            });
            res.send(JSON.stringify(data));
        }
    });
});
//获取图片
router.get('/getimg/:filename', function (req, res) {
    console.log('获取图片');
    var tmpPath = __dirname.substring(0, __dirname.indexOf('build'));
    var targetDir = path.join(tmpPath + "/build/resouces/uploadHeaderFace");
    var filePath = path.join(targetDir, req.params.filename);
    fs.exists(filePath, function (exists) {
        if (exists) {
            res.sendFile(filePath);
        }
    });
});
router.get('/userinfoupdate', ensureAuthorized, function (req, res) {
    var userid = req.query.UserId;
    var nickname = req.query.nickname;
    UserModel.findByIdAndUpdate(userid, { nickname: nickname }, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            var data_1 = {
                Status: '',
                StatusContent: '',
                UserHeadFace: null,
                UserId: null,
                UserNickName: null,
                token: null,
            };
            data_1.Status = 'OK';
            data_1.StatusContent = '更新成功';
            data_1.UserId = userid;
            data_1.UserNickName = nickname;
            res.send(JSON.stringify(data_1));
        }
    });
});
module.exports = router;
