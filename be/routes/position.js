var express = require('express');
var router = express.Router();
var positionControllers = require('../controllers/position');
var authMiddleware    = require('../middleware/auth');
var fileMiddleware    = require('../middleware/fileupload');

// 房源列表
router.get('/list',authMiddleware.auth,positionControllers.list);
// 房源添加
router.post('/add',authMiddleware.auth,fileMiddleware,positionControllers.add);
// 房源id查询
router.post('/findone',authMiddleware.auth,positionControllers.findone);
// 房源修改
router.patch('/edit',authMiddleware.auth,fileMiddleware,positionControllers.edit);
// 房源删除
router.delete('/del',authMiddleware.auth,positionControllers.del);
// 搜索房源
router.post('/search',authMiddleware.auth,positionControllers.search);

module.exports = router;
