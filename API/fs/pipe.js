
//使用管道
const fs = require("fs");
var writeStream = fs.createWriteStream("test_copy.png");
var readStream = fs.createReadStream("test.png");

readStream.pipe(writeStream);
