const userModel = require('../models/user');
const utils     = require('../utils/tool');
const userToken = require('../utils/token');

module.exports = {
    // 注册
    async signup(req,res,next){
        res.set('content-type','application/json;charset=utf-8')

        let {username,password} = req.body;
        // console.log(username,password)

        // 判断用户名是否存在
        let result = await userModel.findOne(username);

        if(result){
            res.render('fail',{
                data:JSON.stringify({
                    msg:'用户名已被注册 , 换一个试试吧'
                })
            });
        }else{
            // 密码加密
            let newPassword = await utils.bcr(password);
    
            // 存储用户注册信息到数据库
            await userModel.save({
                username,
                password:newPassword
            });
            
            res.render('succ',{
                data:JSON.stringify({
                    msg : '恭喜您' + username + '注册成功',
                })
            });
        }
    },
    // 登录
    async signin(req,res,next){
        res.set('content-type','application/json;charset=utf-8')
        
        let {username,password} = req.body;
        let result = await userModel.findOne(username);
        if(result){
            
            if(await utils.compare(password,result.password)){ 

                // req.session.username = username
                let token = userToken.sign({
                    username
                });

                res.set('x-access-token',token)

                // console.log(username,password)
                res.render('succ',{
                    data:JSON.stringify({
                        msg : '恭喜您' + username + '登陆成功',
                        username
                    })
                })
            }else{
                res.render('fail',{
                    data:JSON.stringify({
                        msg:'用户名或密码错误 , 登录失败'
                    })
                })
            }
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'用户名或密码错误 , 登录失败'
                })
            })
        }
    },
    // 判断是否登录
    async issign(req,res,next){
        res.set('content-type','application/json;charset=utf-8');
        // let username = req.session.username;
        // 取出请求头的header的内容 进行解密
        let token = req.get('x-access-token');
        let key = await userToken.verify(token);

        // console.log(key);
        
        if(key){
            res.render('succ',{
                data:JSON.stringify({
                    msg:'用户有权限'
                })
            })
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'用户没有权限'
                })
            })
        }
    },
    // 退出
    issignout(req,res,next){
        res.set('content-type','application/json;charset=utf-8');
        req.session = null;
        res.render('succ',{
            data:JSON.stringify({
                msg:'退出成功'
            })
        })
    }
}