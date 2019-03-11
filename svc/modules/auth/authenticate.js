const db = require('../../common/connection');

module.exports = function (app) {
  app.post('/api/authenticate', function(req, res, next) {
    var subscriberDomainID = req.body.username;
    subscriberDomainID = subscriberDomainID.substring(subscriberDomainID.indexOf('@') + 1);
    db.masterDB(app, req, res, next).then((connection) => {
      const SQL = require('./query');
      console.log(SQL.auth(subscriberDomainID));
      db.excute(connection, SQL.auth(subscriberDomainID)).then((user) => {
        if (!user.length) {
          db.errorResponse(res, `Authentication failed. User not found`);
        } else {
          console.log(JSON.stringify(user));
          console.log('user found');
        }
      })
    });
  });
}