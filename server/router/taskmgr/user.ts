/**
 * Created by Administrator on 2017/11/29.
 */
import * as express from 'express';
const UserModel = require('../../database/model/taskmgr_model/user_model');

const router = express.Router();


//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use((request,response,next) => {
    console.log('user');
    next(); //调用next后才能继续往下执行

});

router.get('/',(request,response) =>{
    const req_query = request.query;
    console.log(req_query);
    response.send('gg');
});


router.get('/login', (request,response) => {
    response.send('login');
});


router.post('/register', (request,response) => {
    console.log(111);
    console.log(request.body);

});


module .exports = router;
