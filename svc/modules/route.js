module.exports = (app) => {
  require('./auth/')(app);
  require('./dashboard/')(app);
  require('./master/')(app);
}