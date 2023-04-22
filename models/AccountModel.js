//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型

const  mongoose = require("mongoose");

let AccountSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    time:Date,
    type:{
        type:Number,
        default:-1
    },
    money:{
        type:Number,
        required:true
    },
    remarks:{
        type:String
    }
})

//创建模型对象，对文档操作的封装对象
let AccountModel = mongoose.model('accounts',AccountSchema)

module.exports=AccountModel