const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const token = req.get('token')
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token不存在',
            data: null
        })
    }

    jwt.verify(token, 'lgc', (err, data) => {
        if (err) {
            return res.json({
                code: '2004',
                msg: 'token校验失败',
                data: null
            })
        }
        //保存用户的信息...这是什么？
        req.user = data;
        console.log(data);
        
        next()
    })
}