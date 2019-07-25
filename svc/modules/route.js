module.exports = (app) => {
  require('./auth/')(app);
  require('./dashboard/')(app);
  require('./healthcheck/')(app);
  require('./master/')(app);
  require('./project/')(app);
  require('./staff/')(app);
  require('./customer/')(app);  
}