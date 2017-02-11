var express = require('express');
var Router = express.Router();

var meta = require('../meta.json');

Router.route('/')
    .get(function(req,res,next){
        res.json( meta );
    });

module.exports = Router;