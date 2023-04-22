var express = require('express');
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
var router = express.Router();

//注册页面
router.get('/reg', (req, res) => {
    res.render('auth/reg')
})
//注册
router.post('/reg', (req, res) => {
    UserModel.create({ ...req.body, password: md5(req.body.password) }).then((data) => {
        res.render('success', { msg: '注册成功', url: '/login' })
    }).catch(() => {
        res.status(500).send('注册失败！')
    })
})
//登录页面
router.get('/login', (req, res) => {
    res.render('auth/login')
})
//登录
router.post('/login',(req, res) => {
    let { username, password } = req.body
    UserModel.findOne({ username: username, password: md5(password) }).then((data) => {
        if (!data) {
            return new Promise.reject(new Error('faile'))
        }
        //写入session
        req.session.username = data.username
        req.session._id = data._id
        res.render('success', { msg: '登录成功', url: '/account' })
    }).catch(() => {
        res.status(500).send('登录失败！')
    })
})
//退出登录
router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功！',url:'/login'})
    })
})

module.exports = router;
