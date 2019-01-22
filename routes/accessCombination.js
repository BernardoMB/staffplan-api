var async = require('async');
exports.addAccessCombination = function (req,res) {
	req.getConnection(function (err, connection) {
        var combinatinString  = String(req.body.COMBINATION);
        req.body.COMBINATION = "[" + combinatinString + "]";
		var query = connection.query("INSERT INTO ACCESS_TYPE_COMBINATION set ? ", req.body, function (err, rows) {
	        if (err) {
	            return res.send({
	                "error": true,
	                "status": "failed",
	                "message": "Please add all the values"
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


exports.getAccessCombination = function(req,res){  
    var combinationID = req.params.combinationID;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM ACCESS_TYPE_COMBINATION WHERE ID = ' + combinationID , function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            if(rows.length > 0){
                var conmbinationArray = rows[0].COMBINATION;
                conmbinationArray = conmbinationArray.replace('[','');
                conmbinationArray = conmbinationArray.replace(']','');
                var str_array = conmbinationArray.split(',');
                var query = connection.query('SELECT TYPE FROM ACCESS_TYPE WHERE ID IN (' + str_array + ')' , function (err, roleData) {            
                    if (err) {
                        return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
                    }
                    res.send({"error" : false, "status" : "success", "data" : roleData});
                });
            }
        });
    });
}


exports.updateAccessCombination = function(req,res){  
    var combinationID = req.params.combinationID;
    req.getConnection(function (err, connection) {
        var query = connection.query("UPDATE ACCESS_TYPE_COMBINATION set ? WHERE ID = ? ", [req.body, combinationID], function (err, rows) {
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
                    "message": "Access combination updated successfully"
                });
            }
        })
    })
};

exports.getAllAccessCombination = function(req,res){  
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM ACCESS_TYPE_COMBINATION', function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            if(rows.length > 0){
                async.waterfall([
                    function (callback) {
                        var combinationArray = {};
                        var tempIncrement = 0;
                        rows.forEach(element => {
                            var ab = element.COMBINATION;
                            ab = ab.replace('[','');
                            ab = ab.replace(']','');
                            var str_array = ab.split(',');
                            var query = connection.query('SELECT TYPE FROM ACCESS_TYPE WHERE ID IN (' + str_array + ')' , function (err, roleData) {            
                                if (err) {
                                    return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
                                }
                                tempIncrement++;
                                let tempArr = [];
                                roleData.forEach(element1 => {
                                    tempArr.push(element1.TYPE);
                                });
                                combinationArray[element.ID] = tempArr;
                                if(tempIncrement === rows.length){
                                    callback(null, combinationArray);
                                }
                            });
                        });
                    }
                ],function (err, result) {
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
                            "data": result
                        });
                    }
                })
            }
        });
    });
}

exports.deleteAccessCombination = function (req, res) {
    var combinationID = req.params.combinationID;
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");
        var query = conn.query("DELETE FROM ACCESS_TYPE_COMBINATION  WHERE ID = ? ", [combinationID], function (err, rows) {
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
                    "message": "Access combination deleted success"
                });
            }
        });
    });
}
