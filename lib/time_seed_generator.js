var Promise = require('bluebird');
var timeEntropy = function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve((new Date() % 2).toString());
        }, Math.random() * 100)
    })
}
var timeSeedGenerator = module.exports = function(bytesize){
    var w = []
    for(var i = 0; i < bytesize; ++i ){
        w.push(timeEntropy())
        w.push(timeEntropy())
        w.push(timeEntropy())
        w.push(timeEntropy())
        w.push(timeEntropy())
        w.push(timeEntropy())
        w.push(timeEntropy())
        w.push(timeEntropy())
    }
    return Promise.all(w).then(function(list){
        var max = list.length / 8;
        var x = []
        var b = new Buffer(bytesize);
        for(var i = 0; i < max; ++i){
            x.push(parseInt(list.slice(i * 8, (i * 8) + 8).join(''), 2))
        }
        x.forEach(function(v, idx){ b.writeUInt8(v, idx) })
        return b
    })
}
