const db = require('../../common/connection');
const util = require("../../common/util");
const config = require('../../common/config');
const SQL = require('./query');

const validateSubscription = async (domainID, req) => {
  console.log('validateSubscription');
  const connection = await db.masterDB(req);
  console.log('connection');
  const company = await db.execute(connection, SQL.auth(domainID));
  if (company && !company.length) {
    throw `Authentication failed. Subscription not found`;
  }
  console.log('called 1');
  return ({ connection, dbName: company[0].COMPANY_DB });
}

const fetchOffices = async (userId, connection, res) => {
  const offices = await db.execute(connection, SQL.office(userId));
  return offices;
}

const encryptPassword = (password) => {
  const crypto = require('crypto');
  const cipher = crypto.createCipher('aes192', config.AUTH.KEY);  
  var encPassword = cipher.update(password, 'utf8', 'hex');  
  encPassword += cipher.final('hex');
  return encPassword;
}

module.exports = (app) => {
  app.post('/api/authenticate', (req, res, next) => {
    const userName = req.body.username;
    const domainID = userName.substring(userName.indexOf('@') + 1);
    validateSubscription(domainID, req).then(({ connection, dbName }) => {
      console.log('dbName - ' + dbName);
      db.userDB(connection, dbName).then(() => {
        const encPassword = encryptPassword(req.body.password);
        db.execute(connection, SQL.validate(userName, encPassword)).then(user => {
          if (user && user.length) {
            const userId = user[0].ID;
            const tokenizer = require('./tokenization');
            const response = tokenizer.generateToken(userId, dbName);
            let userObj = {};
            userObj.user = user[0];
            userObj.token = response.token;
            fetchOffices(userId, connection, res).then(offices => {
              userObj.user.OFFICE_LIST = offices;
              util.successResponse(res, userObj);
            })
          } else {
            util.errorResponse(res, `Authentication failed`);
          }
        })
      })
    }).catch(exception => {
      util.errorResponse(res, exception);
    })
  })
}
