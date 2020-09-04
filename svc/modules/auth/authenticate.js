const db = require('../../common/connection');
const util = require("../../common/util");
const config = require('../../common/config');
const error = require('../../common/error');
const log = require('../../common/logger');
const SQL = require('./query');
const subscription = require('./subscription');

// Used to fetch office details for given user
const fetchOffices = async (userId, role, connection) => {
  let offices;
  if (util.officeAccessRestricted(role)) {
    offices = await db.execute(connection, SQL.office(userId));
  } else {
    offices = await db.execute(connection, SQL.allOffice());
  }
  return offices;
}

// Get user preferences
const userPreferences = async (userId, connection) => {
  let preference = {};
  const result = await db.execute(connection, SQL.preference(userId));
  if (result && result.length > 0) {
    try {
      preference = JSON.parse(result[0].CONTENT);
    } catch (exception) {
      log.error(exception);
    }
  }
  return preference;
}

// Encrypt the given password string
const encryptPassword = (password) => {
  const crypto = require('crypto');
  const cipher = crypto.createCipher('aes192', config.AUTH.KEY);
  let encPassword = cipher.update(password, 'utf8', 'hex');
  encPassword += cipher.final('hex');
  return encPassword;
}

// Populate user, office details and send the response
const getUserDetails = (user, connection, res, dbName) => {
  const userId = user.USER_ID;
  const role = user.ROLE;
  const tokenizer = require('./tokenization');
  const response = tokenizer.generateToken(userId, role, dbName);
  let userObj = {};
  userObj.user = {
    USER_ID: user.USER_ID,
    ROLE_ID: user.ROLE_ID,
    FIRST_NAME: user.FIRST_NAME,
    MIDDLE_NAME: user.MIDDLE_NAME,
    LAST_NAME: user.LAST_NAME,
    EMAIL: user.EMAIL,
    ADDRESS: user.ADDRESS,
    CITY: user.CITY,
    COUNTRY: user.COUNTRY,
    ZIP: user.ZIP,
    ROLE: user.ROLE,
    ROLE_NAME: user.ROLE_NAME,
    PHOTO_URL: user.PHOTO_URL ? util.getThumbnailUrl(user.PHOTO_URL) : null
  };
  userObj.token = response.token;
  res.cookie('auth', response.token);
  fetchOffices(userId, role, connection, res).then(offices => {
    userObj.user.OFFICE_LIST = offices;
    userPreferences(userId, connection, res).then(preference => {
      userObj.user.preference = preference;
      util.successResponse(res, userObj);
    });
  })
}

// Validate the request is authenticated
const isAuthenticated = async (req, res, next) => {
  /* uncomment below two lines if you want to debug service without new token */
  // req.payload = { ID: 50, DB: 'staffplan', ROLE: 'ADMIN' };
  // const connection = await db.connection(req);
  // await db.useDB(connection, req.payload.DB);
  // next();
  try {
    const token = req.headers.sessionid;
    const tokenizer = require('./tokenization');
    if (tokenizer.validateToken(token)) {
      await tokenizer.refreshToken(token, req);
      const connection = await db.connection(req);
      await db.useDB(connection, req.payload.DB);
      next();
    } else {
      log.info('Authentication failed');
      util.errorResponse(res, `Failed to authenticate token`, 401);
    }
  } catch (exception) {
    log.error(exception);
    util.errorResponse(res, `Failed to authenticate token`, 401);
  }
};

// Validates user and password details
const validateUser = (req, res) => {
  const userName = req.body.username;
  const hostname = req.body.hostname;
  subscription.getCompanyDB(userName, hostname, req).then(({ connection, dbName }) => {
    console.log(dbName)
    db.useDB(connection, dbName).then(() => {
      const encPassword = encryptPassword(req.body.password);
      db.execute(connection, SQL.validate(userName, encPassword)).then(user => {
        if (user && user.length) {
          getUserDetails(user[0], connection, res, dbName);
        } else {
          log.info('Authentication Failed');
          util.errorResponse(res, `Authentication failed`, 401);
        }
      });
    });
  }).catch(exception => {
    log.error('Subscription service failed');
    util.errorResponse(res, exception);
  });
};

