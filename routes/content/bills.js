var request = require('request');
var express = require('express');

var Router = express.Router();

var openstates = require('../../openstates/openstates');

Router.route('/')
    .get(function(req, res, next){
        var url = "/bills/?state=dc&per_page=25&page=1";
        openstates.open(url, function( data ){
            res.json( data );
        });
    });

Router.route('/:bill_id')
    .get(function(req, res, next){
       url = '/bills/' + req.params.bill_id;
       openstates.open(url, function( data ){
           res.json( data );
       });
    })





module.exports = Router;