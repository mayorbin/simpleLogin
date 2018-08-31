//导入模块
const path = require('path');
const express = require('express');

//创建路由
const studentRouter = express.Router();

//导入控制器
const studentCTRL = require(path.join(__dirname,'../controllers/studentManagerController.js'));

//处理请求
studentRouter.get('/list',studentCTRL.getListPage);

//导出
module.exports = studentRouter;