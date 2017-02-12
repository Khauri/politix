// impports
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


/* Setup API routes */
var api = require('./routes/api');
var users = require('./routes/users/users');
var legislators = require('./routes/content/legislators');

var comments = require('./routes/content/comments');
var bills = require('./routes/content/bills');

var app = express()

var mongo = require('./mongo/controller');

mongo.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', api);
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/legislators', legislators);
app.use('/api/comments', comments);
app.use('/api/bills', bills);

app.listen(3000, function () {
  console.log('listening on port 3000!')
})