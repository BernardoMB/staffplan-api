exports.addRole = function (req,res) {
	req.getConnection(function (err, connection) {
		var query = connection.query("INSERT INTO ROLE set ? ", req.body, function (err, rows) {
	        if (err) {
	            return res.send({
	                "error": true,
	                "status": "failed",
	                "message": "Somthing went wrong"
	            });
	        } else {
	        	res.json(
	        	{ 
	        		"error": false,
	                "status": "success",
	                "message": 'Role added successfully'
	            });
	        }
	    })
	})
}


exports.getRole = function(req,res){  
    var roleID = req.params.roleID;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM ROLE INNER JOIN ACCESS_TYPE_COMBINATION ON ROLE.COMBINATION_ID = ACCESS_TYPE_COMBINATION.ID WHERE ROLE.ID = ' + roleID , function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            res.send({"error" : false, "status" : "success", "data" : rows});
        });
    });
}


exports.getAllRole = function(req,res){  
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM ROLE', function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            res.send({"error" : false, "status" : "success", "data" : rows});
        });
    });
}


exports.updateRole = function(req,res){  
    var roleID = req.params.roleID;
    req.getConnection(function (err, connection) {
        var query = connection.query("UPDATE ROLE set ? WHERE ID = ? ", [req.body, roleID], function (err, rows) {
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
                    "message": "Role updated successfully"
                });
            }
        })
    })
};

exports.deleteRole = function (req, res) {
    var roleID = req.params.roleID;
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");
        var query = conn.query("DELETE FROM ROLE  WHERE ID = ? ", [roleID], function (err, rows) {
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
                    "message": "Role deleted success"
                });
            }
        });
    });
}