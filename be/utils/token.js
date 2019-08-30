const jwt = require('jsonwebtoken');
const fs  = require('fs');
const path = require('path');

module.exports = {

    // 生成 token 私钥
    sign(payload){
        let privateKey = fs.readFileSync(path.resolve(__dirname,'./key/rsaprivatekey.pem'));
        let token = jwt.sign(payload,privateKey,{ algorithm: 'RS256'});
        return token;
    },

    // 解密
    verify(token){
        return new Promise((resolve,reject)=>{
            let publicKey = fs.readFileSync(path.resolve(__dirname,'./key/rsapublickey.pem'));
            jwt.verify(token,publicKey,(err,key)=>{
                if(err){
                    resolve(false);
                }else{
                    resolve(key)
                }
            })
        })
    }
}