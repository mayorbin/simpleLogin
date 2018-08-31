//导入模块
const path = require('path');
const xtpl = require('xtpl');

//导入连接数据库的工具
const tools = require(path.join(__dirname, '../tools/databasetool.js'));

/**
 * 返回学生列表页
 */
exports.getListPage = (req, res) => {
    const keyword = req.query.keyword || '';

    tools.findList('studentInfo', { name: { $regex: keyword } }, (err, docs) => {

        xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
            students: docs,
            keyword,
            loginName: req.session.loginName
        }, function (error, content) {
            res.send(content);
        });
    });
}

/**
 * 跳转新增页面
 */
exports.getAddPage = (req, res) => {
    xtpl.renderFile(path.join(__dirname, '../statics/views/add.html'), {
        loginName: req.session.loginName
    }, function (error, content) {
        res.send(content);
    });
}

/**
 * 新增学生
 */
exports.addStudent = (req, res) => {
    tools.insertOne('studentInfo', req.body, (err, result) => {
        if (result == null) {
            res.send(`<script>alert('新增失败')</script>`);
        } else {
            res.send(`<script>location = '/studentmanager/list'</script>`);
        }
    })
}

/**
 * 跳转到编辑页面
 */
exports.getEditPage = (req, res) => {
    tools.findOne('studentInfo', { _id: tools.ObjectId(req.params.studentId) }, (err, doc) => {
        xtpl.renderFile(path.join(__dirname, '../statics/views/edit.html'), {
            student: doc,
            loginName: req.session.loginName
        }, function (error, content) {
            res.send(content);
        });
    });
}

/**
 * 完成编辑
 */
exports.finishEdit = (req, res) => {
    tools.updateOne('studentInfo', { _id: tools.ObjectId(req.params.studentId) }, req.body, (err, result) => {
        if (result == null) {
            res.send(`<script>alert('修改失败');</script>`);
        } else {
            res.send(`<script>location = '/studentmanager/list';</script>`);
        }
    });
}

/**
 * 删除学生
 */
exports.deleteStudent = (req, res) => {
    tools.deleteOne('studentInfo', { _id: tools.ObjectId(req.params.studentId) }, (err, result) => {
        if (result == null) {
            res.send(`<script>alert('删除失败');</script>`);
        } else {
            res.send(`<script>location = '/studentmanager/list';</script>`);
        }
    });
}