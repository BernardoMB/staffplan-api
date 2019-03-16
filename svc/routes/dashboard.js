var MagicIncrement = require('magic-increment');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');


exports.projectInProgress = function (req,res){
    var DBName = req.payload.DB;
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");

        conn.query('SELECT * FROM '+ DBName +'.PROJECT WHERE PROJECT_STATUS_ID = 3', function (err, ProjectCount) {
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
                    "data": ProjectCount
                });
            }
        })
    })
};

exports.projectStartThisYear = function (req,res){
    var DBName = req.payload.DB;
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");

        conn.query("SELECT * FROM "+ DBName +".PROJECT WHERE year(START_DATE) = " + currentYear, function (err, ProjectStarted) {
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
                    "data": ProjectStarted
                });
            }
        })
    })
};

exports.projectEndThisYear = function (req,res){
    var DBName = req.payload.DB;
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");

        conn.query("SELECT * FROM "+ DBName +".PROJECT WHERE year(END_DATE) = " + currentYear, function (err, ProjectEnd) {
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
                    "data": ProjectEnd
                });
            }
        })
    })
};