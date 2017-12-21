/**
 * Created by Administrator on 2017/11/29.
 */
import * as express from 'express';

const router = express.Router();

router.get('/', (request,response,next) => {

    response.send('index');
});


module.exports = router;