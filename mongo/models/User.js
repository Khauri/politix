var mongoose = require('mongoose');
var shortid = require('shortid');

module.exports = mongoose.model('User', new mongoose.Schema({
    
        first_name: String,
        last_name: String,
        nickname: String,
        pic_url: String,
        email: String,
        phone: Number,
        description: String,
        level: String,
        type: String,
    created: {
        default: Date.now(),
        type: Date
    },
     _id: {
        type: String,
        default: shortid.generate
    }
}));