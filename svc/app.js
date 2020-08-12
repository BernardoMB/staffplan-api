// Create express web hosting instance
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Configure express settings
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cookieParser());

// Create connection to master DB
const mysql = require('mysql');
const connection = require('express-myconnection');
const config = require('./common/config');
app.use(connection(mysql, config.DB, 'request'));

// Create app level log trace
require('./apptrace')(app);
// Create app routes
require('./modules/route')(app);

// TODO: Hosting needs to needs to consider the cluster mode 

// log request and response time
const log = require('./common/logger');

// Host http server
app.set('port', process.env.PORT || 80);
http.createServer(app).listen(app.get('port'), function () {
  log.info(`Express server listening on port ${app.get('port')}`);
});
