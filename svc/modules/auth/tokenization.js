const config = require('../../common/config');

const authToken = {};

const generateToken = (userId, dbName) => {
  const jwt = require('jsonwebtoken');
  const payload = {
    ID: userId,
    DB: dbName	
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
        DB: decoded.DB
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
  refreshToken
}