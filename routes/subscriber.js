var async = require('async');
exports.addSubscriber = function (req,res) {
	req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO SUBSCRIBER set ? ", req.body, function (err, rows) {
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
	                "message": 'Subscriber added successfully'
	            });
	        }
	    })
	})
}

exports.getSubscriber = function(req,res){  
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT SUBSCRIBER.*,SUBSCRIPTION.NAME AS SUBSCRIPTION_NAME FROM SUBSCRIBER INNER JOIN SUBSCRIPTION ON SUBSCRIBER.SUBSCRIPTION_ID = SUBSCRIPTION.ID', function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            res.send({"error" : false, "status" : "success", "data" : rows});
        });
    });
}

// TODO: Please fix the hardcoded demo_staffplan
exports.getTableList = function (req,res) {
    req.getConnection(function (err, connection) {
        var query = connection.query("SELECT table_name FROM information_schema.tables where table_schema= 'demo_staffplan'", function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            var counter = 0;
            var tableNameArray = [];
            rows.forEach(element => {
                counter++;
                tableNameArray.push(element.table_name);
                if(counter === rows.length){
                    res.send({"error" : false, "status" : "success", "data" : tableNameArray});
                }
            });
        });
    });
}

// TODO: Please fix the hardcoded demo_staffplan
exports.getFieldList = function (req,res) {
    var tableName = req.params.tableName;
    req.getConnection(function (err, connection) {
        var query = connection.query("SELECT column_name FROM information_schema.columns WHERE table_schema = 'demo_staffplan' AND table_name='" + tableName + "' ORDER BY ordinal_position", function (err, rows) {
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            var counter = 0;
            var fieldNameArray = [];
            rows.shift();
            rows.forEach(element => {
                counter++;
                if (element.column_name.indexOf('_ID') === -1)
                {
                    fieldNameArray.push(element.column_name);
                }
                
                if(counter === rows.length){
                    res.send({"error" : false, "status" : "success", "data" : fieldNameArray});
                }
            });
        });
    });
}

// TODO: Please fix the hardcoded demo_staffplan
exports.addCustomLabel = function(req,res){
    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO demo_staffplan.CUSTOM_LABEL set ? ", req.body, function (err, rows) {
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
	                "message": 'Custom Label added successfully'
	            });
	        }
	    })
	})
}