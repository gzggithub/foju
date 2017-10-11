/**
 * Created by SUHANG on 17/9/27.
 */
var http = require('http')
http.createServer(function (req, res) {
    res.end('hello');
}).listen(3000)
