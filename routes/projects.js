var MagicIncrement = require('magic-increment');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');
var connectionModule = require('../connection');

exports.addProject = function (req, res) {
    var data = {
        PROJECT_NAME: req.body.PROJECT_NAME,
        PROJECT_ROM: req.body.PROJECT_ROM,
        PROJECT_ADDRESS: req.body.PROJECT_ADDRESS,
        PROJECT_CITY: req.body.PROJECT_CITY,
        PROJECT_STATE: req.body.PROJECT_STATE,
        PROJECT_ZIP: req.body.PROJECT_ZIP,
        START_DATE: req.body.START_DATE,
        END_DATE: req.body.END_DATE,
        // ACT_START_DATE: req.body.ACT_START_DATE,
        // ACT_END_DATE: req.body.ACT_END_DATE,
        // PROJECT_DURATION: req.body.PROJECT_DURATION,
        PROJECT_STATUS_ID: req.body.PROJECT_STATUS,
        PROJECT_TYPE_ID: req.body.PROJECT_TYPE_ID,
        OFFICE_ID: req.body.OFFICE_ID,        
        PROJECT_DESCRIPTION: req.body.PROJECT_DESCRIPTION,
        CATEGORY_ID: req.body.CATEGORY_ID,
        TIMELINE_TYPE : req.body.TIMELINE_TYPE,
        GROUP_ID : req.body.GROUP_ID,
        PROJECT_NO : req.body.PROJECT_NO,
    };
    req.getConnection(function (err, connection) {
        var queryGetLastId = connection.query('SELECT PROJECT_ID FROM PROJECT ORDER BY PROJECT_ID DESC LIMIT 1;', function (err, rows) {
            if (err) {
                return res.send({
                    "error": true,
                    "status": "failed",
                    "message": "Something went wrong"
                });
            } else {
                var forIncrement = MagicIncrement.inc(rows[0].PROJECT_ID);
                data.PROJECT_ID = forIncrement;
                var query = connection.query("INSERT INTO PROJECT set ? ", data, function (err, rows) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Please add all the values"
                        });
                    } else {
                        if (req.body.CUSTOMER_ID) {
                            var dataSet = {};
                            dataSet.PROJECT_ID = data.PROJECT_ID;
                            dataSet.CUSTOMER_ID = req.body.CUSTOMER_ID
                            var queryCustomerEntry = connection.query("INSERT INTO CUSTOMER_PROJECTS set ? ", dataSet, function (err, rowsCustomerResponse) {
                                if (err) {
                                    return res.send({
                                        "error": true,
                                        "status": "failed",
                                        "message": "Project Added Success Something wrong in Customer record"
                                    });
                                } else {
                                    connection.query('SELECT * FROM PROJECT WHERE PROJECT_ID="' + data.PROJECT_ID + '"', function (err, Project_data) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "message": "Project added success",
                                            "data": Project_data
                                        });
                                    })
                                }
                            })
                        } else {
                            connection.query('SELECT * FROM PROJECT WHERE PROJECT_ID="' + data.PROJECT_ID + '"', function (err, Project_data) {
                                res.send({
                                    "error": false,
                                    "status": "success",
                                    "message": "Project added success",
                                    "data": Project_data
                                });
                            })
                        }
                    }
                });
            }
        });
    });
};

exports.getProjectInitiatedList = function(req,res){
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {

                if (err)
                    return next("Cannot Connect");
                var con = 'WHERE 1=1';

                if (req.body.PROJECT_NAME) {
                    var project_name = req.body.PROJECT_NAME;
                    con = con + ' AND PROJECT_NAME LIKE ' + "'%" + project_name + "%'";
                }
                if (req.body.PROJECT_ROM) {
                    var project_rom = req.body.PROJECT_ROM;
                    con = con + ' AND PROJECT_ROM LIKE ' + "'%" + project_rom + "%'";
                }

                if (req.body.PROJECT_ADDRESS) {
                    var project_address = req.body.PROJECT_ADDRESS;
                    con = con + ' AND PROJECT_ADDRESS LIKE ' + "'%" + project_address + "%'";
                }
                if (req.body.PROJECT_CITY) {
                    var project_city = req.body.PROJECT_CITY;
                    con = con + ' AND PROJECT_CITY LIKE ' + "'%" + project_city + "%'";
                }
                if (req.body.PROJECT_STATE) {
                    var project_state = req.body.PROJECT_STATE;
                    con = con + ' AND PROJECT_STATE LIKE ' + "'%" + project_state + "%'";
                }
                if (req.body.PROJECT_ZIP) {
                    var project_zip = req.body.PROJECT_ZIP;
                    con = con + ' AND PROJECT_ZIP LIKE ' + "'%" + project_zip + "%'";
                }
                if (req.body.ADVANCE_SEARCH) {
                    var advance_search = req.body.ADVANCE_SEARCH;

                    var Project_array_list = 0;
                    if (advance_search) {
                        var advance_search_temp = advance_search.split(" ", 1);
                        
                        var pmNameQuery = connection.query("SELECT PROJECT_PEOPLE.PROJECT_ID FROM `STAFF` INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE PREFERRED_NAME LIKE '%" + advance_search_temp + "%'", function (err, pmNamesArray) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }

                            if (pmNamesArray.length < 1) {
                                con = con + " AND (PROJECT_NAME LIKE '%" + advance_search + "%' OR PROJECT_ROM LIKE '%" + advance_search + "%' OR PROJECT_ADDRESS LIKE '%" + advance_search + "%' OR PROJECT_CITY LIKE '%" + advance_search + "%' OR PROJECT_STATE LIKE '%" + advance_search + "%' OR STATUS_NAME LIKE '%" + advance_search + "%' OR TYPE_NAME LIKE '%" + advance_search + "%' OR PROJECT_ZIP LIKE '%" + advance_search + "%')";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, CATEGORY.CATEGORY_NAME, PROJECT_GROUP.GROUP_ID,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT.GROUP_ID = PROJECT_GROUP.GROUP_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con + " AND PROJECT_STATUS_ID = 2", function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });

                            } else {
                                var tempPMname = [];
                                pmNamesArray.forEach(element => {
                                    tempPMname.push("\'" + element.PROJECT_ID + "\'");
                                });
                                con = con + " AND (PROJECT_ID IN (" + tempPMname + ") )";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, PROJECT_GROUP.GROUP_NAME,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT.GROUP_ID = PROJECT_GROUP.GROUP_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con + " AND PROJECT_STATUS_ID = 2", function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });
                            }
                        });
                    }
                } else {
                    connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, CATEGORY.CATEGORY_NAME, PROJECT_GROUP.GROUP_NAME,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT_GROUP. GROUP_ID = PROJECT.GROUP_ID LEFT JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con + " AND PROJECT_STATUS_ID = 2", function (err, rows) {
                        if (err) {
                            console.log(err);
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        //if user not found
                        if (rows.length < 1) {
                            res.send({
                                "error": false,
                                "status": "success",
                                "data": rows
                            });
                            return;
                        } else {
                            callback(null, rows);
                        }
                    });
                }
            },
            function (projectDataArg, callback) {
                var itemsProcessed = 0;
                var DataArray = [];
                projectDataArg.forEach(element => {
                    var PMNameArrayManager = [];
                    var PMNameArrayExecutive = [];
                    var GetEmpQuery = connection.query('SELECT CONCAT_WS(" ",  (CASE PREFERRED_NAME WHEN "" THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS Project_Manager,PROJECT_PEOPLE.PROJECT_ROLE_ID FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE  (PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "8") OR (PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "7")', function (err, ProData) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            itemsProcessed++;
                            ProData.forEach(PMName => {
                                if(PMName.PROJECT_ROLE_ID === 7){
                                    PMNameArrayExecutive.push(PMName.Project_Manager);
                                } else if(PMName.PROJECT_ROLE_ID === 8){
                                    PMNameArrayManager.push(PMName.Project_Manager);
                                }
                            })
                            element.PROJECT_MANAGER = PMNameArrayManager;
                            element.PROJECT_EXECUTIVE = PMNameArrayExecutive;
                            DataArray.push(element);
                            if (itemsProcessed === projectDataArg.length) {
                                callback(null, DataArray);
                            }
                        }
                    });
                });
            },

            function(projectList,callback){
                var proWithCustomer = [];
                var projectCounter = 0;
                projectList.forEach(element => {
                    var projectCustomer = connection.query('SELECT CUSTOMER_PROJECTS.CUSTOMER_ID,CUSTOMER.* FROM CUSTOMER_PROJECTS INNER JOIN CUSTOMER ON CUSTOMER_PROJECTS.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID WHERE PROJECT_ID = "'+ element.PROJECT_ID +'"', function (err, ProCustomerData) {
                        projectCounter++;
                        if(err){
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        var duration = dateToDays(element.START_DATE,element.END_DATE);
                        element.DURATION = duration;
                        if(ProCustomerData.length){
                            element.CUSTOMERS_DATA = ProCustomerData[0];
                            proWithCustomer.push(element);
                        } else {
                            element.CUSTOMERS_DATA = [];
                            proWithCustomer.push(element);
                        }
                        if(projectList.length === projectCounter){
                            callback(null,proWithCustomer)
                        }
                    })
                    
                });
            }
        ], function (err, result) {
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
        });
    });
}

