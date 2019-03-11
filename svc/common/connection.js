const errorResponse = (res, message = "Something went wrong") => {
  res.send({
    "error": true,
    "status": "failed",
    "message": message
  });
};

const hasError = (err, res, reject) => {
  if (err) {
    console.log(`Subscriber error`, err);
    errorResponse(res);
    reject(err);
    return true;
  }
  return false;
};

const getDB = (app, req, res, next) => {
  const db = app.get("DB");
  db(req, res, next);
  return db;
};

const getMasterConnection = (app, req, res, next) => {
  getDB(app, req, res, next);
  return new Promise((resolve, reject) => {
    req.getConnection((err, connection) => {
      if (!hasError(err, res, reject)) {
        resolve(connection);
      }
    })
  });
};

const getUserConnection = (app, req, res, next) => {
  getDB(app, req, res, next);
  return new Promise((resolve, reject) => {
    req.getConnection((err, connection) => {
      if (!hasError(err, res, reject)) {
        resolve(connection);
      }
    })
  });
};

const excute = (connection, sql, res) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (!hasError(err, res, reject)) {
        resolve(result);
      }
    })
  });
};

module.exports = {
  masterDB: getMasterConnection,
  userDB: getUserConnection,
  excute,
  errorResponse
}