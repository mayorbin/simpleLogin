//导入模块
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd21';

exports.ObjectId = ObjectId;

/**
 * 抽取连接数据库的方法
 */
const connectDB = (collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        //获取操作数据库的db对象
        const db = client.db(dbName);
        //获取集合
        const collection = db.collection(collectionName);

        //把结果传出去
        callback(err, client, collection);
    });
}

/**
 * 查询一条数据
 */
exports.findOne = (collectionName, params, callback) => {
    connectDB(collectionName, (err, client, collection) => {
        collection.findOne(params, (err, doc) => {
            //关闭连接
            client.close();

            callback(err, doc);
        });
    })
}

/**
 * 插入一条数据
 */
exports.insertOne = (collectionName, params, callback) => {
    connectDB(collectionName, (err, client, collection) => {
        collection.insertOne(params, (err, result) => {
            client.close();
            callback(err, result);
        });
    })
}

/**
 * 获取列表
 */
exports.findList = (collectionName, params, callback) => {
    connectDB(collectionName, (err, client, collection) => {
        collection.find(params).toArray(function (err, docs) {
            client.close();
            callback(err, docs);
        });
    })
}

/**
 * 修改一条数据
 */
exports.updateOne = (collectionName, condition, params, callback) => {
    connectDB(collectionName, (err, client, collection) => {
        collection.updateOne(condition, { $set: params }, (err, result) => {
            client.close();
            callback(err, result);
        });
    })
}

/**
 * 删除一条数据
 */
exports.deleteOne = (collectionName, params, callback) => {
    connectDB(collectionName, (err, client, collection) => {
        collection.deleteOne(params, (err, result) => {
            client.close();
            callback(err, result);
        });
    })
}