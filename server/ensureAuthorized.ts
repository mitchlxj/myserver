import * as jwt from 'jsonwebtoken';

const ensureAuthorized = (req,res,next)=>{
    const data = {
        Status: '',
        StatusContent:'',
        token:null,
    };
    const token = req.body.token || req.query.token ||req.headers['authorization'];

    if(token){
        jwt.verify(token,'app.get(superSecret)',(err,decode)=>{
            //  时间失效的时候/ 伪造的token
            if(err){
                data.Status ='403';
                data.StatusContent="用户过期，请重新登录！";
                data.token = err;
                res.json(data);
            }else{
                req.decode = decode;
                console.log("decode: "+JSON.stringify(decode));   // today  is  a  good  day
                next();    
            }
        })
    }else{
        data.Status ='403';
        data.StatusContent='没有提供token!';
        res.send(JSON.stringify(data));
    }
}

module.exports = ensureAuthorized;