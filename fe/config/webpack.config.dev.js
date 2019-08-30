const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',
    // 入口文件 ./src/app.js
    entry: './src/app.js',
    // 出口文件 app.js 
    output : {
        path:path.resolve(__dirname,'../dev'),
        filename:'app.js'
    },

    // 开启一个服务器
    devServer:{
        contentBase:path.resolve(__dirname,'../dev'),
        port:8000,
        host:'10.60.15.71',
        proxy:{
            "/api":{
                target:"http://localhost:3000"
            }
        }
    } ,

    // loader
    module:{
        rules:[
            {
                test:/\.art$/,
                loader : 'art-template-loader'
            },
            {
                test:/\.(css|scss)$/,
                loader : ['style-loader','css-loader','sass-loader']
            }
        ]
    },

    // 插件
    plugins:[
        // 拷贝html css js
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: './index.html'
        }),
        // 拷贝public
        new CopyWebpackPlugin([{
            from :"./public",
            to :"./public"
        }]),
    ]

}