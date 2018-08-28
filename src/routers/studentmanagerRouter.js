//导入模版
const express = require('express');
const path = require('path');

//创建路由
const studentManagerRouter = express.Router();

//导入控件
const studentManagerCTRL = require(path.join(__dirname,'../controllers/studentManagerController.js'));

//处理请求
studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage);

//导出
module.exports = studentManagerRouter;