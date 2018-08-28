//导入模块
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const captchapng = require("captchapng");

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd21';

/**
 * 返回登录页面给浏览器
 */
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'));
};

/**
 * 返回注册页面给浏览器
 */
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/register.html'));
}

/**
 * 把用户名和密码保存起来,返回结果给浏览器
 */
exports.register = (req, res) => {
    const result = { status: 0, message: "注册成功" };

    //去数据库中查询
    // Use connect method to connect to the server
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        //获取操作数据库的db对象
        const db = client.db(dbName);

        //拿到集合
        const collection = db.collection('accountInfo');

        //先根据用户名查询
        collection.findOne(({ username: req.body.username }), (err, doc) => {
            if (doc) {
                //关闭连接
                client.close();

                //更改返回的状态
                result.status = 1;
                result.message = "用户名已存在";

                res.json(result);
            } else {
                //如果用户名不存在,就要插入数据
                collection.insertOne(req.body, (err, result2) => {
                    //关闭连接
                    client.close();
                    if (result2 == null) {
                        result.status = 2;
                        result.message = "注册失败";
                    }

                    res.json(result);
                })
            }
        });

    });
}

/**
 * 返回图片验证码
 */
exports.getVcode = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    //把生成的验证码存到session
    req.session.vcode = vcode;

    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

/**
 * 登录
 */
exports.login = (req, res) => {
    const result = { status: 0, message: "登录成功" };

    //校验验证码
    if (req.body.vcode != req.session.vcode) {
        result.status = 1;
        result.message = '验证码错误';

        res.json(result);
        return;
    }

    //连接数据库查询
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        //获取操作数据库的db对象
        const db = client.db(dbName);

        //拿到集合
        const collection = db.collection('accountInfo');

        //先根据用户名查询
        collection.findOne(({ username: req.body.username, password: req.body.password }), (err, doc) => {
            //关闭连接
            client.close();

            if (doc == null) {
                result.status = 2;
                result.message = '用户名或密码错误';
            }

            res.json(result);
        });

    });
}