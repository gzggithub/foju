var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_STR = "mongodb://localhost:27017/teacher";// 数据库地址
// var ObjectId = require("mongodb").ObjectId;

// 文章列表显示
router.get('/', function (req, res, next) {
    MongoClient.connect(DB_STR, function (err, db) {
        if (err) {
            res.send(err);
        } else {
            var c = db.collection("article");
            c.find().toArray(function (err, docs) {
                if (err) {
                    res.send(err);
                } else {
                    res.render('admin/article_list', {data: docs});
                }
            })
        }
    })

});

// 文章添加
router.get('/add', function (req, res, next) {
   MongoClient.connect(DB_STR, function (err, db) {
       if (err) {
           res.send(err);
       } else {
           var c = db.collection("article");
           c.find().toArray(function (err, docs) {
               if (err) {
                   res.send(err);
               } else {
                   //在渲染页面时,传递数据到视图界面
                   res.render('admin/article_add', {data: docs});
               }
           })
       }
   })
});
//文章添加的具体实现
router.post('/add', function (req, res) {
    // 获取页面的数据
    var cat = req.body.cat;
    var title = req.body.title;
    var summary = req.body.summary;
    var content = req.body.content;
    var time = new Date();

    var data = {
        "cat": cat,
        "title": title,
        "summary": summary,
        "content": content,
        "time": time
    }
    // 将页面的数据存储到数据库中
    MongoClient.connect(DB_STR, function (err, db) {
        if(err) {
            res.send(err)
        } else {
            var c = db.collection("article");
            c.insert(data, function (err, docs) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("添加文章成功!<a href='/admin/post'>查看文章列表</a>")
                }
            })
        }
    })
})
module.exports = router;
