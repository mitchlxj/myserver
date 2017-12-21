/**
 * Created by Administrator on 2017/11/29.
 */
import * as express from 'express';

const Movie = require('../database/model/movie_model');

const router = express.Router();

//中间件，在访问路由的时候先调用的模块，可以作为路由守卫
router.use((request,response,next) => {

    next(); //调用next后才能继续往下执行

});

router.get('/', (request,response) => {

    Movie.find({},(err,demo) =>{
       if(err){
           console.log(err);
       }else{
           response.render('index', {
               title:'首页',
               demo: demo
           });
       }
    });

});

router.get('/add', (request,response) => {

    response.render('add',{
        title:'添加list',
    })

});



router.post('/create', (request,response) => {

    const demo = new Movie({
        uid : request.body.uid,
        title: request.body.title,
        content : request.body.content
    });

    console.log('create----');
    demo.save(function(err,doc){
        console.log(doc);
        response.redirect('/movie');
    });

});


router.get('/del/:id', (request,response) => {
    const id = request.params.id;

    console.log(id);

    if(id){
        Movie.findByIdAndRemove(id, (err,docs)=> {
            response.redirect('/movie');
        })
    }


});


router.get('/modify/:id', (request,response) => {
    console.log(2222);
    const id = request.params.id;

    if(id){
        Movie.findById(id,(err,docs)=>{
            response.render('modify',{
                title:'修改',
                demo:docs
            });
        });
    }

});


router.post('/modify', (request,response) => {
    console.log(request.body);

    const demo ={
        uid: request.body.uid,
        title: request.body.title,
        content: request.body.content
    };

    const id = request.body.id;



    if(id){
        Movie.findByIdAndUpdate(id,demo,(err,docs)=>{
            response.redirect('/movie');
        });
    }

});


module .exports = router;