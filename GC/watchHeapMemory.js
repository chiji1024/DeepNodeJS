
var showMem = function (){
    var mem = process.memoryUsage();
    var format = function(bytes){
        return (bytes/1024/1024).toFixed(2) + "MB";
    };
    console.log("process: heapTotal: "+format(mem.heapTotal)+" heapUsed: "+format(mem.heapUsed)+" rss: "+format(mem.rss));
};
//堆内
/*var useMem = function(){
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);
    for(var i = 0; i <size; i++){
        arr.push(0);
    }
    return arr;
};*/
//堆外 buffer
var useMem = function (){
    var size = 200 *1024 * 1024;
    var buf = new Buffer(size);
    for(var i =0; i<size;i++){
        buf[i] = 0;
    }
    return buf;
};

var total = [];
for(var j = 0; j< 15;j++){
    showMem();
    total.push(useMem());
}
//内存溢出
console.log("end");


