/**
 * Created by chiji on 2016/10/9.
 */


const http = require("http");

const hostName = "127.0.0.1";
const port = 1337;

http.createServer(function (req, res) {
    req.cookies = parseCookie(req.headers.cookie);
    res.setHeader("Content-Type", "text/plain;charset=utf8");
    handle(req, res);

}).listen(port, hostName, ()=>{
    console.log(`Server running at http://${hostName}:${port}/`);
});


var handle = function(req, res){
    if(!req.cookies.isVisit){
        res.setHeader("Set-Cookie", serialize("isVisit", 1, {maxAge: 20, path: "/", httpOnly:true}));
        res.statusCode = 200;
        res.end("第一次访问");
    }else{
        res.statusCode = 200;
        res.end("欢迎再次访问");
    }
}
//解析cookie字符串，返回对象
var parseCookie = function(cookie){
    var cookies = {};
    if(!cookie){
        return cookies;
    }
    var list = cookie.split(";");
    for(var i=0; i<list.length; i++){
        var couple = list[i].split("=");
        cookies[couple[0].trim()] = couple[1];
    }
    return cookies;

};
//序列化cookies
var serialize = function(name, val, opt){
    var cookieArr = [name + '=' + val];
    opt = opt || {};

    if(opt.maxAge) cookieArr.push("Max-Age=" + opt.maxAge);
    if(opt.domain) cookieArr.push("Domain=" + opt.domain);
    if(opt.path) cookieArr.push("Path=" + opt.path);
    if(opt.expires) cookieArr.push("Expires=" + opt.expires.toUTCString());
    if(opt.httpOnly) cookieArr.push("HttpOnly");
    if(opt.secure) cookieArr.push("Secure"); //https传输

    return cookieArr.join(" ; ");
}

