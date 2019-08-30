var multer = require('multer');
var path   = require('path');
var random = require('string-random');

let filename = '';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname,'../public/uploads/'))
    },
    filename: function (req, file, cb) {
        // req.filename = 
        // console.log(file.mimetype);
        filename = random(12) + '-' + file.originalname.substr(file.originalname.lastIndexOf('.'));
        // console.log(filename);
        cb(null, filename)
    }
})

function fileFilter(req, file, cb){
    // 这个函数应该调用 `cb` 用boolean值来
    // 指示是否应接受该文件
    // let type = / *(\.jpg|\.png|\.jpeg|\.gif|\.bmp)$ /
    let index = ['image/jpg','image/png','image/jpeg','image/gif','image/bmp'].indexOf(file.mimetype);
    if(index === -1){
        cb(null,false);
        cb(new Error('房屋照片 : 文件类型有错误 , 请选择.jpg .png .jpeg .gif 格式的文件 : '));
    }else{
        cb(null,true);
    }
    // 拒绝这个文件，使用`false`，像这样:
    // 接受这个文件，使用`true`，像这样:
    // cb(null, true)
    // 如果有问题，你可以总是这样发送一个错误:
    // cb(new Error('I don\'t have a clue!'))
}
  
var upload = multer({ 
    storage,
    fileFilter
 }).single('houseImg')

module.exports = (req,res,next)=>{
    upload(req,res,function(err){
        if(err){
            // console.log(err.message);
            res.render('fail',{
                data:JSON.stringify({
                    msg:err.message
                })
            })
        }else{
            // console.log('success');
            req.filename = filename;
            next();
            // req.filename = '' ;
        }
    })
};