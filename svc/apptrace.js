// File used to set application log trace
const log = require('./common/logger');
module.exports = app => {
  app.use(function(req, res, next) {
    log.info(`START ${req.path}`);
    const startTime = Date.now();
    res.on('header', () => {
      log.info(`END ${req.path} ${(Date.now() - startTime) / 1000}Sec`);
    })
    next();
  });
};