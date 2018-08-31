//导入模块
const express = require('express');
const path = require('path');

//创建路由
const accountRouter = express.Router();

//导入控制器
const accountCTRL = require(path.join(__dirname,'../controllers/accountControllers.js'));

//处理请求
//返回登录页面给浏览器
accountRouter.get('/login',accountCTRL.getLoginPage);

//返回注册页面给浏览器
accountRouter.get('/register',accountCTRL.getRegisterPage);

//注册
accountRouter.post('/register',accountCTRL.register);

//生成验证码
accountRouter.get('/vcode',accountCTRL.getVcode);

//登录
accountRouter.post('/login',accountCTRL.login);

//退出
accountRouter.get('/logout',accountCTRL.logout);

//导出路由
module.exports = accountRouter;