// used to reset the passoword
// Reset information will be send as email using notificaiton
const forgot = (req, res) => {
  const userName = req.body.username;
  const hostname = req.body.hostname;
  const url = req.body.url;
  subscription.getCompanyDB(userName, hostname, req).then(({ connection, dbName }) => {
    db.useDB(connection, dbName).then(() => {
      db.execute(connection, SQL.getuser(userName)).then(user => {
        if (user && user.length) {
          const uuidv4 = require('uuid/v4');
          const resetId = uuidv4();
          const userId = user[0].USER_ID;
          log.info(`${userName} requested password reset`);
          db.execute(connection, SQL.clearPasswordReset(userId)).then(() => {
            db.execute(connection, SQL.passwordReset(userId, resetId)).then(result => {
              if (result) {
                const tokenizer = require('./tokenization');
                const resetToken = tokenizer.generateResetToken(userName, resetId);
                log.debug(`Reset Token - ${resetToken}`);
                const notification = require('../notification');
                notification.passwordReset(userName, user[0].FIRST_NAME, resetToken, util.getHostPath(url));
                util.successResponse(res)
              } else {
                log.error('Password reset failed');
                util.failureResponse(res);
              }
            })
          })
        } else {
          util.failureResponse(res, error.EC_NO_EMAIL);
        }
      })
    })
  }).catch(exception => {
    log.error(exception);
    util.errorResponse(res, exception);
  })
}

// Used to validate teh reset token and it's expiry
const validateResetToken = (resetId, hostname, req, callback) => {
  const tokenizer = require('./tokenization');
  tokenizer.parseResetToken(resetId, token => {
    if (token) {
      const userName = token.userName;
      const resetId = token.resetId;
      subscription.getCompanyDB(userName, hostname, req).then(({ connection, dbName }) => {
        db.useDB(connection, dbName).then(() => {
          db.execute(connection, SQL.getuser(userName)).then(user => {
            if (user && user.length) {
              const userId = user[0].USER_ID;
              db.execute(connection, SQL.validateResetId(userId, resetId, config.RESET_EXPIRY_IN_HOUR)).then((result) => {
                if (result && result.length > 0) {
                  callback({ valid: true, connection, user: user[0] });
                } else {
                  callback({ valid: false, error: error.EC_EXPIRED });
                }
              })
            } else {
              callback({ valid: false, error: error.EC_NO_EMAIL });
            }
          });
        });
      });
    } else {
      callback({ valid: false, error: error.EC_NO_EMAIL });
    }
  });
}

// API to check reset token is valid
const reset = (req, res) => {
  try {
    const resetId = req.body.resetId;
    const hostname = req.body.hostname;
    validateResetToken(resetId, hostname, req, result => {
      if (result.valid) {
        util.successResponse(res);
      } else {
        log.info('Reset token validation failed');
        util.failureResponse(res, result.error);
      }
    })
  } catch (exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}

// API to change user password information
const changePassword = (req, res) => {
  try {
    const resetId = req.body.resetId;
    const hostname = req.body.hostname;
    validateResetToken(resetId, hostname, req, result => {
      if (result.valid) {
        const password = req.body.password;
        const connection = result.connection;
        const userId = result.user.USER_ID;
        //TODO: Validate the password strength
        db.execute(connection, SQL.updatePassword(userId, encryptPassword(password))).then(result => {
          if (result) {
            db.execute(connection, SQL.clearPasswordReset(userId)).then(() => {
              util.successResponse(res);
            })
          } else {
            util.failureResponse(res)
          }
        });
      } else {
        log.info('Reset token validation failed');
        util.failureResponse(res, result.error);
      }
    })
  } catch (exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}

module.exports = {
  validateUser,
  forgot,
  reset,
  changePassword,
  isAuthenticated
}
