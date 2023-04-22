var express = require('express');
const AccountModel = require('../../models/AccountModel')
const moment = require('moment')
var router = express.Router();
let checkLoginMiddleware = require('../../middleWares/checkLoginMiddleware')

//添加首页路由规则
router.get('/',(req,res)=>{
  res.redirect('/account')
})

//首页
router.get('/account',checkLoginMiddleware, function (req, res, next) {
  // let accounts = db.get('account').value()
  AccountModel.find().sort({ time: -1 }).exec().then((accounts) => {
    res.render('list', { accounts, moment });
  }).catch(() => {
    res.status(500).send('读取失败！')
  })

});
//新增
router.get('/account/create',checkLoginMiddleware, function (req, res, next) {
  res.render('create');
});
//新增表单
router.post('/account',checkLoginMiddleware, function (req, res, next) {

  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then((result) => {
    res.render('success', { msg: '添加成功！', url: '/account' })
  }).catch((err) => {
    res.status(500).send('插入失败')
    console.log(err);

  })
});
//删除
router.get('/account/:id',checkLoginMiddleware, function (req, res, next) {
  let id = req.params.id
  AccountModel.deleteOne({ id: id })
    .then(() => {
      res.render('success', { msg: '删除成功！', url: '/account' });
    }).catch(() => {
      res.status(500).send('删除失败！')
    })

})
module.exports = router;
