var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var cors = require('cors');

//load customers route

var app = express();
app.use(cors());

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');
var uuid = require('node-uuid');

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + '' + month + '' + day;
var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = rfs('access-' + newdate + '.log', {
  interval: '1d',
  path: logDirectory
})

app.use(morgan('combined', {
  stream: accessLogStream
}));

// development only

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
require('./connection')(app);
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));  
});