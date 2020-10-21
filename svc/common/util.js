const error = require('./error');
const log = require('./logger');
const config = require('./config');
const CONST = require('./const');

const url = `https://s3.${config.AWS.region}.amazonaws.com/${config.AWS.bucket}`;

module.exports = {
  errorResponse: (res, message = "Something went wrong", status = 500) => {
    log.error(message);
    res.status(status).json({ error: true, message });
  },
  successResponse: (res, data = {}) => {
    res.status(200).json(data);
  },
  badRequest: (res, data) => {
    res.status(400).json(data)
  },
  failureResponse: (res, errorCode = error.EC_UNKNOWN) => {
    res.status(200).json({
      errorCode
    });
  },
  officeAccessRestricted: (role) => (role && role === 'OFFICE'),
  isAdmin: (role) => (role && role === 'ADMIN'),
  getThumbnailUrl: (key) => {
    console.log('S3 resource key', key);
    if (key && key.length > 3) {
      return `${url}/${key}/${CONST.THUMBNAIL}.${CONST.IMGEXTN}`;
    } else {
      return null;
    }
  },
  cleanObject: (obj) => {
    for (var propName in obj) {
      if (!obj[propName]) {
        delete obj[propName];
      }
    }
    return obj;
  },
  getHostPath: (url) => {
    const arr = url.split("/");
    const hostFullpath = arr[0] + "//" + arr[2];
    return hostFullpath;
  }
};
