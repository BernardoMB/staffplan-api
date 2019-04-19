
const hasError = err => (err ? true : false);

const getConnection = (req) => {
  return new Promise((resolve, reject) => (
    req.getConnection((err, connection) => {
      if (hasError(err)) {
        reject(err);
      } else {
        resolve(connection);
      }
    })
  ));
};

const getUserConnection = (connection, dbName) => {
  return new Promise((resolve, reject) => {
    connection.query(`use ${dbName}`, (err, result) => {
      if (hasError(err)) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const execute = (connection, sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (hasError(err)) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
};

module.exports = {
  connection: getConnection,
  userDB: getUserConnection,
  execute
}