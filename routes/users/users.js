var express = require('express');
var Router = express.Router();

var mongoose = require('mongoose');

var User = require('../../mongo/models/User');

Router.route('/')
    .get(function(req,res,next){
        User.find()
            .limit(50)
            .sort()
            .exec( function(err, users){
                res.json(err || users);
            })            
    })
    .post(function(req, res, next){
        var user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                nickname: req.body.nickname,
                email: req.body.email,
                phone: req.body.phone,
                description: req.body.description,
                level: req.body.level,
                type: req.body.type
            
        });

        user.save(function(err, user) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    status: 200,
                    message: "success"
                });
            }
        });
    });

Router.route('/:user_id')
    .get(function(req, res, next){
        User.findOne({
            _id: req.params.user_id
        })
            .exec(function(err, user){
                res.json(err || user);
            });
    })
    .put(function(req, res, next){
        User.findOne({_id:req.params.user_id})
            .exec(function(err, user){
                var l = ["first_name", "last_name", "nickname", "pic_url", "email", "phone", "level", "description"]
                for (var i = 0; i < l.length; i++){
                    user[l[i]] = req.body[l[i]] || user[l[i]];
                }
                user.save(function(err, user){
                    res.json(err || user)
                });
            });
    })
    .delete(function(req, res, next){
        User.findOne({
            _id: req.params.user_id
        })
            .remove()
            .exec(function(err) {
                if (err) {
                    res.json(err);
                } else {
                    //remove user from all rooms in
                    res.json({
                        status: 200,
                        message: "success"
                    })
                }
            });
    });

module.exports = Router;