var express = require('express');
const low = require('lowdb')
const AccountModel = require('../../models/AccountModel')
const moment = require('moment')
const checkTokenMiddleware = require('../../middleWares/checkTokenMiddleware')
var router = express.Router();
//首页
router.get('/account',checkTokenMiddleware, function (req, res, next) {
    // let accounts = db.get('account').value()
    AccountModel.find().sort({ time: -1 }).exec().then((accounts) => {
        res.json({
            code: '0000',
            msg: '读取成功',
            data: accounts
        })
    }).catch(() => {
        res.json({
            code: '1001',
            msg: '读取失败',
            data: null
        })
    })

});
//新增
router.get('/account/create',checkTokenMiddleware, function (req, res, next) {
    res.render('create');
});
//新增表单
router.post('/account',checkTokenMiddleware, function (req, res, next) {
    //表单验证


    AccountModel.create({
        ...req.body,
        time: moment(req.body.time).toDate()
    }).then((result) => {
        // res.render('success', { msg: '添加成功！', url: '/account' })
        res.json({
            coed: '0000',
            msg: '新增成功',
            data: result
        })

    }).catch((err) => {
        // res.status(500).send('插入失败')
        // console.log(err);
        res.json({
            code: '1001',
            msg: '新增失败',
            data: null
        })

    })
});
//删除
router.delete('/account/:id',checkTokenMiddleware, function (req, res, next) {
    let id = req.params.id
    AccountModel.deleteOne({ id: id })
        .then(() => {
            //   res.render('success', { msg: '删除成功！', url: '/account' });
            res.json({
                code: '0000',
                msg: '删除账单成功',
                data: {}
            })
        }).catch(() => {
            res.json({
                code: '1003',
                msg: "删除账单失败",

            })
        })

})
//获取单条账单信息
router.get('/account/:id',checkTokenMiddleware, function (req, res, next) {
    let id = req.params.id
    AccountModel.findById({ _id: id })
        .then((result) => {
            res.json({
                code: '0000',
                msg: '读取成功',
                data: result
            })
        }).catch(() => {
            res.json({
                code: '1003',
                msg: "读取失败",
                data: null
            })
        })

})
//更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware,function (req, res, next) {
    let id = req.params.id
    AccountModel.updateOne({ _id: id }, req.body)
        .then(() => {
            return AccountModel.findById(id)
        })
        .then((result) => {
            res.json({
                code: '0000',
                msg: '更新成功',
                data: result
            })
        }).catch(() => {
            res.json({
                code: '1005',
                msg: "更新失败",
                data: null
            })
        })

})
module.exports = router;