exports.getProjectStartingList = function(req,res){
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {

                if (err)
                    return next("Cannot Connect");
                var con = 'WHERE 1=1';

                if (req.body.PROJECT_NAME) {
                    var project_name = req.body.PROJECT_NAME;
                    con = con + ' AND PROJECT_NAME LIKE ' + "'%" + project_name + "%'";
                }
                if (req.body.PROJECT_ROM) {
                    var project_rom = req.body.PROJECT_ROM;
                    con = con + ' AND PROJECT_ROM LIKE ' + "'%" + project_rom + "%'";
                }

                if (req.body.PROJECT_ADDRESS) {
                    var project_address = req.body.PROJECT_ADDRESS;
                    con = con + ' AND PROJECT_ADDRESS LIKE ' + "'%" + project_address + "%'";
                }
                if (req.body.PROJECT_CITY) {
                    var project_city = req.body.PROJECT_CITY;
                    con = con + ' AND PROJECT_CITY LIKE ' + "'%" + project_city + "%'";
                }
                if (req.body.PROJECT_STATE) {
                    var project_state = req.body.PROJECT_STATE;
                    con = con + ' AND PROJECT_STATE LIKE ' + "'%" + project_state + "%'";
                }
                if (req.body.PROJECT_ZIP) {
                    var project_zip = req.body.PROJECT_ZIP;
                    con = con + ' AND PROJECT_ZIP LIKE ' + "'%" + project_zip + "%'";
                }

                
                if (req.body.ADVANCE_SEARCH) {
                    var advance_search = req.body.ADVANCE_SEARCH;

                    var Project_array_list = 0;
                    if (advance_search) {
                        var advance_search_temp = advance_search.split(" ", 1);
                        
                        var pmNameQuery = connection.query("SELECT PROJECT_PEOPLE.PROJECT_ID FROM `STAFF` INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE PREFERRED_NAME LIKE '%" + advance_search_temp + "%'", function (err, pmNamesArray) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }

                            if (pmNamesArray.length < 1) {
                                con = con + " AND (PROJECT_NAME LIKE '%" + advance_search + "%' OR PROJECT_ROM LIKE '%" + advance_search + "%' OR PROJECT_ADDRESS LIKE '%" + advance_search + "%' OR PROJECT_CITY LIKE '%" + advance_search + "%' OR PROJECT_STATE LIKE '%" + advance_search + "%' OR STATUS_NAME LIKE '%" + advance_search + "%' OR TYPE_NAME LIKE '%" + advance_search + "%' OR PROJECT_ZIP LIKE '%" + advance_search + "%')";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, CATEGORY.CATEGORY_NAME, PROJECT_GROUP.GROUP_ID,OFFICE.OFFICE_NAME,OFFICE.OFFICE_CITY FROM PROJECT INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT.GROUP_ID = PROJECT_GROUP.GROUP_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con + " AND DATEDIFF(START_DATE, NOW()) > 0", function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });

                            } else {
                                var tempPMname = [];
                                pmNamesArray.forEach(element => {
                                    tempPMname.push("\'" + element.PROJECT_ID + "\'");
                                });
                                con = con + " AND (PROJECT_ID IN (" + tempPMname + ") )";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, PROJECT_GROUP.GROUP_NAME,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT.GROUP_ID = PROJECT_GROUP.GROUP_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con + " AND DATEDIFF(START_DATE, NOW()) > 0", function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });
                            }
                        });
                    }
                } else {
                    connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, CATEGORY.CATEGORY_NAME, PROJECT_GROUP.GROUP_NAME,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT_GROUP. GROUP_ID = PROJECT.GROUP_ID LEFT JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con + " AND DATEDIFF(START_DATE, NOW()) > 0", function (err, rows) {
                        if (err) {
                            console.log(err);
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        //if user not found
                        if (rows.length < 1) {
                            res.send({
                                "error": false,
                                "status": "success",
                                "data": rows
                            });
                            return;
                        } else {
                            callback(null, rows);
                        }
                    });
                }
            },
            function (projectDataArg, callback) {
                var itemsProcessed = 0;
                var DataArray = [];
                projectDataArg.forEach(element => {
                    var PMNameArrayManager = [];
                    var PMNameArrayExecutive = [];
                    var GetEmpQuery = connection.query('SELECT CONCAT_WS(" ",  (CASE PREFERRED_NAME WHEN "" THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS Project_Manager,PROJECT_PEOPLE.PROJECT_ROLE_ID FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE  (PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "8") OR (PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "7")', function (err, ProData) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            itemsProcessed++;
                            ProData.forEach(PMName => {
                                if(PMName.PROJECT_ROLE_ID === 7){
                                    PMNameArrayExecutive.push(PMName.Project_Manager);
                                } else if(PMName.PROJECT_ROLE_ID === 8){
                                    PMNameArrayManager.push(PMName.Project_Manager);
                                }
                            })
                            element.PROJECT_MANAGER = PMNameArrayManager;
                            element.PROJECT_EXECUTIVE = PMNameArrayExecutive;
                            DataArray.push(element);
                            if (itemsProcessed === projectDataArg.length) {
                                callback(null, DataArray);
                            }
                        }
                    });
                });
            },

            function(projectList,callback){
                var proWithCustomer = [];
                var projectCounter = 0;
                projectList.forEach(element => {
                    var projectCustomer = connection.query('SELECT CUSTOMER_PROJECTS.CUSTOMER_ID,CUSTOMER.* FROM CUSTOMER_PROJECTS INNER JOIN CUSTOMER ON CUSTOMER_PROJECTS.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID WHERE PROJECT_ID = "'+ element.PROJECT_ID +'"', function (err, ProCustomerData) {
                        projectCounter++;
                        if(err){
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        var duration = dateToDays(element.START_DATE,element.END_DATE);
                        element.DURATION = duration;
                        if(ProCustomerData.length){
                            element.CUSTOMERS_DATA = ProCustomerData[0];
                            proWithCustomer.push(element);
                        } else {
                            element.CUSTOMERS_DATA = [];
                            proWithCustomer.push(element);
                        }
                        if(projectList.length === projectCounter){
                            callback(null,proWithCustomer)
                        }
                    })
                    
                });
            }
        ], function (err, result) {
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
        });
    });
}

