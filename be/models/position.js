// 连接数据库，产生 positions 集合，数据操作
const mongoose = require('../utils/db');

const Position = mongoose.model('positions',{
    houseImg : String,
    title : String,
    houseType : String,
    price : String,
    place : String,
    creatTime:String,
})

module.exports = {

    // 添加数据
    // save({title,houseType,price,place}){
    //     let pos = new Position({title,houseType,price,place});
    //     return pos.save();
    // }
    save(data){
        let pos = new Position(data);
        return pos.save();
    },

    // 查找数据
    find({ start , count }){ 
        // return Position.find({}).sort({_id:-1}).limit(~~count).skip(~~start);
        return {
            list  : Position.find({}).sort({_id:-1}).limit(~~count).skip(~~start),
            total : Position.count({})
        }
    },

    // 查找ID
    findone(id){
        return Position.findById(id);
    },

    // 更新数据
    updata(data){
        return Position.updateOne({_id:data.id},data)
    },

    // 删除数据
    del(id){
        return Position.deleteOne({_id:id});
    },

    // 搜索关键字
    search(keyword){
        return Position.find({
            $or:
            [
                {title:new RegExp(keyword,'gi')},
                {place:new RegExp(keyword,'gi')}
            ]
        }).sort({_id : -1})
    }
}