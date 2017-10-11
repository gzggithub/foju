var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_STR = "mongodb://localhost:27017/teacher";
var ObjectId = require("mongodb").ObjectId;


// 添加分类
router.get('/add', function (req, res, next) {
    res.render('admin/category_add');
});

//  添加分类的实现
router.post('/add',function (req, res) {
    //获取表单的内容
    var title = req.body.title;
    var sort = req.body.sort;

    //将得到的数据保存在数据库中
    MongoClient.connect(DB_STR, function (err, db) {
        if (err) {
            res.send(err);
        } else {
            var c = db.collection("name");
            c.insert({title: title, sort:sort}, function (err, result) {
                if(err) {
                    res.send(err);
                } else {
                    res.send("添加分类成功!<a href='/admin/cats'>查看列表</a>")
                }
            })
        }
    })
})

// // 编辑分类
// router.get('/edit', function (req, res, next) {
//     res.render('admin/category_edit');
// });

// 显示分类
router.get('/', function (req, res, next) {
    //连接数据库
    MongoClient.connect(DB_STR, function (err, db) {
        if (err) {
            res.send(err);
        } else {
            var c = db.collection("name");
            c.find().toArray(function (err, docs) {
                if (err) {
                    res.send(err);
                } else {
                    res.render('admin/category_list', {data: docs})
                }
            })
        }
    })
});

// 编辑分类
router.get('/edit', function (req, res, next) {
    // 获取查询到的ID
    var id = req.query.id;
    // 通过ID连接数据库,获取数据
    MongoClient.connect(DB_STR, function (err, db) {
        if (err) {
            res.send(err)
        } else {
            var c = db.collection("name");
            c.find({_id: ObjectId(id)}).toArray(function (err, docs) {
                if (err) {
                    res.send(err);
                } else {
                    // 将数据渲染到编辑页面
                    res.render('admin/category_edit', {data: docs[0]})
                }
            })
        }
    })
})

// 更新数据
router.post('/edit', function (req, res, next) {
    // 获取表单的数据
    var title = req.body.title;
    var sort = req.body.sort;
    var id = req.body.id;

    // 更新数据库的数据
    MongoClient.connect(DB_STR, function (err, db) {
        if (err) {
            res.send(err);
        } else {
            var c = db.collection("name");
            c.update({_id: ObjectId(id)}, {$set:{"title": title, "sort":sort}},function (err, docs) {
              if (err) {
                  res.send(err)
              } else {
                  res.send("更新成功!<a href='/admin/cats'>返回列表</a>")
              }
            })
        }
    })
});

// 删除分类
router.get('/delete', function (req, res) {
    // 获取删除行的id
    var id = req.query.id; // 为什么不是req.query._id

    MongoClient.connect(DB_STR, function (err, db) {
        if (err) {
            res.send(err)
        } else {
            var c = db.collection("name");
            c.remove({_id: ObjectId(id)}, function (err, result) {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect('/admin/cats')
                }
            })
        }
    })

})
module.exports = router;
