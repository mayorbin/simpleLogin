//导入模块
const path = require('path');
const svgCaptcha = require('svg-captcha');

//导入操作数据库的工具
const tools = require(path.join(__dirname, '../tools/databasetool.js'));

/**
 * 返回登录页面
 */
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'));
}

/**
 * 返回注册页面
 */
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/register.html'));
}

/**
 * 用户注册
 */
exports.register = (req, res) => {
    const result = { status: 0, message: '注册成功' };

    tools.findOne('accountInfo', { username: req.body.username }, (err, doc) => {
        if (doc) {
            result.status = 1;
            result.message = '用户名已存在';
            res.json(result);
        } else {
            //不存在就要存进数据库
            tools.insertOne('accountInfo', req.body, (err, result2) => {
                if (result2 == null) {
                    result.status = 2;
                    result.message = '注册失败';
                }

                res.json(result);
            });
        }
    });
}

/**
 * 生成验证图片
 */
exports.getVcode = (req, res) => {
    var codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 50
    }
    var captcha = svgCaptcha.create(codeConfig);

    // console.log(captcha);
    req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码

    var codeData = {
        img: captcha.data
    }
    res.type('svg');
    res.status(200).send(captcha.data);
}

/**
 * 登录
 */
exports.login = (req, res) => {
    const result = { status: 0, message: '登录成功' };

    //校验验证码
    if (req.session.captcha != req.body.vcode) {
        result.status = 1;
        result.message = '验证码错误';
        res.json(result);

        return;
    }

    tools.findOne('accountInfo', { username: req.body.username, password: req.body.password }, (err, doc) => {
        if (doc == null) {
            result.status = 2;
            result.message = '用户名或密码错误';
        }else {
            req.session.loginName = req.body.username;
        }
        res.json(result);
    })
}

/**
 * 退出操作
 */
exports.logout = (req,res) => {
    //清空session
    req.session.loginName = null;

    res.send(`<script>location = '/account/login';</script>`);
}