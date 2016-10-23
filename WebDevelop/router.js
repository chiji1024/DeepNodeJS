
const http = require("http");
const url = require("url");
const hostName = "127.0.0.1";
const port = 1337;

var handle = {};

const server = http.createServer( (req, res) => {
    var pathName = url.parse(req.url).pathname; // /controller/action/params
    var paths = pathName.split("/");
    var controller = paths[1] || "index";
    var action = paths[2] || "index";
    res.setHeader("Content-Type", "text/plain");
    var queryObj = url.parse(req.url, true).query;
    var args = [req, res];
    args.push(queryObj);
    if(handle[controller] && handle[controller][action]){
        handle[controller][action].apply(null, args);
    }else{
        res.statusCode = 500;
        res.end("找不到控制器");
    }
});

handle.index = {};
handle.index.index = function(req, res, params){
    res.statusCode = 200;
    res.end(params instanceof Object ? JSON.stringify(params) : "no params");
};

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
});