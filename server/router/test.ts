/**
 * Created by Administrator on 2017/11/29.
 */
import * as express from 'express';

const router = express.Router();

//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use((request,response,next) => {
    console.log('test');
    next(); //调用next后才能继续往下执行

});

router.get('/', (request,response) => {
    response.render('index',{title:'首页'});
});

router.get('/admin', (request,response) => {
    response.render('admin',{title:'admin'});
});


router.get('/detail', (request,response) => {
    response.render('detail',{title:'detail'});
});


router.get('/list', (request,response) => {
    response.render('list',{title:'list'});
});


module .exports = router;

