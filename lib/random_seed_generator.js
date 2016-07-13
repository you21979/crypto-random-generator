var crypto = require('crypto');
var Promise = require('bluebird');
var randomSeedGenerator = module.exports = function(needByte){
    return new Promise(function(resolve, reject){
        crypto.randomBytes(needByte, function(err, buf){
            if (err) reject(err);
            else resolve(buf)
        });
    })
}
