/**
 * Created by SUHANG on 17/9/27.
 */
//第一步 载入express
const express = require('express')

//第二步,创建一个应用
var app = express()

//第三步,提供一个http的一个服务
app.get("/",function (req, res) {
    res.send("<h1>hello</h1>")
});

//第四步,监听端口
app.listen(3000)