exports.getProjectEndingList = function(req,res){
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {

                if (err)
                    return next("Cannot Connect");
                var con = 'WHERE 1=1';

                if (req.body.PROJECT_NAME) {
                    var project_name = req.body.PROJECT_NAME;
                    con = con + ' AND PROJECT_NAME LIKE ' + "'%" + project_name + "%'";
                }
                if (req.body.PROJECT_ROM) {
                    var project_rom = req.body.PROJECT_ROM;
                    con = con + ' AND PROJECT_ROM LIKE ' + "'%" + project_rom + "%'";
                }

                if (req.body.PROJECT_ADDRESS) {
                    var project_address = req.body.PROJECT_ADDRESS;
                    con = con + ' AND PROJECT_ADDRESS LIKE ' + "'%" + project_address + "%'";
                }
                if (req.body.PROJECT_CITY) {
                    var project_city = req.body.PROJECT_CITY;
                    con = con + ' AND PROJECT_CITY LIKE ' + "'%" + project_city + "%'";
                }
                if (req.body.PROJECT_STATE) {
                    var project_state = req.body.PROJECT_STATE;
                    con = con + ' AND PROJECT_STATE LIKE ' + "'%" + project_state + "%'";
                }
                if (req.body.PROJECT_ZIP) {
                    var project_zip = req.body.PROJECT_ZIP;
                    con = con + ' AND PROJECT_ZIP LIKE ' + "'%" + project_zip + "%'";
                }

                
                if (req.body.ADVANCE_SEARCH) {
                    var advance_search = req.body.ADVANCE_SEARCH;

                    var Project_array_list = 0;
                    if (advance_search) {
                        var advance_search_temp = advance_search.split(" ", 1);
                        
                        var pmNameQuery = connection.query("SELECT PROJECT_PEOPLE.PROJECT_ID FROM `STAFF` INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE PREFERRED_NAME LIKE '%" + advance_search_temp + "%'", function (err, pmNamesArray) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }

                            if (pmNamesArray.length < 1) {
                                con = con + " AND (PROJECT_NAME LIKE '%" + advance_search + "%' OR PROJECT_ROM LIKE '%" + advance_search + "%' OR PROJECT_ADDRESS LIKE '%" + advance_search + "%' OR PROJECT_CITY LIKE '%" + advance_search + "%' OR PROJECT_STATE LIKE '%" + advance_search + "%' OR STATUS_NAME LIKE '%" + advance_search + "%' OR TYPE_NAME LIKE '%" + advance_search + "%' OR PROJECT_ZIP LIKE '%" + advance_search + "%')";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, CATEGORY.CATEGORY_NAME, PROJECT_GROUP.GROUP_ID,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT.GROUP_ID = PROJECT_GROUP.GROUP_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con + " AND DATEDIFF(END_DATE, NOW()) > 90", function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });

                            } else {
                                var tempPMname = [];
                                pmNamesArray.forEach(element => {
                                    tempPMname.push("\'" + element.PROJECT_ID + "\'");
                                });
                                con = con + " AND (PROJECT_ID IN (" + tempPMname + ") )";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, PROJECT_GROUP.GROUP_NAME,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT.GROUP_ID = PROJECT_GROUP.GROUP_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con + " AND DATEDIFF(END_DATE, NOW()) > 90", function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });
                            }
                        });
                    }
                } else {
                    connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, CATEGORY.CATEGORY_NAME, PROJECT_GROUP.GROUP_NAME,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT_GROUP. GROUP_ID = PROJECT.GROUP_ID LEFT JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con + " AND DATEDIFF(END_DATE, NOW()) > 90", function (err, rows) {
                        if (err) {
                            console.log(err);
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        //if user not found
                        if (rows.length < 1) {
                            res.send({
                                "error": false,
                                "status": "success",
                                "data": rows
                            });
                            return;
                        } else {
                            callback(null, rows);
                        }
                    });
                }
            },
            function (projectDataArg, callback) {
                var itemsProcessed = 0;
                var DataArray = [];
                projectDataArg.forEach(element => {
                    var PMNameArrayManager = [];
                    var PMNameArrayExecutive = [];
                    var GetEmpQuery = connection.query('SELECT CONCAT_WS(" ",  (CASE PREFERRED_NAME WHEN "" THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS Project_Manager,PROJECT_PEOPLE.PROJECT_ROLE_ID FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE  (PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "8") OR (PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "7")', function (err, ProData) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            itemsProcessed++;
                            ProData.forEach(PMName => {
                                if(PMName.PROJECT_ROLE_ID === 7){
                                    PMNameArrayExecutive.push(PMName.Project_Manager);
                                } else if(PMName.PROJECT_ROLE_ID === 8){
                                    PMNameArrayManager.push(PMName.Project_Manager);
                                }
                            })
                            element.PROJECT_MANAGER = PMNameArrayManager;
                            element.PROJECT_EXECUTIVE = PMNameArrayExecutive;
                            DataArray.push(element);
                            if (itemsProcessed === projectDataArg.length) {
                                callback(null, DataArray);
                            }
                        }
                    });
                });
            },

            function(projectList,callback){
                var proWithCustomer = [];
                var projectCounter = 0;
                projectList.forEach(element => {
                    var projectCustomer = connection.query('SELECT CUSTOMER_PROJECTS.CUSTOMER_ID,CUSTOMER.* FROM CUSTOMER_PROJECTS INNER JOIN CUSTOMER ON CUSTOMER_PROJECTS.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID WHERE PROJECT_ID = "'+ element.PROJECT_ID +'"', function (err, ProCustomerData) {
                        projectCounter++;
                        if(err){
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        var duration = dateToDays(element.START_DATE,element.END_DATE);
                        element.DURATION = duration;
                        if(ProCustomerData.length){
                            element.CUSTOMERS_DATA = ProCustomerData[0];
                            proWithCustomer.push(element);
                        } else {
                            element.CUSTOMERS_DATA = [];
                            proWithCustomer.push(element);
                        }
                        if(projectList.length === projectCounter){
                            callback(null,proWithCustomer)
                        }
                    })
                    
                });
            }
        ], function (err, result) {
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
        });
    });
}

