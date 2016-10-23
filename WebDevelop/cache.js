/**
 * Created by chiji on 2016/10/23.
 */

const http = require("http");
const fs = require("fs");
const url = require("url");
const crypto = require("crypto");

const hostName = "127.0.0.1";
const port = 1337;

var fileName = './nodejs.png';

//获取nodejs.png图片资源
http.createServer(function (req, res) {
    res.setHeader("Content-Type","image/png");
    handle(req, res);

}).listen(port, hostName, ()=>{
    console.log(`Server running at http://${hostName}:${port}/`);
});

/*
//使用if-modified-since缓存
//缺点：文件更改时间改变并不代表文件发生了改变，而且只支持到秒
var handle = function(req, res) {
    fs.stat(fileName, function (err, stats) {
        var lastModified = stats.mtime.toUTCString();
        if(lastModified == req.headers['if-modified-since']){
            res.statusCode = 304;
            res.end();
        }else{
            fs.readFile(fileName, function (err, file) {
                var lastModified = stats.mtime.toUTCString();
                res.setHeader("Last-Modified", lastModified);
                res.statusCode = 200;
                res.end(file);
            })
        }
    })
}*/

/*//使用ETAG缓存
var getHash = function (str) {
    var shasum = crypto.createHash("sha1");
    return shasum.update(str).digest("base64");
}
var handle = function (req, res) {
    fs.readFile(fileName, function (err, file) {
        var hash = getHash(file);
        var noneMatch = req.headers["if-none-match"];
        if(noneMatch == hash){
            res.statusCode = 304;
            res.end();
        } else {
            res.setHeader("ETag", hash);
            res.statusCode = 200;
            res.end(file);
        }
    })
}*/

//时间期限缓存
//一般为了兼容同时使用expires和cache-control
/*var handle = function (req, res) {

    fs.readFile(fileName, function (err, file) {
        var expires = new Date();
        expires.setTime(expires.getTime() + 10 * 365 * 24 * 3600 * 1000);
        res.setHeader('Expires', expires.toUTCString());
        res.setHeader("Cache-Control", "max-age=" + 10 * 3600 * 24 * 3600 * 1000);
        res.statusCode = 200;
        res.end(file);
    })
}*/
//如果不需要缓存了，直接更改文件url即可


