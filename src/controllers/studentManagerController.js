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
            keyword
        }, function (error, content) {
            res.send(content);
        });
    });
}