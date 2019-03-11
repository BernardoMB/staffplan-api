exports.addAccessType = function (req,res) {
	req.getConnection(function (err, connection) {
		var query = connection.query("INSERT INTO ACCESS_TYPE set ? ", req.body, function (err, rows) {
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
	                "message": 'Access type added successfully'
	            });
	        }
	    })
	})
}


exports.getAccessType = function(req,res){  
    var accessTypeID = req.params.accessTypeID;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM ACCESS_TYPE WHERE ID = ' + accessTypeID , function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            res.send({"error" : false, "status" : "success", "data" : rows});
        });
    });
}

exports.getAllAccessType = function(req,res){  
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM ACCESS_TYPE', function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            res.send({"error" : false, "status" : "success", "data" : rows});
        });
    });
}

exports.updateAccessType = function(req,res){  
    var accessTypeID = req.params.accessTypeID;
    req.getConnection(function (err, connection) {
        var query = connection.query("UPDATE ACCESS_TYPE set ? WHERE ID = ? ", [req.body, accessTypeID], function (err, rows) {
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
                    "message": "Access type updated successfully"
                });
            }
        })
    })
};

exports.deleteAccessType = function (req, res) {
    var accessTypeID = req.params.accessTypeID;
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");
        var query = conn.query("DELETE FROM ACCESS_TYPE  WHERE ID = ? ", [accessTypeID], function (err, rows) {
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
                    "message": "Access type deleted success"
                });
            }
        });
    });
}