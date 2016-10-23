
const http = require("http");

var helloWorld = "";
for(var i=0;i< 1024 * 10;i++){
    helloWorld += "h";
}

//helloWorld = new Buffer(helloWorld);
//buffer 用于提升性能
const server = http.createServer(function(req, res){
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html;charset=utf8");
    res.end(helloWorld);
});
server.listen(8080,"127.0.0.1",function() {
        console.log("server is running on localhost:8080");
    }
);



