// 连接数据库，产生users集合，数据操作
const mongoose = require('../utils/db');

const Users = mongoose.model('users',{
    username : String,
    password : String
})

module.exports = {
    // 查询用户名
    findOne(username){
        return Users.findOne({username});
    },
    // 保存用户数据
    save({ username , password }){
        let user = new Users({
            username,
            password,
        })
        return user.save();
    }
}