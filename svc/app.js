// Create express web hosting instance
var express = require('express');
var http = require('http');
var cors = require('cors');
var cookieParser = require('cookie-parser');

// Configure expess settings
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
app.set('DB', connection(mysql, config.DB, 'pool'));

// Configure logging
require('./common/logger')(app, express);

// Create app routes
require('./modules/auth/authenticate')(app); // TODO: Move to app routing

// Host http server
app.set('port', process.env.PORT || 4300);
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));  
});
