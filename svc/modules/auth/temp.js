req.getConnection(function (err, connectionMaster) {
  console.log("In getconnection");
  var query = mastersConnection.query("SELECT * FROM SUBSCRIBER INNER JOIN COMPANY ON COMPANY.COMPANY_ID = SUBSCRIBER.COMPANY_ID WHERE DOMAIN_ID = '" + subsctiberDomainID + "'", function (err, user) {
      if (err) {
          console.log(`Subscriber error`,err);
          return res.send({
              "error": true,
              "status": "failed",
              "message": "Somthing went wrong"
          });
      }
      
      if (!user.length) {
          console.log(`Subscriber.lengt = 0`);
          return res.send({
              "error": true,
              "status": "failed",
              "message": "Authentication failed. User not found."
          });
      } else {
          console.log("In first query else");
          const cipher = crypto.createCipher('aes192', newConnection.ENCRYPTION_KEY);  
          var encPassword = cipher.update(req.body.password, 'utf8', 'hex');  
          encPassword += cipher.final('hex');
          var UsersDB = "demo_"+user[0].COMPANY_NAME.toLowerCase(); //TODO: Please please fix this. Temporary edit this for Demo only
          req.getConnection(function (err, connection) {
              connection.query("SELECT "+ UsersDB +".USERS.* ,"+ UsersDB +".ROLE.ROLE_NAME,"+ UsersDB +".ROLE.COMBINATION_ID FROM "+ UsersDB +".USERS INNER JOIN "+ UsersDB +".ROLE ON "+ UsersDB +".USERS.ROLE_ID = "+ UsersDB +".ROLE.ID WHERE EMAIL = '" + req.body.username + "' AND PASSWORD = '" + encPassword + "'", function(err, usersData){
                  console.log("In second query");
                  if (err){
                      console.log(`User error`,err);
                      return res.send({
                          "error": true,
                          "status": "failed",
                          "message": "Somthing went wrong"
                      });
                  }
                  if (!usersData.length) {
                      console.log(`User.length = 0`);
                      return res.send({
                          "error": true,
                          "status": "failed",
                          "message": "Authentication failed. Username or password wrong."
                      });
                  } else {
                      console.log("In second query else");
                      var payload = {
                          ID: usersData[0].ID,
                          DB: UsersDB	
                      }
                      var token = jwt.sign(payload, app.get('superSecret'), {
                          expiresIn: newConnection.SUPERSECRETTIME
                      });

                      const refreshToken = jwt.sign(payload, app.get('superSecretRefresh'),
                      {
                          expiresIn: newConnection.SUPERSECRETREFRESHTIME
                      })
                      const response = {
                          "status": "Logged in",
                          "token": token,
                          "refreshToken": refreshToken,
                      }
                      
                      tokenList[token] = response;
                      let userObj = {};
                      userObj.user = usersData[0];
                      userObj.token = token;
                      res.cookie('auth',token);
                      var query = connection.query('SELECT '+ UsersDB +'.USER_ACCESS.OFFICE_ID,'+ UsersDB +'.OFFICE.OFFICE_NAME FROM '+ UsersDB +'.USER_ACCESS INNER JOIN '+ UsersDB +'.OFFICE ON '+ UsersDB +'.OFFICE.OFFICE_ID = '+ UsersDB +'.USER_ACCESS.OFFICE_ID WHERE '+ UsersDB +'.USER_ACCESS.USER_ID = ' + userObj.user.ID, function (err, userOfficeList) {
                          if(err){
                              return res.send({
                                  "error" : true,
                                  "status" : "office list failed",
                                  "message" : "Something went wrong in office list",
                                  "data" : userObj
                              });
                          } else {
                              var officeList = [];
                              userOfficeList.forEach(element => {
                                  officeList.push(element);
                              });
                              userObj.user.OFFICE_LIST = officeList;
                              return res.send({
                                  "error": false,
                                  "status": "success",
                                  "data": userObj
                              });        
                          }
                      })
                  }
              })
          })
      }
  })
});







// const errorResponse = (res, message = "Something went wrong") => {
//   res.send({
//     "error": true,
//     "status": "failed",
//     "message": message
//   });
// };

// const hasError = (err, res, reject) => {
//   if (err) {
//     console.log(`Subscriber error`, err);
//     errorResponse(res);
//     reject(err);
//     return true;
//   }
//   return false;
// };








const db = require('../../common/connection');
const util = require("../../common/util");
const config = require('../../common/config');
const SQL = require('./query');

const validateSubscription = (domainID, app, req, res, next) => {
  return new Promise((resolve, reject) => {
    db.masterDB(app, req, res, next).then((connection) => {
      db.execute(connection, SQL.auth(domainID)).then((company) => {
        if (company && !company.length) {
          reject(`Authentication failed. Subscription not found`);
        } else {
          resolve({ connection, dbName: company[0].COMPANY_DB });
        }
      }).catch(e => util.errorResponse(res, e, next));
    }).catch(e => util.errorResponse(res, e, next));
  })
}

const fetchOffices = (userId, connection, res, next) => {
  return new Promise((resolve, reject) => {
    db.execute(connection, SQL.office(userId)).then((offices) => {
      resolve(offices);
    }).catch(e => util.errorResponse(res, e, next));
  })
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
    // console.log('called 1');
    // util.successResponse(res, next, {})
    validateSubscription(domainID, app, req, res, next).then(({ connection, dbName }) => {
      // util.successResponse(res, next, {})
      // console.log('called 2');
        db.userDB(connection, dbName).then(() => {
        const encPassword = encryptPassword(req.body.password);
        db.execute(connection, SQL.validate(userName, encPassword)).then((user) => {
          // console.log('called 3');
          if (user && user.length) {
            const userId = user[0].ID;
            const tokenizer = require('./tokenization');
            const response = tokenizer.generateToken(userId, dbName);
            let userObj = {};
            userObj.user = user[0];
            userObj.token = response.token;
            // res.cookie('auth', response.token);
            fetchOffices(userId, connection, res).then((offices) => {
              userObj.user.OFFICE_LIST = offices;
              // console.log('called 4');
              util.successResponse(res, userObj);
              // console.log('called 5');
            }).catch(e => util.errorResponse(res, e));
          } else {
            util.errorResponse(res, 'Authentication failed', next);
          }
        }).catch(e => util.errorResponse(res, e, next));
      }).catch(e => util.errorResponse(res, e, next));
    }).catch(e => util.errorResponse(res, e, next));
  })
}
