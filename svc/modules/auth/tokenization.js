const config = require('../../common/config');

const authToken = {};

const generateToken = (userId, dbName) => {
  var jwt = require('jsonwebtoken');
  const payload = {
    ID: userId,
    DB: dbName	
  }
  var token = jwt.sign(payload, config.AUTH.KEY, {
    expiresIn: config.AUTH.SUPERSECRETTIME
  });
  const refreshToken = jwt.sign(payload, config.AUTH.KEY, {
      expiresIn: config.AUTH.SUPERSECRETREFRESHTIME
  });
  
  const response = { token, refreshToken };
  authToken[token] = response
  return (response);
}

module.exports = {
  generateToken,
  validateToken: () => {

  }
}