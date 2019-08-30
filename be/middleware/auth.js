const userToken = require('../utils/token');

module.exports = {
    // 判断用户是否具有权限
    async auth(req,res,next){
        res.set('content-type','application/json;charset=utf-8');
        // let username = req.session.username;
        let token = req.get('x-access-token');
        let key  = await userToken.verify(token);
        // console.log('123');
        if(key){
            next();
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'亲 , 请您先进行登录 ! '
                })
            })
        }
    }
}