// Create express web hosting instance
var express = require('express');
var http = require('http');
var cors = require('cors');
var cookieParser = require('cookie-parser');

// Configure express settings
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cookieParser());

// Create connection to master DB
const mysql = require('mysql');
const connection  = require('express-myconnection');
const config = require('./common/config');
app.use(connection(mysql, config.DB, 'request'));

// Configure logging
require('./common/logger')(app, express);

// Create app routes
require('./modules/route')(app);
// TODO: It's Old Route need to be removed after refactoring
require('./routes')(app);

// Host http server
app.set('port', process.env.PORT || 4300);
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));  
});