exports.getProjectList = function (req, res) {
    //var staff_id = req.params.staff_id;
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {

                PROJECT_NAME = req.body.PROJECT_NAME;
                PROJECT_ROM = req.body.PROJECT_ROM;
                PROJECT_ADDRESS = req.body.PROJECT_ADDRESS;
                PROJECT_CITY = req.body.PROJECT_CITY;
                PROJECT_STATE = req.body.PROJECT_STATE;
                PROJECT_ZIP = req.body.PROJECT_ZIP;

                
                if (err)
                    return next("Cannot Connect");
                var con = 'WHERE 1=1';

                if (req.body.PROJECT_NAME) {
                    var project_name = req.body.PROJECT_NAME;
                    con = con + ' AND PROJECT_NAME LIKE ' + "'%" + project_name + "%'";
                }
                if (req.body.PROJECT_ROM) {
                    var project_rom = req.body.PROJECT_ROM;
                    con = con + ' AND PROJECT_ROM LIKE ' + "'%" + project_rom + "%'";
                }

                if (req.body.PROJECT_ADDRESS) {
                    var project_address = req.body.PROJECT_ADDRESS;
                    con = con + ' AND PROJECT_ADDRESS LIKE ' + "'%" + project_address + "%'";
                }
                if (req.body.PROJECT_CITY) {
                    var project_city = req.body.PROJECT_CITY;
                    con = con + ' AND PROJECT_CITY LIKE ' + "'%" + project_city + "%'";
                }
                if (req.body.PROJECT_STATE) {
                    var project_state = req.body.PROJECT_STATE;
                    con = con + ' AND PROJECT_STATE LIKE ' + "'%" + project_state + "%'";
                }
                if (req.body.PROJECT_ZIP) {
                    var project_zip = req.body.PROJECT_ZIP;
                    con = con + ' AND PROJECT_ZIP LIKE ' + "'%" + project_zip + "%'";
                }

                if (req.body.START_DATE) {
                    var startDate = req.body.START_DATE;
                    con = con + ' AND year(START_DATE) = ' + startDate;
                }

                if (req.body.END_DATE) {
                    var endDate = req.body.END_DATE;
                    con = con + ' AND year(END_DATE) = ' + endDate;
                }

                if(req.body.PROJECT){
                    if(req.body.PROJECT === 'START'){
                        con = con + " AND DATEDIFF(START_DATE, NOW()) > 0";
                    } else {
                        con = con + " AND DATEDIFF(END_DATE, NOW()) > 0";
                    }
                }

                if(req.body.PROJECT_STATUS_GET === 'INPROGRESS'){
                    con = con + " AND PROJECT_STATUS_ID = 3";
                }
                
                if(req.body.PROJECT_STATUS_GET === 'PROPOSAL'){
                    con = con + " AND PROJECT_STATUS_ID = 1";
                }

                if (req.body.ADVANCE_SEARCH) {
                    var advance_search = req.body.ADVANCE_SEARCH;

                    var Project_array_list = 0;
                    if (advance_search) {
                        var advance_search_temp = advance_search.split(" ", 1);
                        
                        var pmNameQuery = connection.query("SELECT PROJECT_PEOPLE.PROJECT_ID FROM `STAFF` INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE PREFERRED_NAME LIKE '%" + advance_search_temp + "%'", function (err, pmNamesArray) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }

                            if (pmNamesArray.length < 1) {
                                con = con + " AND (PROJECT_NAME LIKE '%" + advance_search + "%' OR PROJECT_ROM LIKE '%" + advance_search + "%' OR PROJECT_ADDRESS LIKE '%" + advance_search + "%' OR PROJECT_CITY LIKE '%" + advance_search + "%' OR PROJECT_STATE LIKE '%" + advance_search + "%' OR STATUS_NAME LIKE '%" + advance_search + "%' OR TYPE_NAME LIKE '%" + advance_search + "%' OR PROJECT_ZIP LIKE '%" + advance_search + "%')";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, CATEGORY.CATEGORY_NAME, PROJECT_GROUP.GROUP_ID,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT.GROUP_ID = PROJECT_GROUP.GROUP_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con, function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });

                            } else {
                                var tempPMname = [];
                                pmNamesArray.forEach(element => {
                                    tempPMname.push("\'" + element.PROJECT_ID + "\'");
                                });
                                con = con + " AND (PROJECT_ID IN (" + tempPMname + ") )";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, PROJECT_GROUP.GROUP_NAME,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT.GROUP_ID = PROJECT_GROUP.GROUP_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con, function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });
                            }
                        });
                    }
                } else {
                    connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE, CATEGORY.CATEGORY_NAME, PROJECT_GROUP.GROUP_NAME,OFFICE.OFFICE_NAME FROM PROJECT INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN PROJECT_GROUP ON PROJECT_GROUP. GROUP_ID = PROJECT.GROUP_ID LEFT JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID " + con, function (err, rows) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        //if user not found
                        if (rows.length < 1) {
                            res.send({
                                "error": false,
                                "status": "success",
                                "data": rows
                            });
                            return;
                        } else {
                            callback(null, rows);
                        }
                    });
                }
            },
            function (projectDataArg, callback) {
                var itemsProcessed = 0;
                var DataArray = [];
                projectDataArg.forEach(element => {
                    var PMNameArrayManager = [];
                    var PMNameArrayExecutive = [];
                    var GetEmpQuery = connection.query('SELECT CONCAT_WS(" ",  (CASE PREFERRED_NAME WHEN "" THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS Project_Manager,PROJECT_PEOPLE.PROJECT_ROLE_ID FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE  (PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "8") OR (PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "7")', function (err, ProData) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            itemsProcessed++;
                            ProData.forEach(PMName => {
                                if(PMName.PROJECT_ROLE_ID === 7){
                                    PMNameArrayExecutive.push(PMName.Project_Manager);
                                } else if(PMName.PROJECT_ROLE_ID === 8){
                                    PMNameArrayManager.push(PMName.Project_Manager);
                                }
                            })
                            element.PROJECT_MANAGER = PMNameArrayManager;
                            element.PROJECT_EXECUTIVE = PMNameArrayExecutive;
                            DataArray.push(element);
                            if (itemsProcessed === projectDataArg.length) {
                                callback(null, DataArray);
                            }
                        }
                    });
                });
            },
            // function (projectDataArg, callback) {
            //     var itemsProcessed = 0;
            //     var DataArray = [];
            //     // projectDataArg.forEach(element => {

            //     // })

            //     projectDataArg.forEach(element => {
            //         var PMNameArray = [];
            //         // Getting Project executive of project
            //         var GetEmpExcuQuery = connection.query('SELECT CONCAT_WS(" ",  (CASE PREFERRED_NAME WHEN "" THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS Project_Executive,PROJECT_PEOPLE.PROJECT_ROLE_ID FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE  PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "7"', function (err, ProExcuData) {
            //             if (err) {
            //                 return res.send({
            //                     "error": true,
            //                     "status": "failed",
            //                     "message": "Something went wrong"
            //                 });
            //             } else {
            //                 itemsProcessed++;
            //                 ProExcuData.forEach(PMName => {
            //                     PMNameArray.push(PMName.Project_Executive);
            //                 })
            //                 element.PROJECT_EXECUTIVE = PMNameArray;
            //                 DataArray.push(element);
            //                 if (itemsProcessed === projectDataArg.length) {
            //                     callback(null, DataArray);
            //                 }
            //             }
            //         });
            //     });
            // },
            // function(projectListArray, callback){
            //     var tempCondition = 0;
            //     var projectList = [];
            //     projectListArray.forEach(element => {
            //         tempCondition++;
            //         var duration = dateToDays(element.START_DATE,element.END_DATE);
            //         element.DURATION = duration;
            //         projectList.push(element);
            //         if (tempCondition === projectListArray.length) {
            //             callback(null, projectList);
            //         }
            //     });
            // },
            // function(ProPeoList, callback){
                
            //     var tempCondition = 0;
            //     var tempArray = [];
            //     var tempAssignment = '';
            //     ProPeoList.forEach(element => {
            //         tempCondition++;
            //         tempAssignment = calculateProjectAssignment(new Date(element.START_DATE),new Date(element.END_DATE));
            //         tempArray.push(element);
            //         if (tempCondition === ProPeoList.length) {
            //             callback(null, tempArray);
            //         }
            //     });
            // },
            function(projectList,callback){
                var proWithCustomer = [];
                var projectCounter = 0;
                projectList.forEach(element => {
                    var projectCustomer = connection.query('SELECT CUSTOMER_PROJECTS.CUSTOMER_ID,CUSTOMER.* FROM CUSTOMER_PROJECTS INNER JOIN CUSTOMER ON CUSTOMER_PROJECTS.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID WHERE PROJECT_ID = "'+ element.PROJECT_ID +'"', function (err, ProCustomerData) {
                        projectCounter++;
                        if(err){
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        var duration = dateToDays(element.START_DATE,element.END_DATE);
                        element.DURATION = duration;
                        if(ProCustomerData.length){
                            element.CUSTOMERS_DATA = ProCustomerData[0];
                            proWithCustomer.push(element);
                        } else {
                            element.CUSTOMERS_DATA = [];
                            proWithCustomer.push(element);
                        }
                        if(projectList.length === projectCounter){
                            callback(null,proWithCustomer)
                        }
                    })
                    
                });
            }
        ], function (err, result) {
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
        });
    });

}


