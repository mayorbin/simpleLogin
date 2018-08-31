//导入模块
const path = require('path');
const express = require('express');

//创建路由
const studentRouter = express.Router();

//导入控制器
const studentCTRL = require(path.join(__dirname,'../controllers/studentManagerController.js'));

//处理请求
//返回学生列表页
studentRouter.get('/list',studentCTRL.getListPage);

//跳转新增页面
studentRouter.get('/add',studentCTRL.getAddPage);

//新增学生
studentRouter.post('/add',studentCTRL.addStudent);

//跳转编辑页面
studentRouter.get('/edit/:studentId',studentCTRL.getEditPage);

//完成编辑
studentRouter.post('/edit/:studentId',studentCTRL.finishEdit);

//删除学生
studentRouter.get('/delete/:studentId',studentCTRL.deleteStudent);

//导出
module.exports = studentRouter;