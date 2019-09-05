const error = require('./error');
const log = require('./logger');
const config = require('./config');
const CONST = require('./const');

module.exports = {
  errorResponse: (res, message = "Something went wrong", status = 500) => {
    log.error(message);
    res.status(status).json({ error: true, message });
  }, 
  successResponse: (res, data = {}) => {
    res.status(200).json(data);
  },
  failureResponse: (res, errorCode = error.EC_UNKNOWN) => {
    res.status(200).json({
      errorCode
    });
  },
  officeAccessRestricted: (role) => (role && role === 'REGIONAL'),
  isAdmin: (role) => (role && role === 'ADMIN'),
  getThumbnailUrl: (key) => (
    `https://${config.AWS.region}.amazonaws.com/${config.AWS.bucket}/${key}/${CONST.THUMBNAIL}.${CONST.IMGEXTN}`
  )
};
