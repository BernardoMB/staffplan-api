
// TODO:  Logging needs to be cleaned up

var path = require('path');

module.exports = function (app, express) {  
  // app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.logger('dev'));

  app.use(function(req, res, next) {
    console.info(`START ${req.path}`);
    const startTime = Date.now();
    res.on('header', () => {
      console.info(`END ${req.path} ${(Date.now() - startTime) / 1000}Sec`);
    })
    next();
  });

  var fs = require('fs');
  var morgan = require('morgan');
  var path = require('path');
  var rfs = require('rotating-file-stream');

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  newdate = year + '' + month + '' + day;
  var logDirectory = path.join(__dirname, '../../log')
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
}
