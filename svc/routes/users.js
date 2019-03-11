var crypto = require('crypto');
var connectionModule = require('../connection');


exports.userLogin = function (req, res) {
	const cipher = crypto.createCipher('aes192', connectionModule.ENCRYPTION_KEY);  
	var encrypted = cipher.update(req.body.password, 'utf8', 'hex');  
	encrypted += cipher.final('hex');
   
    req.getConnection(function (err, connection) {
    	var query = connection.query("SELECT * FROM USERS INNER JOIN ROLE ON USERS.ROLE_ID = ROLE.ID WHERE EMAIL = '" + req.body.username + "' AND PASSWORD = '" + encrypted + "'", function (err, rows) {
            if (err) {
                return res.send("Something went wrong");
            }
            if(rows.length <= 0){
            	res.send({
                    "error": true,
                    "status": "Not found",
                    "message": "User not found"
                });
                return;
            } else {
                res.json({ "error": false,
                    "status": "success",
                    "data": rows[0]});
            }
        })
    })
}

exports.masterLogin = function (req,res) {
    var mastersConnection = connectionModule.masterConneection;
    var subsctiberDomainID = req.body.username;
    subsctiberDomainID = subsctiberDomainID.substring(subsctiberDomainID.indexOf('@')+1);
    req.getConnection(function (err, connectionMaster) {
        var query = mastersConnection.query("SELECT * FROM SUBSCRIBER WHERE DOMAIN_ID = '" + subsctiberDomainID + "'", function (err, rows) {
            if (err) {
                return res.send("Something went wrong");
            }
            if(rows.length <= 0){
            	 res.send({
                    "error": true,
                    "status": "Not found",
                    "message": "Domain is not registered"
                });
                return;
            } else {
                const cipher = crypto.createCipher('aes192', connectionModule.ENCRYPTION_KEY);  
                var encrypted = cipher.update(req.body.password, 'utf8', 'hex');  
                encrypted += cipher.final('hex');
                req.getConnection(function (err,connection) {
                    var query = connection.query("SELECT * FROM USERS INNER JOIN ROLE ON USERS.ROLE_ID = ROLE.ID WHERE EMAIL = '" + req.body.username + "' AND PASSWORD = '" + encrypted + "'", function (err, rows) {
                        if (err) {
                            return res.send("Something went wrong");
                        }
                        if(rows.length <= 0){
                             res.send({
                                "error": true,
                                "status": "Not found",
                                "message": "User not found"
                            });
                            return;
                        } else {
                            res.json({ "error": false,
                                "status": "success",
                                "data": rows[0]});
                        }
                    })
                })
            }
        })
    })
}

exports.addUser = function (req,res) {
	req.getConnection(function (err, connection) {
        var userPass = req.body.PASSWORD;
        const cipher = crypto.createCipher('aes192', connectionModule.ENCRYPTION_KEY);  
        var encrypted = cipher.update(userPass, 'utf8', 'hex');  
        encrypted += cipher.final('hex');
        req.body.PASSWORD = encrypted;
        var query = connection.query("INSERT INTO USERS set ? ", req.body, function (err, rows) {
	        if (err) {
	            return res.send({
	                "error": true,
	                "status": "failed",
	                "message": "Somthing went wrong"
	            });
	        } else {
                var query = connection.query("SELECT * FROM USERS WHERE ID = '" + rows.insertId + "'", function (err, userData) {
                    if (err) {
                        return res.send("Something went wrong");
                    } else {
                        res.json(
                        { 
                            "error": false,
                            "status": "success",
                            "data": userData[0]
                        });
                    }
                })
	        }
	    })
	})
}

exports.getUser = function(req,res){  
    var userID = req.params.userID;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM USERS INNER JOIN ROLE ON USERS.ROLE_ID = ROLE.ID WHERE USERS.ID = ' + userID , function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            res.send({"error" : false, "status" : "success", "data" : rows});
        });
    });
}


exports.updateUser = function(req,res){
    if(req.body.PASSWORD){
        var userPass = req.body.PASSWORD;
        const cipher = crypto.createCipher('aes192', connectionModule.ENCRYPTION_KEY);  
        var encrypted = cipher.update(userPass, 'utf8', 'hex');  
        encrypted += cipher.final('hex');
        req.body.PASSWORD = encrypted;
    }
    var userID = req.params.userID;
    req.getConnection(function (err, connection) {
        var query = connection.query("UPDATE USERS set ? WHERE ID = ? ", [req.body, userID], function (err, rows) {
            if (err) {
                return res.send({
                    "error": true,
                    "status": "failed",
                    "message": "Something went wrong"
                });
            } else {
                return res.send({
                    "error": false,
                    "status": "success",
                    "message": "User updated successfully"
                });
            }
        })
    })
};

exports.deleteUser = function (req, res) {
    var userID = req.params.userID;
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");
        var query = conn.query("DELETE FROM USERS  WHERE ID = ? ", [userID], function (err, rows) {
            if (err) {
                return res.send({
                    "error": true,
                    "status": "failed",
                    "message": "Something went wrong"
                });
            } else {
                res.send({
                    "error": false,
                    "status": "success",
                    "message": "User deleted success"
                });
            }
        });
    });
}