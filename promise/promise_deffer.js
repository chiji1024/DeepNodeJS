/**
 * Created by 25068 on 2016/9/9.
 */
const EventEmitter = require("events");
const util = require("util");

var Promise = function(){
    EventEmitter.call(this);
};
util.inherits(Promise,EventEmitter);

/*
* Promise
* @param function fulfillHandler, errorHandler, progressHandler
* 成功，错误，进行中的回调函数
* */
Promise.prototype.then = function (fulfillHandler, errorHandler, progressHandler) {
  if(typeof fulfillHandler === "function"){
      this.once("success",fulfillHandler);
  }
  if(typeof errorHandler === "function"){
      this.once("error",errorHandler);
  }
  if(typeof progressHandler === "function"){
      this.once("progress",progressHandler);
  }
};

/*
* Deferred
* @property state promise
* */
var Deferred = function () {
    this.state = "unfulfilled";
    this.promise = new Promise();
};
Deferred.prototype.resolve = function(obj){
    this.state = "fulfilled";
    this.promise.emit("success",obj);
};
Deferred.prototype.reject = function(obj){
    this.state = "failed";
    this.promise.emit("error",obj);
};
Deferred.prototype.progress = function(obj){
    this.state = "progress";
    this.promise.emit("progress",obj)
};

//demo
/*var promisify = function (res) {
    var deferred = new Deferred();
    var result = "";
    res.on("data",function (chunk) {
        result += chunk;
        deferred.progress(chunk);
    });
    res.on("end",function () {
        deferred.resolve(result);
    });
    res.on("error",function(err){
        deferred.reject(err);
    });
    return deferred.promise;
};
promisify(res).then(function(result){
        //success
    },function(err){
        //error
    },function(data){
        //progress
});*/

