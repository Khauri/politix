var request = require('request');
var baseurl = 'https://openstates.org/api/v1';

module.exports = {
    open : function( url, cb ){
        request({
            method: 'GET',
            uri: baseurl + url,
            json: true
        }, function(err, response, body){
            cb(body);
        })
    }
};