//导入模块
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd21';

/**
 * 查询一条数据
 */
exports.findOne = (collectionName, params, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        //获取操作数据库的db对象
        const db = client.db(dbName);
        //获取集合
        const collection = db.collection(collectionName);

        collection.findOne(params, (err, doc) => {
            //关闭连接
            client.close();

            callback(err, doc);
        });
    });
}

/**
 * 插入一条数据
 */
exports.insertOne = (collectionName, params, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        //获取操作数据库的db对象
        const db = client.db(dbName);
        //获取集合
        const collection = db.collection(collectionName);

        collection.insertOne(params, (err, result) => {
            client.close();
            callback(err, result);
        });
    });
}

/**
 * 获取列表
 */
exports.findList = (collectionName, params, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        //获取操作数据库的db对象
        const db = client.db(dbName);
        //获取集合
        const collection = db.collection(collectionName);

        collection.find(params).toArray(function (err, docs) {
            client.close();
            callback(err, docs);
        });
    });
}