exports.getProjectListTest = function (req, res) {

    //var staff_id = req.params.staff_id;
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {

                PROJECT_NAME = req.body.PROJECT_NAME;
                PROJECT_ROM = req.body.PROJECT_ROM;
                PROJECT_ADDRESS = req.body.PROJECT_ADDRESS;
                PROJECT_CITY = req.body.PROJECT_CITY;
                PROJECT_STATE = req.body.PROJECT_STATE;
                PROJECT_ZIP = req.body.PROJECT_ZIP;


                if (err)
                    return res.send({
                        "error": true,
                        "status": "failed",
                        "message": "Something went wrong"
                    });
                var con = 'WHERE 1=1 ';

                if (req.body.PROJECT_NAME) {
                    var project_name = req.body.PROJECT_NAME;
                    con = con + 'AND PROJECT_NAME LIKE ' + "'%" + project_name + "%'";
                }
                if (req.body.PROJECT_ROM) {
                    var project_rom = req.body.PROJECT_ROM;
                    con = con + ' AND PROJECT_ROM LIKE ' + "'%" + project_rom + "%'";
                }
                if (req.body.PROJECT_ADDRESS) {
                    var project_address = req.body.PROJECT_ADDRESS;
                    con = con + ' AND PROJECT_ADDRESS LIKE ' + "'%" + project_address + "%'";
                }
                if (req.body.PROJECT_CITY) {
                    var project_city = req.body.PROJECT_CITY;
                    con = con + ' AND PROJECT_CITY LIKE ' + "'%" + project_city + "%'";
                }
                if (req.body.PROJECT_STATE) {
                    var project_state = req.body.PROJECT_STATE;
                    con = con + ' AND PROJECT_STATE LIKE ' + "'%" + project_state + "%'";
                }
                if (req.body.PROJECT_ZIP) {
                    var project_zip = req.body.PROJECT_ZIP;
                    con = con + ' AND PROJECT_ZIP LIKE ' + "'%" + project_zip + "%'";
                }

                

                if (req.body.ADVANCE_SEARCH) {
                    var advance_search = req.body.ADVANCE_SEARCH;
                    var Project_array_list = 0;
                    if (advance_search) {
                        var advance_search_temp = advance_search.split(" ", 1);
                        var pmNameQuery = connection.query("SELECT PROJECT_PEOPLE.PROJECT_ID  FROM `STAFF` INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE PREFERRED_NAME LIKE '%" + advance_search_temp + "%'", function (err, pmNamesArray) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }

                            if (pmNamesArray.length < 1) {
                                con = con + " AND (PROJECT_NAME LIKE '%" + advance_search + "%' OR PROJECT_ROM LIKE '%" + advance_search + "%' OR PROJECT_ADDRESS LIKE '%" + advance_search + "%' OR PROJECT_CITY LIKE '%" + advance_search + "%' OR PROJECT_STATE LIKE '%" + advance_search + "%' OR STATUS_NAME LIKE '%" + advance_search + "%' OR TYPE_NAME LIKE '%" + advance_search + "%' OR PROJECT_ZIP LIKE '%" + advance_search + "%')";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE FROM PROJECT INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID " + con, function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });

                            } else {
                                var tempPMname = [];
                                pmNamesArray.forEach(element => {
                                    tempPMname.push("\'" + element.PROJECT_ID + "\'");
                                });

                                con = con + " AND (PROJECT_ID IN (" + tempPMname + ") )";
                                var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE FROM PROJECT INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID " + con, function (err, rows) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }

                                    //if user not found
                                    if (rows.length < 1) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    } else {
                                        callback(null, rows);
                                    }
                                });
                            }
                        });
                    }
                } else {
                    var query = connection.query("SELECT *, DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE FROM PROJECT INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID " + con, function (err, rows) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        //if user not found
                        if (rows.length < 1) {
                            res.send({
                                "error": false,
                                "status": "success",
                                "data": rows
                            });
                            return;
                        } else {
                            callback(null, rows);
                        }
                    });
                }
            },
            function (projectDataArg, callback) {
                var itemsProcessed = 0;
                var DataArray = [];
                projectDataArg.forEach(element => {
                    var PMNameArray = [];
                    var GetEmpQuery = connection.query('SELECT CONCAT_WS(" ",  (CASE PREFERRED_NAME WHEN "" THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS Project_Manager FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE  PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "8"', function (err, ProData) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            itemsProcessed++;
                            ProData.forEach(PMName => {
                                PMNameArray.push(PMName.Project_Manager);
                            })
                            element.PROJECT_MANAGER = PMNameArray;
                            DataArray.push(element);
                            if (itemsProcessed === projectDataArg.length) {
                                callback(null, DataArray);
                            }
                        }
                    });
                });
            }, function (projectData, callback) {
                var GetPlannedQuery = connection.query('SELECT PLANNED_PROJECT_PEOPLE.*,STAFF_ROLE.ROLE_NAME FROM `PLANNED_PROJECT_PEOPLE` INNER JOIN STAFF_ROLE ON PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID', function (err, plannedProData) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    } else {
                        var tempCondition = 0;
                        plannedProData.forEach(plannedTempData => {
                            
                            var GetPlannedQuery = connection.query('SELECT PROJECT.* ,DATE_FORMAT(START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(END_DATE, "%Y-%m-%d") AS END_DATE ,PROJECT_STATUS.STATUS_NAME, PROJECT_TYPE.TYPE_NAME, OFFICE.*, REGION.REGION_NAME FROM `PROJECT` INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN OFFICE ON PROJECT.OFFICE_ID = OFFICE.OFFICE_ID INNER JOIN REGION ON OFFICE.REGION_ID = REGION.REGION_ID WHERE PROJECT.PROJECT_ID = "' + plannedTempData.PROJECT_ID + '"', function (err, plannedProDataTemp) {
                                tempCondition++;
                                if (err) {
                                    return res.send({
                                        "error": true,
                                        "status": "failed",
                                        "message": "Something went wrong"
                                    });
                                } else {
                                    projectData.push(plannedProDataTemp[0]);
                                    if (tempCondition === plannedProData.length) {
                                        callback(null, projectData);                                    
                                    }
                                }

                            })
//                                
                        })

                    }
                });
            }
        ], function (err, result) {
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
        });
    });

}

exports.updateProject = function (req, res) {
    var project_id = req.params.id;
    var data = {
        PROJECT_NAME: req.body.PROJECT_NAME,
        PROJECT_ROM: req.body.PROJECT_ROM,
        PROJECT_ADDRESS: req.body.PROJECT_ADDRESS,
        PROJECT_CITY: req.body.PROJECT_CITY,
        PROJECT_STATE: req.body.PROJECT_STATE,
        PROJECT_ZIP: req.body.PROJECT_ZIP,
        START_DATE: req.body.START_DATE,
        END_DATE: req.body.END_DATE,
        PROJECT_DURATION: req.body.PROJECT_DURATION,
        PROJECT_STATUS_ID: req.body.PROJECT_STATUS,
        PROJECT_TYPE_ID: req.body.PROJECT_TYPE_ID,        
        OFFICE_ID: req.body.OFFICE_ID,
        PROJECT_DESCRIPTION: req.body.PROJECT_DESCRIPTION,
        CATEGORY_ID: req.body.CATEGORY_ID,
        TIMELINE_TYPE : req.body.TIMELINE_TYPE,
        GROUP_ID : req.body.GROUP_ID,
        PROJECT_NO : req.body.PROJECT_NO,
    };
    req.getConnection(function (err, connection) {
        if (err)
            return res.send("Cannot Connect");
        var query = connection.query("UPDATE PROJECT set ? WHERE PROJECT_ID = ? ", [data, project_id], function (err, rows) {
            if (err) {
                return res.send({
                    "error": true,
                    "status": "failed",
                    "message": "Something went wrong"
                });
            } else {
                if (req.body.CUSTOMER_ID) {

                    var getCustomerRecord = connection.query('SELECT * FROM `CUSTOMER_PROJECTS` WHERE PROJECT_ID = "' + project_id + '"',function(err,customerProjectData){
                        if(err){
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Project Added Success Something wrong in Customer record"
                            });
                        } else if (customerProjectData.length < 1) {
                            var dataSet = {};
                            dataSet.PROJECT_ID = project_id;
                            dataSet.CUSTOMER_ID = req.body.CUSTOMER_ID;
                            var queryCustomerEntry = connection.query("INSERT INTO CUSTOMER_PROJECTS set ? ", dataSet, function (err, rowsCustomerResponse) {
                                if (err) {
                                    return res.send({
                                        "error": true,
                                        "status": "failed",
                                        "message": "Project Update Success Something wrong in Customer record"
                                    });
                                } else {
                                    res.send({
                                        "error": "false",
                                        "status": "success",
                                        "message": "Project updated success",
                                        "PROJECT_ID": data.PROJECT_ID
                                    });
                                }
                            })
                        } else {
                            var tempObj = {};
                            tempObj.CUSTOMER_ID = req.body.CUSTOMER_ID;
                            var query_for_update = connection.query("UPDATE CUSTOMER_PROJECTS set ? WHERE PROJECT_ID = ? ", [tempObj, project_id], function (err, rows) {
                                if (err) {
                                    return res.send({
                                        "error": true,
                                        "status": "failed",
                                        "message": "Something went wrong"
                                    });
                                } else {
                                    res.send({
                                        "error": "false",
                                        "status": "success",
                                        "message": "Project updated success",
                                        "PROJECT_ID": data.PROJECT_ID
                                    });
                                }
                            });
                        }
                    })
                    
                } else {
                    res.send({
                        "error": "false",
                        "status": "success",
                        "message": "Project updated success",
                        "PROJECT_ID": data.PROJECT_ID
                    });
                }
            }
        });
    });
}

