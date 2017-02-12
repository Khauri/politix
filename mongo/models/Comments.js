var mongoose = require('mongoose');
var shortid = require('shortid');

module.exports = mongoose.model('Comment', new mongoose.Schema({
        bill : {
            type: String,
            required: true
        },
        comment : String,
        replies : [{
            type: String,
            ref: 'Comment'
        }],
        parent : {
            type : String,
            ref : 'Comment',
            default  : "NONE"
        },
        user : {
            type: String,
            ref: 'User',
            required: true
        },
        type : {
            type : String,
            required : true
        },
        _id: {
            type: String,
            default: shortid.generate
        }
    })
);