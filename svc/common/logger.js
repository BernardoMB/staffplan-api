
// TODO:  Logging needs to be cleaned up

const path = require('path');

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

  const fs = require('fs');
  const morgan = require('morgan');
  const path = require('path');
  const rfs = require('rotating-file-stream');

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  newdate = year + '' + month + '' + day;
  const logDirectory = path.join(__dirname, '../../log')
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

  const accessLogStream = rfs('access-' + newdate + '.log', {
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