exports.searchProject = function (req, res) {
    req.getConnection(function (err, connection) {
        var search_string = req.params.projectsearch;
        var query = connection.query("SELECT * FROM PROJECT WHERE CONCAT(PROJECT_NAME,PROJECT_ROM,PROJECT_ADDRESS,PROJECT_CITY,PROJECT_STATE,PROJECT_ZIP,START_DATE,END_DATE,PROJECT_TYPE_ID) LIKE '%" + search_string + "%'", function (err, rows) {
            if (err) {
                return res.send("Something went wrong");
            }
            //if user not found
            if (rows.length < 1) {
                res.send({
                    "error": false,
                    "status": "not fount",
                    "message": "Project not found"
                });
                return;
            } else {
                res.send({
                    "error": false,
                    "status": "success",
                    "data": rows
                });
            }
        });
    });
}

exports.deleteProject = function (req, res) {
    var project_id = req.params.id;
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");
        var query = conn.query("DELETE FROM PROJECT  WHERE PROJECT_ID = ? ", [project_id], function (err, rows) {
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
                    "message": "Project deleted success"
                });
            }
        });
    });
}


exports.getProjectDetails = function (req, res) {
    var ProjectID = req.params.ProjectID;
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                var send_rows = {};
                var query = connection.query('SELECT PROJECT.* ,DATE_FORMAT(START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(END_DATE, "%Y-%m-%d") AS END_DATE ,PROJECT_STATUS.STATUS_NAME, PROJECT_TYPE.TYPE_NAME, OFFICE.*, REGION.REGION_NAME, CUSTOMER_PROJECTS.CUSTOMER_ID, CATEGORY.CATEGORY_NAME, PROJECT_GROUP.GROUP_NAME FROM `PROJECT` INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID LEFT JOIN OFFICE ON PROJECT.OFFICE_ID = OFFICE.OFFICE_ID LEFT JOIN REGION ON OFFICE.REGION_ID = REGION.REGION_ID LEFT JOIN CUSTOMER_PROJECTS ON PROJECT.PROJECT_ID = CUSTOMER_PROJECTS.PROJECT_ID LEFT JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID LEFT JOIN PROJECT_GROUP ON PROJECT.GROUP_ID = PROJECT_GROUP.GROUP_ID WHERE PROJECT.PROJECT_ID = "' + ProjectID + '"', function (err, rows) {
                    if (rows.length > 0) {

                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            callback(null, rows);
                        }

                    } else {
                        var query_customer = connection.query('SELECT PROJECT.* ,DATE_FORMAT(START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(END_DATE, "%Y-%m-%d") AS END_DATE ,PROJECT_STATUS.STATUS_NAME, PROJECT_TYPE.TYPE_NAME, OFFICE.*, REGION.REGION_NAME FROM `PROJECT` INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN OFFICE ON PROJECT.OFFICE_ID = OFFICE.OFFICE_ID INNER JOIN REGION ON OFFICE.REGION_ID = REGION.REGION_ID WHERE PROJECT.PROJECT_ID = "' + ProjectID + '"', function (err, rows_customer) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            } else {
                                callback(null, rows_customer);
                            }
                        });
                    }
                });
            },
            function (DataPro, callback) {
                var customerArray = [];
                var tempQuery = '';
                var itemsProcessed = 0;
                DataPro.forEach(element => {
                    if (element.CUSTOMER_ID) {
                        tempQuery = 'SELECT * FROM `CUSTOMER` WHERE CUSTOMER_ID = "' + element.CUSTOMER_ID + '"';
                        var customerQuery = connection.query(tempQuery, function (err, customerData) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            } else {
                                itemsProcessed++;
                                if (itemsProcessed === DataPro.length) {
                                    element.CUSTOMERS_DATA = customerData;
                                    callback(null, element);
                                }

                            }
                        });
                    } else {
                        itemsProcessed++;
                        if (itemsProcessed === DataPro.length) {
                            element.CUSTOMERS_DATA = {};
                            callback(null, element);
                        }
                    }

                });
            },
            function (ProjectData, callback) {
                var projectPeopleArray = [];
                var itemsProcessed = 0;
                var ProjectPeopleQuery = connection.query('SELECT PROJECT_PEOPLE.*,DATE_FORMAT(PROJECT_PEOPLE.START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(PROJECT_PEOPLE.END_DATE, "%Y-%m-%d") AS END_DATE, CONCAT (STAFF.FIRST_NAME,STAFF.MIDDLE_INITIAL,STAFF.LAST_NAME) AS STAFF_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME, STAFF.STAFF_PHOTO FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID WHERE PROJECT_ID = "' + ProjectData.PROJECT_ID + '"', function (err, ProjectPeopleData) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }

                    if (ProjectPeopleData.length <= 0) {
                        ProjectData.STAFF_DATA = projectPeopleArray;
                        callback(null, ProjectData);
                    } else {
                        var tempAssignment = '';
                        ProjectPeopleData.forEach(element => {
                            itemsProcessed++;
                            tempAssignment = calculateProjectAssignment(new Date(element.START_DATE),new Date(element.END_DATE));
                            element.STAFF_ASSIGNMENT = tempAssignment;
                            projectPeopleArray.push(element);
                            if (itemsProcessed === ProjectPeopleData.length) {
                                ProjectData.STAFF_DATA = projectPeopleArray;
                                callback(null, ProjectData);
                            }
                        });
                    }
                });
            },
            function (ProjectData, callback) {
                var projectPeopleArray = [];
                var itemsProcessed = 0;
                var ProjectPeopleQuery = connection.query('SELECT PLANNED_PROJECT_PEOPLE.*,DATE_FORMAT(PLANNED_PROJECT_PEOPLE.START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(PLANNED_PROJECT_PEOPLE.END_DATE, "%Y-%m-%d") AS END_DATE,STAFF_ROLE.ROLE_NAME FROM PLANNED_PROJECT_PEOPLE INNER JOIN STAFF_ROLE ON PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID  WHERE PROJECT_ID = "' + ProjectData.PROJECT_ID + '"', function (err, ProjectPeopleData) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }

                    if (ProjectPeopleData.length <= 0) {
//                        ProjectData.STAFF_DATA.push(projectPeopleArray);
                        callback(null, ProjectData);
                    } else {
                        ProjectPeopleData.forEach(element => {
                            itemsProcessed++;
                            
                            ProjectData.STAFF_DATA.push(element);
                            if (itemsProcessed === ProjectPeopleData.length) {
//                              ProjectData.STAFF_DATA1 = projectPeopleArray;
//                                ProjectData.STAFF_DATA.push(projectPeopleArray);
                                callback(null, ProjectData);
                            }
                        });
                    }
                });
            },
            function(projectListArray, callback){
                var tempCondition = 0;
                var projectList = [];                
                tempCondition++;
                var duration = dateToDays(projectListArray.START_DATE,projectListArray.END_DATE);
                projectListArray.DURATION = duration;
                callback(null, projectListArray);
            },
            function(ProPeoList, callback){
                var tempCondition = 0;
                var tempArray = [];
                var tempAssignment = '';
                    tempCondition++;
                    tempAssignment = calculateProjectAssignment(new Date(ProPeoList.START_DATE),new Date(ProPeoList.END_DATE));
                    ProPeoList.STAFF_ASSIGNMENT = tempAssignment;
                    ProPeoList.IMAGEPATH = req.headers.host + '/assets/images/user-images/';
                    callback(null, ProPeoList);
            },
            function(proData, callback){
                var GetEmpQuery = connection.query('SELECT CONCAT_WS(" ",  (CASE PREFERRED_NAME WHEN "" THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS Project_Executive FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE  PROJECT_PEOPLE.PROJECT_ID = "' + proData.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "7"', function (err, executiveName) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    } else {
                        if(executiveName.length > 0){
                            proData.PROJECT_EXECUTIVE = executiveName[0].Project_Executive;
                        } else {
                            proData.PROJECT_EXECUTIVE = '';
                        }
                        callback(null, proData);
                    }
                });
            },
            function(proData, callback){
                var GetEmpQuery = connection.query('SELECT CONCAT_WS(" ",  (CASE PREFERRED_NAME WHEN "" THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS Project_Manager FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE  PROJECT_PEOPLE.PROJECT_ID = "' + proData.PROJECT_ID + '" AND PROJECT_PEOPLE.PROJECT_ROLE_ID = "8"', function (err, projectManagerName) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    } else {
                        if(projectManagerName.length > 0){
                            proData.PROJECT_MANAGER = projectManagerName[0].Project_Manager;
                        } else {
                            proData.PROJECT_MANAGER = '';
                        }
                        callback(null, proData);
                    }
                });
            }
        ], function (err, result) {
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
        });
    });
}

