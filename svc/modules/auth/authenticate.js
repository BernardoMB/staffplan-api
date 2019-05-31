const db = require('../../common/connection');
const util = require("../../common/util");
const config = require('../../common/config');
const SQL = require('./query');
const subscription = require('./subscription');

const fetchOffices = async (userId, connection) => {
  const offices = await db.execute(connection, SQL.office(userId));
  return offices;
}

const encryptPassword = (password) => {
  const crypto = require('crypto');
  const cipher = crypto.createCipher('aes192', config.AUTH.KEY);  
  let encPassword = cipher.update(password, 'utf8', 'hex');  
  encPassword += cipher.final('hex');
  return encPassword;
}

const getUserDetails = (user, connection, res, dbName) => {
  const userId = user.ID;
  const tokenizer = require('./tokenization');
  const response = tokenizer.generateToken(userId, dbName);
  let userObj = {};
  userObj.user = user;
  userObj.token = response.token;
  res.cookie('auth', response.token);
  fetchOffices(userId, connection, res).then(offices => {
    userObj.user.OFFICE_LIST = offices;
    util.successResponse(res, userObj);
  })
}

const isAuthenticated = async (req, res, next) => {
  /* uncomment below two lines if you want to debug service without new token */
  // req.payload = { ID: 50, DB: 'dev_company1' };
  // const connection = await db.connection(req);
  // await db.useDB(connection, req.payload.DB);
  // next();
  const token = req.headers.sessionid;
  const tokenizer = require('./tokenization');
  if (tokenizer.validateToken(token)) {
    await tokenizer.refreshToken(token, req);
    const connection = await db.connection(req);
    await db.useDB(connection, req.payload.DB);
    next();
  } else {
    util.errorResponse(res, `Failed to authenticate token`, 401);
  }
}

const validateUser = (req, res) => {
  const userName = req.body.username;
  const hostname = req.body.hostname;
  subscription.getCompanyDB(hostname, req).then(({ connection, dbName }) => {
    db.useDB(connection, dbName).then(() => {
      const encPassword = encryptPassword(req.body.password);
      db.execute(connection, SQL.validate(userName, encPassword)).then(user => {
        if (user && user.length) {
          getUserDetails(user[0], connection, res, dbName);
        } else {
          util.errorResponse(res, `Authentication failed`);
        }
      })
    })
  }).catch(exception => {
    util.errorResponse(res, exception);
  })
}

module.exports = {
  validateUser,
  isAuthenticated
}