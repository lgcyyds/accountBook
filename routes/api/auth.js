var express = require('express');
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
var router = express.Router();

//登录
router.post('/login',(req, res) => {
    let { username, password } = req.body
    UserModel.findOne({ username: username, password: md5(password) }).then((data) => {
        if (!data) {
            res.json({
                code:'2002',
                msg:'用户名或密码错误！',
                data:null
            })
            return new Promise.reject(new Error('faile'))
        }

        // 创建当前用户token
        const token = jwt.sign({
            username:data.username,
            _id:data._id
        },'lgc',{
            expiresIn:60*60*24*14
        })
        // 响应token
        res.json({
            code:'0000',
            msg:'登录成功',
            data:token
        })

        res.render('success', { msg: '登录成功', url: '/account' })
    }).catch(() => {
        res.status(500).send('登录失败！')
        res.json({
            code:'2001',
            msg:'数据库读取失败',
            data:null
        })
    })
})
//退出登录
router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功！',url:'/login'})
    })
})

module.exports = router;