exports.projectTypeheadSpace = function(req,res){
    return res.send({
        "error": true,
        "status": "failed",
        "message": "Space not allowed at as first character"
    });
}

exports.projectTypehead = function (req, res) {
    var search_string = req.params.projectTypehead;
    var PROJECT_STATUS_ARRAY = ['1','2','3']
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                var send_rows = {};
                var query = connection.query('SELECT * , DATE_FORMAT(START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(END_DATE, "%Y-%m-%d") AS END_DATE FROM PROJECT INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID WHERE PROJECT.PROJECT_STATUS_ID IN ('+ PROJECT_STATUS_ARRAY +')', function (err, rows) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    } else {
                        callback(null, rows);
                    }
                });
            },
            function (arg1, callback) {
                var itemsProcessed = 0;
                var DataArray = [];
                arg1.forEach(element => {
                    var PMNameArray = [];
                    var GetEmpQuery = connection.query('SELECT CONCAT_WS(" ",  (CASE PREFERRED_NAME WHEN "" THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS Project_Manager FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE PROJECT_PEOPLE.PROJECT_ROLE_ID = "8" AND PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '"', function (err, ProData) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            itemsProcessed++;
                            ProData.forEach(PMName => {
                                PMNameArray.push(PMName.Project_Manager);
                            })
                            element.PROJECT_MANAGER = PMNameArray;
                            DataArray.push(element);
                            if (itemsProcessed === arg1.length) {
                                callback(null, DataArray);
                            }
                        }
                    });
                });
            },
            function (finalData, callback) {
                var SearchArray = [];
                var itemsProcessed = 0;
                for (var i = finalData.length - 1; i >= 0; i--) {                    
                    if (finalData[i].PROJECT_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(finalData[i].PROJECT_NAME);
                    }
                    if (finalData[i].PROJECT_ROM == null ? false : finalData[i].PROJECT_ROM.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(finalData[i].PROJECT_ROM);
                    }

                    if (finalData[i].PROJECT_ADDRESS == null ? false : finalData[i].PROJECT_ADDRESS.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(finalData[i].PROJECT_ADDRESS);
                    }

                    if (finalData[i].PROJECT_CITY == null ? false : finalData[i].PROJECT_CITY.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(finalData[i].PROJECT_CITY);
                    }

                    if (finalData[i].PROJECT_STATE == null ? false : finalData[i].PROJECT_STATE.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(finalData[i].PROJECT_STATE);
                    }

                    if (finalData[i].STATUS_NAME == null ? false : finalData[i].STATUS_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(finalData[i].STATUS_NAME);
                    }
                    if (finalData[i].TYPE_NAME == null ? false : finalData[i].TYPE_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(finalData[i].TYPE_NAME);
                    }

                    if (finalData[i].PROJECT_ZIP == null ? false : finalData[i].PROJECT_ZIP.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(finalData[i].PROJECT_ZIP);
                    }

                    finalData[i].PROJECT_MANAGER.forEach(function (item) {
                        if (item.toLowerCase().includes(search_string.toLowerCase())) {
                            SearchArray.push(item);
                        }
                    })

                    itemsProcessed++;
                    if (itemsProcessed === finalData.length) {
                        data = {};
                        data.searchResult = SearchArray;
                        data.searchResult = _.uniqBy(data.searchResult, _.lowerCase);
                        callback(null, data);
                    }
                }
            }
        ], function (err, result) {
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
        });
    });
}

exports.onServerStart = function (req, res) {

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = year + '' + month + '' + day;

    fs.appendFile('./log/access-' + newdate + '.log', 'Server started', function (err) {
        if (err)
            throw err;
        res.send("Server started");
    });
}

exports.getProjectNameList = function (req,res){
    var ProjectCharacter = req.params.ProjectCharacter;
    var responseArray = [];
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");
            
            var query = conn.query('SELECT PROJECT_NAME FROM `PROJECT` WHERE PROJECT_NAME LIKE "%' + ProjectCharacter + '%"', function (err, ProjectNameList) {
            if (err) {
                return res.send({
                    "error": true,
                    "status": "failed",
                    "message": "Something went wrong"
                });
            } else {
                ProjectNameList.forEach(element => {
                    responseArray.push(element.PROJECT_NAME);
                });
                res.send({
                    "error": false,
                    "status": "success",
                    "data": responseArray
                });
            }
        });
    });
}

function dateToDays(startDate,endDate){
    var tempCurrentDate = new Date(startDate);
    var date2 = new Date(endDate);
    var timeDiff = Math.abs(date2.getTime() - tempCurrentDate);
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var totalYear = diffDays / 365;
    var yearReminder = diffDays % 365;
    var totalMonth = 0;
    var Duration = '';
    if(yearReminder >= 0){        
        totalMonth = yearReminder / 30;
        var monthReminder = diffDays % 30;
        if(Math.trunc(totalMonth) === 12){            
            totalMonth = 0;
            totalYear = 1;
        }
    } else {
        totalMonth = diffDays / 30;
        var monthReminder = diffDays % 30;
    }

    if(Math.trunc(totalYear) > 0){
        Duration += Math.trunc(totalYear) + ' Years ';
    }

    if(Math.trunc(totalMonth) > 0){
        Duration += Math.trunc(totalMonth) + ' Months ';
    }

    if(monthReminder > 0){
        Duration += monthReminder + ' Days ';
    }
    return Duration;
}

function calculateProjectAssignment(StartDate, EndDate){
    var TodayDate = new Date();
    var ProjectAssignment = '';
    if(TodayDate < StartDate){
        ProjectAssignment = 'Planned';
        return ProjectAssignment;
    }

    if(TodayDate >= StartDate && TodayDate <= EndDate){
        ProjectAssignment = 'Active';
        return ProjectAssignment;
    }

    if(TodayDate > EndDate){
        ProjectAssignment = 'Inactive';
        return ProjectAssignment;
    }
}

