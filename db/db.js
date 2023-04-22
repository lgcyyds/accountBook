const mongoose = require('mongoose')
const {DBHOST,DBPORT,DBNAME} = require('../config/config')
module.exports = function (success, error) {
if(typeof error!=='function'){
    error=()=>{
        console.log('连接失败');
        
    }
}
    mongoose.set('strictQuery', true)

    //连接mongoose服务
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    //设置回调
    //连接成功的回调
    mongoose.connection.once('open', () => {
        success()
    })

    //连接失败的回调
    mongoose.connection.on('error', () => {
        error()
    })

    //连接关闭的回调
    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    })
}
