var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/user');

/* GET users listing. */

// 注册
router.post('/signup', userControllers.signup);
// 登录
router.post('/signin', userControllers.signin);
// 判断
router.get('/issign',userControllers.issign);
// 退出
router.get('/issignout',userControllers.issignout);

module.exports = router;