exports.getDashboardDetails = function (req,res){
    var DBName = connectionModule.SUBSCRIBERDB;
    var officeCity = req.params.officeCity;
    var additionalCondition = '';
    if(officeCity === 'all'){
        additionalCondition = '1 = 1';
    } else {
        additionalCondition = 'PROJECT.OFFICE_ID = "' + officeCity + '"';
    }
    req.getConnection(function (err, conn) {
        if (err)
            return res.send("Cannot Connect");

        async.parallel({
            InProgressProjectCount: function(callback) {
                conn.query('SELECT COUNT(PROJECT_ID) AS PROJECT_COUNT FROM '+ DBName +'.PROJECT WHERE PROJECT_STATUS_ID = 3 AND ' + additionalCondition, function (err, ProjectCount) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, ProjectCount[0].PROJECT_COUNT);
                    }
                })
            },
            ProposalProjectCount: function(callback) {
                conn.query('SELECT COUNT(PROJECT_ID) AS PROJECT_COUNT FROM '+ DBName +'.PROJECT WHERE PROJECT_STATUS_ID = 1 AND '  + additionalCondition, function (err, ProposalProjectCount) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, ProposalProjectCount[0].PROJECT_COUNT);
                    }
                })
            },
            UnassignedRoleCount: function(callback) {
                conn.query('SELECT COUNT(ID) AS PLANNED_ROLE_COUNT,PROJECT.PROJECT_ID FROM '+ DBName +'.PLANNED_PROJECT_PEOPLE LEFT JOIN PROJECT ON PLANNED_PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID WHERE '  + additionalCondition + ' GROUP BY PROJECT.PROJECT_ID', function (err, PlannedRoleCount) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        count = [];
                        PlannedRoleCount.forEach(element=>{
                            count.push(element.PLANNED_ROLE_COUNT);
                        });
                        sum = count.reduce((a,b) => a+b,0);
                        callback(null, sum);
                    }
                })
            },
            ProjectStartedThisYear: function(callback){
                var currentDate = new Date();
                var currentYear = currentDate.getFullYear();
                conn.query("SELECT COUNT(PROJECT_ID) AS PROJECT_STARTED FROM "+ DBName +".PROJECT WHERE year(START_DATE) = " + currentYear + " AND " + additionalCondition, function (err, ProjectStarted) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, ProjectStarted[0].PROJECT_STARTED);
                    }
                })
            },
            ProjectEndThisYear: function(callback){
                var currentDate = new Date();
                var currentYear = currentDate.getFullYear();
                conn.query("SELECT COUNT(PROJECT_ID) AS PROJECT_END FROM "+ DBName +".PROJECT WHERE year(END_DATE) = " + currentYear + " AND " + additionalCondition, function (err, ProjectEnd) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, ProjectEnd[0].PROJECT_END);
                    }
                })
            },
            ProjectStarting: function(callback){
                conn.query("SELECT COUNT(START_DATE) AS PROJECT_STARTING FROM "+ DBName +".PROJECT WHERE DATEDIFF("+ DBName +".PROJECT.START_DATE, NOW()) > 0 AND " + additionalCondition, function (err, StartInDate) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, StartInDate[0].PROJECT_STARTING);
                    }
                })
            },
            ProjectEnding: function(callback){
                conn.query("SELECT COUNT(END_DATE) AS PROJECT_END FROM "+ DBName +".PROJECT WHERE DATEDIFF("+ DBName +".PROJECT.END_DATE, NOW()) > 90 AND " + additionalCondition, function (err, EndInDate) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, EndInDate[0].PROJECT_END);
                    }
                })
            },
            AdminStaff: function(callback) {
                conn.query('SELECT COUNT(STAFF_ID) AS ADMIN_COUNT FROM '+ DBName +'.STAFF WHERE STAFF_GROUP_ID = 2 AND ' + additionalCondition, function (err, AdminCount) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, AdminCount[0].ADMIN_COUNT);
                    }
                })
            },
            OPSStaff: function(callback) {
                conn.query('SELECT COUNT(STAFF_ID) AS OPS_COUNT FROM '+ DBName +'.STAFF WHERE STAFF_GROUP_ID = 1 AND ' + additionalCondition, function (err, OPSCount) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, OPSCount[0].OPS_COUNT);
                    }
                })
            },
            OnBench: function(callback) {
                conn.query('SELECT COUNT(STAFF_ID) AS ON_BENCH_COUNT from '+ DBName +'.STAFF Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE WHERE START_DATE <= NOW() AND END_DATE >= NOW()) AND ' + additionalCondition, function (err, StaffIDList) {
                    if (err) {
                        callback(null, '0');
                    } else {                        
                        callback(null, StaffIDList[0].ON_BENCH_COUNT);
                    }
                })
            },
            StaffingGap: function(callback) {
                conn.query('SELECT PROJECT_PEOPLE.*,PROJECT.PROJECT_ID,PROJECT.OFFICE_ID FROM ' + DBName + '.PROJECT_PEOPLE INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID where STAFF_ID not in ( SELECT STAFF_ID FROM ' + DBName + '.PROJECT_PEOPLE WHERE START_DATE <= NOW() AND END_DATE >= NOW()) AND ' + additionalCondition, function (err, StaffingGap) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        var inactiveProjectPeople = JSON.parse(JSON.stringify(StaffingGap));
                        var responseCounter = 0;
                        inactiveProjectPeople.forEach(element => {
                            inactiveProjectPeople.forEach(subElement => {
                                if(element.STAFF_ID == subElement.STAFF_ID && formatDate(element.END_DATE) < formatDate(subElement.START_DATE)){
                                    var dayCounts = dayCount(element.END_DATE, subElement.START_DATE);
                                    if(dayCounts >= 30 ){
                                        responseCounter++;
                                    }
                                }
                            }); 
                        });
                        callback(null, responseCounter);
                    }
                })
            },
            OverUnderAllocation: function(callback) {
                conn.query('SELECT COUNT(ALLOCATION) AS ALLOCATION FROM ( SELECT SUM(ALLOCATION) AS ALLOCATION,STAFF_ID, PROJECT.PROJECT_ID FROM '+ DBName +'.PROJECT_PEOPLE INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID WHERE PROJECT_PEOPLE.START_DATE <= NOW() AND PROJECT_PEOPLE.END_DATE >= NOW()  AND ' + additionalCondition + '" GROUP BY STAFF_ID ) AS ALLOCATION_COUNT WHERE ALLOCATION < 100 OR ALLOCATION > 100', function (err, OUAllocation) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, OUAllocation[0].ALLOCATION);
                    }
                })
            },
            AssignmentEnding: function(callback) {
                var currentDate = new Date();
                var formatedDate = formatDate(currentDate);
                conn.query('SELECT COUNT(END_DATE) ASSIGNMENTENDING FROM '+ DBName +'.PROJECT_PEOPLE WHERE (START_DATE < "' + formatedDate + '" AND END_DATE > "'+ formatedDate +'") AND DATEDIFF(' + DBName + '.PROJECT_PEOPLE.END_DATE, NOW()) <= 90', function (err, assignmentEnding) {
                    if (err) {
                        callback(null, '0');
                    } else {
                        callback(null, assignmentEnding[0].ASSIGNMENTENDING);
                    }
                })
            }
        }, function(err, results) {
            res.send({
                "error": false,
                "status": "success",
                "data": results
            });
        });

        // var query = conn.query('SELECT COUNT(PROJECT_ID) AS PROJECT_COUNT FROM '+ DBName +'.PROJECT WHERE PROJECT_STATUS_ID = 4', function (err, ProjectCount) {
        //     if (err) {
        //         return res.send({
        //             "error": true,
        //             "status": "failed",
        //             "message": "Something went wrong"
        //         });
        //     } else {
        //         res.send({
        //             "error": false,
        //             "status": "success",
        //             "data": ProjectCount
        //         });
        //     }
        // });
    });
}

function dayCount(currentDate, startDate){
    var date1 = new Date(currentDate);
    var date2 = new Date(startDate);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}