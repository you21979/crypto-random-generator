var Promise = require('bluebird');
var crypto = require('crypto');

var randomSeedGenerator = require("./random_seed_generator");
var timeSeedGenerator = require("./time_seed_generator");

var hash = function(buf){
    return crypto.createHash('sha512').
        update(buf).
        digest()
}

var cryptoRandomGenerator = module.exports = function(addEntPromise){
    var task = [];
    task.push(randomSeedGenerator(64));
    task.push(timeSeedGenerator(64));
    if(addEntPromise) task.push(addEntPromise())
    return Promise.all(task).then(function(res){
        return hash(Buffer.concat(res))
    })
}

