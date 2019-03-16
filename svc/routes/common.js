var MagicIncrement = require('magic-increment');
var async = require('async');

exports.commonListing = function(req,res){  
    var modelName = req.params.modelName;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM ' + modelName , function (err, rows) {            
            if (err) {
                console.log(err);
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            res.send({"error" : false, "status" : "success", "data" : rows});
        });
    });
}

exports.getOfficeNameListing = function(req,res){
    req.getConnection(function (err, connection){
        var query = connection.query('SELECT OFFICE.*, REGION.REGION_NAME FROM OFFICE INNER JOIN REGION ON OFFICE.REGION_ID = REGION.REGION_ID', function(err, officeList){
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            } else {
                res.send({"error" : false, "status" : "success", "data" : officeList});
            }
        })
    })
}

exports.getCustomLabel = function(req,res){  
    var modelName = req.params.modelName;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM CUSTOM_LABEL' , function (err, rows) {            
            if (err) {
                return res.send({"error" : true, "status" : "failed", "message" : "Something went wrong"});
            }
            var responseObj = {};
            var counter = 0;
            rows.forEach(element => {
                var filedKey = element.FIELD_NAME;
                responseObj[filedKey] = element.CUSTOM_FIELD;
                counter ++;
                if(counter === rows.length){
                    res.send({"error" : false, "status" : "success", "data" : responseObj});
                }
            });
        });
    });
}