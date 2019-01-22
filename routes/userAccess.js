exports.addUserAccess = function (req,res) {
	req.getConnection(function (err, connection) {
		var query = connection.query("INSERT INTO USER_ACCESS set ? ", req.body, function (err, rows) {
	        if (err) {
	            return res.send({
	                "error": true,
	                "status": "failed",
	                "message": "Something went wrong"
	            });
	        } else {
	        	res.json(
	        	{ 
	        		"error": false,
	                "status": "success",
	                "message": 'User access added successfully'
	            });
	        }
	    })
	})
}

exports.bulkAddUserAccess = function(req,res){
    var data = req.body.data;
    var counter = 0;
    req.getConnection(function (err,connection){
        data.forEach(element => {
            counter++;
            var query = connection.query("INSERT INTO USER_ACCESS set ? ",element, function (err,rows){
                if(err){
                    return res.send({
                        "error" : true,
                        "status" : "failed",
                        "message" : "Something went wrong"
                    });
                }
                if(counter === data.length){
                    res.json({
                        "error" : false,
                        "status" : "success",
                        "message" : "User access added successfully"
                    })
                }
            })
        });    
    })
    
}

exports.getUserAccess = function(req,res){  
    var userAccessID = req.params.userAccessID;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM USER_ACCESS INNER JOIN USERS ON USER_ACCESS.USER_ID = USERS.ID WHERE USER_ACCESS.ID = ' + userAccessID , function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            res.send({"error" : false, "status" : "success", "data" : rows});
        });
    });
}


exports.updateUserAccess = function(req,res){  
    var userAccessID = req.params.userAccessID;
    req.getConnection(function (err, connection) {
        var query = connection.query("UPDATE USER_ACCESS set ? WHERE ID = ? ", [req.body, userAccessID], function (err, rows) {
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
                    "message": "User access updated successfully"
                });
            }
        })
    })
};

exports.deleteUserAccess = function (req, res) {
    var userAccessID = req.params.userAccessID;
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");
        var query = conn.query("DELETE FROM USER_ACCESS  WHERE ID = ? ", [userAccessID], function (err, rows) {
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
                    "message": "User access deleted success"
                });
            }
        });
    });
}