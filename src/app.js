//导入模块
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

//创建应用
const app = express();

// Use the session middleware
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: false, cookie: {maxAge: 60000}}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//集成路由
const accountRouter = require(path.join(__dirname, './routers/accountRouter.js'));
app.use('/account', accountRouter);

const studentRouter = require(path.join(__dirname,'./routers/studentmanagerRouter.js'));
app.use('/studentmanager',studentRouter);

//开启web服务
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('start ok');
});