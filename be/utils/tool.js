const bcrypt = require('bcrypt');

module.exports = {
    // 加密
    bcr(myPlaintextPassword){
        return new Promise((resolve,reject)=>{
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(myPlaintextPassword, salt,(err,hash)=>{
                    resolve(hash)
                });
            })
        })
    },
    // 解密
    compare(myPlaintextPassword,password){
        return bcrypt.compare(myPlaintextPassword,password);
    }
}