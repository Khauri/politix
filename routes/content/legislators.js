var request = require('request');
var express = require('express');

var Router = express.Router();

var openstates = require('../../openstates/openstates');

Router.route('/')
    .get(function(req, res, next){
        var url = "/legislators";
        openstates.open(url, function( data ){
            res.json( data );
        });
    });

Router.route('/near')
    .get(function(req, res, next){
        var lat = req.query.lat,
            long = req.query.long,
            url = '/legislators/geo/?lat='+lat+"&long="+long;
            openstates.open(url, function( data ){
                res.json( data );
            });
    })

module.exports = Router;