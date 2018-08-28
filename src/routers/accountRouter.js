//导入模块
const express = require('express');
const path = require('path');

//创建路由对象
const accountRouter = express.Router();

//导入控制器
const accountCTRL = require(path.join(__dirname,'../controllers/accountControllers.js'));

//处理具体请求
//获取登录页面的请求
accountRouter.get('/login',accountCTRL.getLoginPage);

//获取注册页面的请求
accountRouter.get('/register',accountCTRL.getRegisterPage);

//处理注册请求
accountRouter.post('/register',accountCTRL.register);

//处理图片验证码
accountRouter.get('/vcode',accountCTRL.getVcode);

//处理登录
accountRouter.post('/login',accountCTRL.login);

//导出
module.exports = accountRouter;