var request = require('request');
var express = require('express');

var Router = express.Router();

var Comment = require('../../mongo/models/Comments');

Router.route('/')
    .get(function(req, res, next){
        Comment.find()
            .exec(function(err, comment){
                res.json(err || comment);
            })
    })
    .post(function(req, res, next){
        var comment = new Comment({
            bill: req.body.bill,
            comment: req.body.comment,
            user: req.body.user,
            type: "comment"
        });

        comment.save(function(err, comment){
            res.json(err || {status:200, message: "success"})
        });
    });

Router.route('/:comment_id')
    .get(function(req, res, next){ // get a particular comment
        Comment.findOne({
            _id: req.params.comment_id
        })
            .populate('replies')
            .exec(function(err, comment){
                res.json(err || comment);
            });
    })
    .put(function(req, res, next){ // edit a comment (commenr)
        Comment.findOneAndUpdate({_id: req.params.comment_id},{comment : req.body.comment}, {new:true},function(err, comment){
            res.json(err || comment);
        });
    });

Router.route('/:comment_id/replies')
    .get(function(req, res, next){ // get replies to a particular comment
        Comment.find({
            parent: req.params.comment_id
        })
            .exec(function(err, comments){
                res.json(err || comments);
            })
    })
    .post(function(req, res, next){
        Comment.findOne({
            _id: req.params.comment_id
        })
            .exec(function(err, comment){
                if(err){
                    res.json(err)
                }
                else if (comment){
                    var reply = new Comment({
                        bill: comment.bill,
                        comment: req.body.comment,
                        user: req.body.user,
                        parent : comment._id,
                        type: "reply"
                    });

                    reply.save(function(err, reply){ 
                        if(err){
                            res.json(err);
                        }
                        else{
                            comment.replies.push(reply._id);
                            comment.save(function(err, comment){
                                res.json(err || reply);
                            })
                        }
                    })  
                }
            })
    })

module.exports = Router;