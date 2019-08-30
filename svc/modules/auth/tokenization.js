const config = require('../../common/config');

const authToken = {};

const generateResetToken = (userName, resetId) => {
  const jwt = require('jsonwebtoken');
  const payload = {
    userName,
    resetId	
  }
  const token = jwt.sign(payload, config.AUTH.KEY, {
    expiresIn: config.RESET_EXPIRY_IN_HOUR * 60 * 60
  });
  return token
}

const parseResetToken = (token, callback) => {
  const jwt = require('jsonwebtoken');
  jwt.verify(token, config.AUTH.KEY, (err, decoded) => {
    let token = null;
    if (!err) {
      token = {
        userName: decoded.userName,
        resetId: decoded.resetId
      };
    }
    callback(token);
  });
}

const generateToken = (userId, role, dbName) => {
  const jwt = require('jsonwebtoken');
  const payload = {
    ID: userId,
    DB: dbName,
    ROLE: role
  }
  const token = jwt.sign(payload, config.AUTH.KEY, {
    expiresIn: config.AUTH.SUPERSECRETTIME
  });
  const refreshToken = jwt.sign(payload, config.AUTH.KEY, {
      expiresIn: config.AUTH.SUPERSECRETREFRESHTIME
  });
  const response = { token, refreshToken };
  authToken[token] = response
  return (response);
}

const refreshToken = async (token, req) => {
  const currentToken = authToken[token].refreshToken;
  const jwt = require('jsonwebtoken');
  jwt.verify(currentToken, config.AUTH.KEY, (err, decoded) => {
    if (err) {
      throw `Failed to authenticate token.`;
    } else {
      let payload = {
        ID: decoded.ID,
        DB: decoded.DB,
        ROLE: decoded.ROLE
      }
      const newRefreshToken = jwt.sign(payload, config.AUTH.KEY, { expiresIn: config.AUTH.SUPERSECRETREFRESHTIME })
      authToken[token].refreshToken = newRefreshToken;
      req.payload = payload;
      return null;
    }
  });
}

const validateToken = token => authToken[token] ? true : false;

module.exports = {
  generateToken,
  validateToken,
  refreshToken,
  generateResetToken,
  parseResetToken
}