//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型

const  mongoose = require("mongoose");

let BookSchema = new mongoose.Schema({
    name:String,
    author:String,
    price:Number
})

//创建模型对象，对文档操作的封装对象
let BookModel = mongoose.model('books',BookSchema)

modules.exports=BookModel