const position = require('../models/position');
const moment   = require('moment')

module.exports = {

    // 渲染房源列表
    async list(req,res){
        // 获取房源列表
        // let { start , count } = req.query;
        // let data = await position.find(req.query) ;
        // // console.log(data)
        // if(data){
        //     res.render('succ',{
        //         data:JSON.stringify(data)
        //     })
        // }else{
        //     res.render('succ',{
        //         data:JSON.stringify({
        //             msg:'数据获取失败'
        //         })
        //     })
        // }
        let { list , total } = position.find(req.query) ;
        // console.log(data)
        if(await list){
            res.render('succ',{
                data:JSON.stringify({
                    list:await list,        //list数据
                    total:await total       //total总数
                })
            })
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'数据获取失败'
                })
            })
        }
        // res.json({
        //     res:true,
        //     data:[
        //         {
        //             title:'天通苑东一区房源',
        //             houseType:'住宅',
        //             price:'1230万',
        //             place:'北京市昌平区',
        //             creatTime:'2019-08-23',
        //         },
        //         {
        //             title:'天通苑东一区房源',
        //             houseType:'住宅',
        //             price:'1230万',
        //             place:'北京市昌平区',
        //             creatTime:'2019-08-23',
        //         },
        //         {
        //             title:'天通苑东一区房源',
        //             houseType:'住宅',
        //             price:'1230万',
        //             place:'北京市昌平区',
        //             creatTime:'2019-08-23',
        //         }
        //     ]
        // })
    },

    // 添加房源信息
    async add(req,res){
        res.set('content-type','application/json;charset=utf-8');

        // console.log(moment().format('YYYY/MM/DD HH:mm:ss a'));
        // moment("20111031", "YYYYMMDD").fromNow(); // 8 年前
        // moment("20120620", "YYYYMMDD").fromNow(); // 7 年前
        // moment().startOf('day').fromNow();        // 18 小时前
        // moment().endOf('day').fromNow();          // 6 小时内
        // moment().startOf('hour').fromNow();       // 1 小时前
        // let {title,houseType,price,place} = req.body;
        // console.log(req.filename);

        

        let data = await position.save({
            ...req.body,
            houseImg:req.filename,
            creatTime:moment().format('YYYY/MM/DD HH:mm:ss a')
        });
        if(data){
            res.render('succ',{
                data:JSON.stringify({
                    msg:'数据添加成功'
                })
            })
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'数据添加失败'
                })
            })
        }  
    },

    // 查询房源ID
    async findone(req,res){
        res.set('content-type','application/json;charset=utf-8');
        let data = await position.findone(req.body.id);
        // console.log(id);
        if(data){
            res.render('succ',{
                data:JSON.stringify(data)
            })
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'数据修改失败'
                })
            })
        }
    },

    // 修改房源列表
    async edit(req,res){
        res.set('content-type','application/json;charset=utf-8');
        // console.log(req.body);
        // console.log(req.filename);
        let data = {
            ...req.body,
            creatTime:moment().format('YYYY/MM/DD HH:mm:ss a')
        }
        if(req.filename){
            data.houseImg = req.filename
        }
        let result = await position.updata(data);
        // console.log(data);
        if(result){
            res.render('succ',{
                data:JSON.stringify({
                    msg:'数据修改成功'
                })
            })
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'数据修改失败'
                })
            })
        }
    },

    // 删除房源数据
    async del(req,res){
        res.set('content-type','application/json;charset=utf-8');
        let data = await position.del(req.body.id);
        if(data){
            res.render('succ',{
                data:JSON.stringify({
                    msg:'数据删除成功'
                })
            })
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'数据删除失败'
                })
            })
        }
    },

    //搜索房源信息
    async search(req,res){
        let {keyword} = req.body;
        // console.log(keyword);
        let result = await position.search(keyword);
        // console.log(result)
        if(result.length>=1){
            res.render('succ',{
                data:JSON.stringify(result)
            })
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'没有查询到合适的房源 , 请重新输入:'
                })
            })
        }
    }

}

