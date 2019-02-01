var MagicIncrement = require('magic-increment');
var async = require('async');
var _ = require('lodash');
var connectionModule = require('../connection');

function sparkLinesChartYearCount() {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    const sparkLineYear = year - 3;
    return sparkLineYear;
}

exports.getProjectPeopleList = function (req, res) {
    let projectStatusID = ['1', '2', '3'];
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                var query = connection.query('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID WHERE PROJECT.PROJECT_STATUS_ID IN (' + projectStatusID + ')', function (err, rows) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }
                    callback(null, rows);
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
};

exports.getPlannedProjectFromID = function (req, res) {
    var PlannedProjectID = req.params.ProjectID;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM `PLANNED_PROJECT_PEOPLE` INNER JOIN STAFF_ROLE ON PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID WHERE PLANNED_PROJECT_PEOPLE.PROJECT_ID = "' + PlannedProjectID + '"', function (err, rows) {
            if (err) {
                return res.send({
                    "error": true,
                    "status": "failed",
                    "message": "Something went wrong"
                });
            }

            if (rows.length) {
                res.send({
                    "error": false,
                    "status": "success",
                    "data": rows
                });
            } else {
                res.send({
                    "error": false,
                    "status": "success",
                    "data": 'Planned project not found'
                });
            }
        })
    })
}

exports.addProjectPeople = function (req, res) {
    var data = {
        STAFF_ID: req.body.STAFF_ID,
        PROJECT_ID: req.body.PROJECT_ID,
        START_DATE: req.body.START_DATE,
        END_DATE: req.body.END_DATE,
        ALLOCATION: req.body.ALLOCATION,
        PROJECT_ROLE_ID: req.body.PROJECT_ROLE_ID,
        CONFIRMED: req.body.CONFIRMED,
        RESUME_SUBMITTED: req.body.RESUME_SUBMITTED || '0',
        //        ASSIGNMENT_DURATION: req.body.ASSIGNMENT_DURATION,

        //        NEXT_AVAILABLE: req.body.NEXT_AVAILABLE        
    };
    var tempQuery = '';
    req.getConnection(function (err, connection) {
        if (typeof req.body.STAFF_ID !== 'undefined' && typeof req.body.STAFF_ID !== null && req.body.STAFF_ID) {
            tempQuery = "INSERT INTO PROJECT_PEOPLE set ? ";
            var getQuery = "SELECT PROJECT_PEOPLE.*,CONCAT(STAFF.FIRST_NAME,STAFF.MIDDLE_INITIAL,STAFF.LAST_NAME) AS STAFF_NAME,STAFF_ROLE.ROLE_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID WHERE PROJECT_PEOPLE.STAFF_ID= '" + req.body.STAFF_ID + "' AND PROJECT_PEOPLE.PROJECT_ID = '" + req.body.PROJECT_ID + "'";
        } else {
            delete data.STAFF_ID;
            tempQuery = "INSERT INTO PLANNED_PROJECT_PEOPLE set ? "
        }
        var query = connection.query(tempQuery, data, function (err, rows) {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.send({
                        "error": true,
                        "status": "failed",
                        "message": "Project people already added"
                    });
                } else {
                    return res.send({
                        "error": true,
                        "status": "failed",
                        "message": "Please add all the fields"
                    });
                }
            } else {
                if (typeof req.body.STAFF_ID !== 'undefined' && req.body.STAFF_ID) {
                    connection.query(getQuery, function (err, getRecord) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            if (req.body.PLANNED_PROJECT_PEOPLE_ID) {
                                var query = connection.query("DELETE FROM PLANNED_PROJECT_PEOPLE  WHERE PLANNED_PROJECT_PEOPLE.ID = ? ", [req.body.PLANNED_PROJECT_PEOPLE_ID], function (err, rows) {
                                    if (err) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "message": "Project People added partilly",
                                            "data": getRecord[0]
                                        });
                                    } else {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "message": "Project People added success",
                                            "data": getRecord[0]
                                        });
                                    }
                                });
                            } else {
                                res.send({
                                    "error": false,
                                    "status": "success",
                                    "message": "Project People added success",
                                    "data": getRecord[0]
                                });
                            }
                        }
                    })
                } else {
                    connection.query("SELECT * FROM PLANNED_PROJECT_PEOPLE INNER JOIN STAFF_ROLE ON PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID WHERE ID='" + rows.insertId + "'", function (err, getRecord) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            if (req.body.PLANNED_PROJECT_PEOPLE_ID) {
                                var query = connection.query("DELETE FROM PLANNED_PROJECT_PEOPLE  WHERE PLANNED_PROJECT_PEOPLE.ID = ? ", [req.body.PLANNED_PROJECT_PEOPLE_ID], function (err, rows) {
                                    if (err) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "message": "Planned Project People added partilly",
                                            "data": getRecord[0]
                                        });
                                    } else {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "message": "Planned Project People added success",
                                            "data": getRecord[0]
                                        });
                                    }
                                })
                            } else {
                                res.send({
                                    "error": false,
                                    "status": "success",
                                    "message": "Project People added success",
                                    "data": getRecord[0]
                                });
                            }
                        }
                    })
                }
            }
        });
    });
};


exports.updateProjectPeople = function (req, res) {
    var emp_id = req.body.STAFF_ID;
    var pro_id = req.body.PROJECT_ID;
    var data = {
        START_DATE: req.body.START_DATE,
        END_DATE: req.body.END_DATE,
        ALLOCATION: req.body.ALLOCATION,
        PROJECT_ROLE_ID: req.body.PROJECT_ROLE_ID,
        ASSIGNMENT_DURATION: req.body.ASSIGNMENT_DURATION,
        CONFIRMED: req.body.CONFIRMED,
        NEXT_AVAILABLE: req.body.NEXT_AVAILABLE,
        RESUME_SUBMITTED: req.body.RESUME_SUBMITTED || '0',
    };
    req.getConnection(function (err, connection) {
        if (err)
            return res.send("Cannot Connect");

        if (req.body.STAFF_ID && !req.body.PLANNED_PROJECT_PEOPLE_ID) {
            var query_update = connection.query("UPDATE PROJECT_PEOPLE set ? WHERE PROJECT_PEOPLE.STAFF_ID = ? AND PROJECT_PEOPLE.PROJECT_ID = ? ", [data, emp_id, pro_id], function (err, rows_update) {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Project people already added"
                        });
                    } else {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Please add all the fields"
                        });
                    }
                } else {
                    res.send({
                        "error": false,
                        "status": "success",
                        "message": "Project People updated success"
                    });
                }
            });
        } else if (!req.body.STAFF_ID && req.body.PLANNED_PROJECT_PEOPLE_ID) {
            var query_update = connection.query("UPDATE PLANNED_PROJECT_PEOPLE set ? WHERE PLANNED_PROJECT_PEOPLE.ID = ? AND PLANNED_PROJECT_PEOPLE.PROJECT_ID = ? ", [data, req.body.PLANNED_PROJECT_PEOPLE_ID, pro_id], function (err, rows_update) {
                if (err) {
                    return res.send({
                        "error": true,
                        "status": "failed",
                        "message": "Please add all the fields"
                    });
                } else {
                    res.send({
                        "error": false,
                        "status": "success",
                        "message": "Planned Project People updated success"
                    });
                }
            });
        } else if (req.body.STAFF_ID && req.body.PLANNED_PROJECT_PEOPLE_ID) {
            data.STAFF_ID = req.body.STAFF_ID;
            data.PROJECT_ID = req.body.PROJECT_ID;
            delete data.RESUME_SUBMITTED;
            var tempQuery = "INSERT INTO PROJECT_PEOPLE set ? ";
            var query_inser = connection.query(tempQuery, data, function (err, rows) {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Project people already added"
                        });
                    } else {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }
                } else {
                    var query = connection.query("DELETE FROM PLANNED_PROJECT_PEOPLE  WHERE PLANNED_PROJECT_PEOPLE.ID = ? ", [req.body.PLANNED_PROJECT_PEOPLE_ID], function (err, rows) {
                        if (err) {
                            res.send({
                                "error": false,
                                "status": "success",
                                "message": "Project People updated partilly"
                            });
                        } else {
                            res.send({
                                "error": false,
                                "status": "success",
                                "message": "Project People updated success"
                            });
                        }
                    });
                }
            });
        }
    });
}


// exports.deleteProjectPeople = function (req, res) {
//     var emp_id = req.body.employee_id;
//     var pro_id = req.body.project_id;

//     req.getConnection(function (err, conn) {

//         if (err) return res.send("Cannot Connect");

//         var query = conn.query("DELETE FROM PROJECT_PEOPLE  WHERE PROJECT_PEOPLE.STAFF_ID = ? AND PROJECT_PEOPLE.PROJECT_ID = ? ", [emp_id, pro_id], function (err, rows) {

//             if (err) {
//                 return res.send({
//                     "error": true,
//                     "status": "failed",
//                     "message": "Something went wrong"
//                 });
//             } else {
//                 res.send({
//                     "error": false,
//                     "status": "success",
//                     "message": "Project People deleted success"
//                 });
//             }
//         });
//     });
// }

exports.getProjectPeople = function (req, res) {

    req.getConnection(function (err, connection) {
        var PP_Id = req.params.getProjectPeople;
        async.waterfall([
            function (callback) {
                var query = connection.query('SELECT * , DATE_FORMAT(START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(END_DATE, "%Y-%m-%d") AS END_DATE FROM PROJECT_PEOPLE WHERE PROJECT_ID = "' + PP_Id + '"', function (err, rows) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }
                    if (rows.length < 1) {
                        // return res.send({
                        //     "error": false,
                        //     "status": "not found",
                        //     "data": []
                        // });
                        callback(null, rows);
                    } else {
                        callback(null, rows);
                    }
                });
            },
            function (tempProjectData, callback) {
                var query = connection.query('SELECT * , DATE_FORMAT(START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(END_DATE, "%Y-%m-%d") AS END_DATE,STAFF_ROLE.ROLE_NAME AS ROLE FROM PLANNED_PROJECT_PEOPLE INNER JOIN STAFF_ROLE ON PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID WHERE PROJECT_ID = "' + PP_Id + '"', function (err, rows) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }
                    if (rows.length < 1 && tempProjectData.length < 1) {
                        return res.send({
                            "error": false,
                            "status": "not found",
                            "data": []
                        });
                    } else if (rows.length < 1) {
                        callback(null, tempProjectData);
                    } else {
                        var itemsProcessed = 0;
                        rows.forEach(element => {
                            itemsProcessed++;
                            // delete element.ROLE_NAME;
                            tempProjectData.push(element);
                            if (itemsProcessed === rows.length) {
                                callback(null, tempProjectData);
                            }
                        })
                    }
                });
            },
            function (arg1, callback) {
                var itemsProcessed = 0;
                var DataArray = [];
                arg1.forEach(element => {
                    var PMNameArray = [];
                    var GetEmpQuery = connection.query('SELECT CONCAT (FIRST_NAME,MIDDLE_INITIAL,LAST_NAME) AS Project_Manager,EMAIL_ID,STAFF_PHOTO, STAFF_ROLE.ROLE_NAME,STAFF_STATUS.STATUS_NAME FROM STAFF INNER JOIN STAFF_ROLE ON STAFF_ROLE.ROLE_ID = "' + element.PROJECT_ROLE_ID + '" INNER JOIN STAFF_STATUS ON STAFF_STATUS.STATUS_ID = STAFF.STAFF_STATUS_ID WHERE STAFF_ID = "' + element.STAFF_ID + '"', function (err, EmpData) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            itemsProcessed++;
                            EmpData.forEach(PMName => {
                                PMNameArray.push(PMName.Project_Manager);
                                PMNameArray.push(PMName.ROLE_NAME);
                                PMNameArray.push(PMName.EMAIL_ID);
                                PMNameArray.push(PMName.STAFF_PHOTO);
                                PMNameArray.push(PMName.STATUS_NAME);
                            })
                            element.STAFF_NAME = PMNameArray[0];
                            if (PMNameArray[1] !== undefined) {
                                element.ROLE = PMNameArray[1];
                            } else {
                                element.ROLE = element.ROLE_NAME;
                            }
                            element.EMAIL = PMNameArray[2];
                            element.STAFF_PHOTO = PMNameArray[3];
                            element.STATUS = PMNameArray[4];
                            DataArray.push(element);
                            if (itemsProcessed === arg1.length) {
                                callback(null, DataArray);
                            }
                        }
                    });
                });
            },
            function (ProPeoList, callback) {

                var tempCondition = 0;
                var tempArray = [];
                var tempAssignment = '';
                ProPeoList.forEach(element => {
                    tempCondition++;
                    if ('STAFF_ID' in element && 'STAFF_ID' != null) {
                        tempAssignment = calculateProjectAssignment(new Date(element.START_DATE), new Date(element.END_DATE));
                        element.STAFF_ASSIGNMENT = tempAssignment;
                    } else {
                        element.STAFF_ASSIGNMENT = null;
                    }
                    tempArray.push(element);
                    if (tempCondition === ProPeoList.length) {
                        callback(null, tempArray);
                    }

                });

            }
        ], function (err, result) {
            res.send({
                "error": false,
                "status": "success",
                "data": result
            });
        });
    });
}

function removeSparklineElements(instance) {
    delete instance.end_month;
    delete instance.start_month;
    delete instance.start_year;
    delete instance.end_year;
    delete instance.END_DATE;
    delete instance.START_DATE;
    delete instance.sDate;
    delete instance.eDate;
    return instance;
}

function computeAllocationForSparklines(tempElement, MonthCount, yearIndex) {
    if ((MonthCount + 1) === tempElement.end_month && yearIndex == tempElement.end_year) {
        if (tempElement.eDate <= 7) {
            tempElement.ALLOCATION = (tempElement.ALLOCATION * 25) / 100;
        } else if (tempElement.eDate >= 8 && tempElement.eDate <= 15) {
            tempElement.ALLOCATION = (tempElement.ALLOCATION * 50) / 100;
        } else if (tempElement.eDate >= 16 && tempElement.eDate <= 23) {
            tempElement.ALLOCATION = (tempElement.ALLOCATION * 75) / 100;
        } else {
            tempElement.ALLOCATION = tempElement.ALLOCATION;
        }
    } else if ((MonthCount + 1) === tempElement.start_month && yearIndex == tempElement.start_year) {
        if (tempElement.sDate >= 8 && tempElement.sDate <= 15) {
            tempElement.ALLOCATION = (tempElement.ALLOCATION * 75) / 100;
        } else if (tempElement.sDate >= 16 && tempElement.sDate <= 23) {
            tempElement.ALLOCATION = (tempElement.ALLOCATION * 50) / 100;
        } else if (tempElement.sDate >= 24) {
            tempElement.ALLOCATION = (tempElement.ALLOCATION * 25) / 100;
        } else {
            tempElement.ALLOCATION = tempElement.ALLOCATION;
        }
    } else {
        tempElement.ALLOCATION = tempElement.ALLOCATION;
    }
    return tempElement;
}

exports.getSparklines = function (req, res) {
    var currentTime = new Date();
    var StaffID = req.params.empId;
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                var query = connection.query('SELECT PROJECT_PEOPLE.PROJECT_ID,END_DATE,START_DATE,PROJECT.PROJECT_NAME,ALLOCATION,MONTH(START_DATE) AS start_month,MONTH(END_DATE) as end_month, YEAR(START_DATE) AS start_year,YEAR(END_DATE) AS end_year,DAY(START_DATE) AS sDate,DAY(END_DATE) AS eDate FROM PROJECT_PEOPLE INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID WHERE STAFF_ID = "' + StaffID + '"', function (err, sparklines) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    } else {
                        callback(null, sparklines);
                    }
                })
            },
            function (listofProject, callback) {
                var respsonseArray = {};
                var year = currentTime.getFullYear();
                var objYear = sparkLinesChartYearCount();

                for (let index = year; index > objYear; index--) {
                    var yearArray = [];
                    for (let MonthCount = 0; MonthCount < 12; MonthCount++) {
                        var projectListArray = [];
                        var total = 0;
                        listofProject.forEach(element => {
                            let tempElement = JSON.parse(JSON.stringify(element));
                            tempElement = computeAllocationForSparklines(tempElement, MonthCount, index);
                            if (tempElement.start_year === tempElement.end_year) {
                                if ((index === tempElement.start_year || index === tempElement.end_year) && ((MonthCount + 1) >= tempElement.start_month && (MonthCount + 1) <= tempElement.end_month)) {
                                    total += tempElement.ALLOCATION;
                                    tempElement = removeSparklineElements(tempElement);
                                    projectListArray.push(tempElement);
                                }
                            } else if (tempElement.end_year > tempElement.start_year) {
                                if (index === tempElement.start_year && (MonthCount + 1) >= tempElement.start_month) {
                                    total += tempElement.ALLOCATION;
                                    tempElement = removeSparklineElements(tempElement);
                                    projectListArray.push(tempElement);
                                } else if (index > tempElement.start_year && index < tempElement.end_year) {
                                    total += tempElement.ALLOCATION;
                                    tempElement = removeSparklineElements(tempElement);
                                    projectListArray.push(tempElement);
                                } else if (index === tempElement.end_year && (MonthCount + 1) <= tempElement.end_month) {
                                    total += tempElement.ALLOCATION;
                                    tempElement = removeSparklineElements(tempElement);
                                    projectListArray.push(tempElement);
                                }
                            }
                        });
                        var tempObj = {};
                        tempObj.projects = projectListArray;
                        if (total === 0) {
                            tempObj.total = 0;
                        } else {
                            tempObj.total = total;
                        }
                        yearArray[MonthCount] = tempObj;
                    }
                    respsonseArray[index] = yearArray;
                }
                callback(null, respsonseArray);
            }
        ], function (err, result) {
            res.send({
                "error": false,
                "status": "success",
                "data": result
            });
        });
    })
}

exports.getSparklinesForAllEmployees = function (req, res) {
    var currentTime = new Date();
    var StaffID = req.params.empId;
    req.getConnection(function (err, connection) {
        async.waterfall([
                function (callback) {
                    var query = connection.query('SELECT PROJECT_PEOPLE.STAFF_ID,PROJECT.END_DATE,PROJECT.START_DATE,PROJECT_PEOPLE.PROJECT_ID,PROJECT.PROJECT_NAME,ALLOCATION,MONTH(PROJECT.START_DATE) AS start_month,MONTH(PROJECT.END_DATE) as end_month, YEAR(PROJECT.START_DATE) AS start_year, YEAR(PROJECT.END_DATE) AS end_year, DAY(PROJECT.START_DATE) AS sDate,DAY(PROJECT.END_DATE) AS eDate  FROM PROJECT_PEOPLE INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID', function (err, sparklines) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            callback(null, sparklines);
                        }
                    })
                },
                function (listofProject, callback) {
                    var respsonseArray = {};
                    var year = currentTime.getFullYear();
                    var objYear = sparkLinesChartYearCount();
                    listofProject.forEach(mainElement => {
                        let employeeInstance = {};
                        for (let index = year; index > objYear; index--) {
                            var yearArray = [];
                            for (let MonthCount = 0; MonthCount < 12; MonthCount++) {
                                let dateObj = new Date(index, MonthCount, 1);
                                var projectListArray = [];
                                var total = 0;
                                listofProject.forEach(element => {
                                    let tempElement = JSON.parse(JSON.stringify(element));

                                    tempElement = computeAllocationForSparklines(tempElement, MonthCount, index);

                                    if (tempElement.start_year === tempElement.end_year) {
                                        if ((index === tempElement.start_year || index === tempElement.end_year) && ((MonthCount + 1) >= tempElement.start_month && (MonthCount + 1) <= tempElement.end_month) && (mainElement.STAFF_ID === element.STAFF_ID)) {
                                            total += tempElement.ALLOCATION;
                                            tempElement = removeSparklineElements(tempElement);
                                            projectListArray.push(tempElement);
                                        }
                                    } else if (tempElement.end_year > tempElement.start_year) {
                                        if (index === tempElement.start_year && (MonthCount + 1) >= tempElement.start_month && mainElement.STAFF_ID === element.STAFF_ID) {
                                            total += tempElement.ALLOCATION;
                                            tempElement = removeSparklineElements(tempElement);
                                            projectListArray.push(tempElement);
                                        } else if (index > tempElement.start_year && index < tempElement.end_year && mainElement.STAFF_ID === element.STAFF_ID) {
                                            total += tempElement.ALLOCATION;
                                            tempElement = removeSparklineElements(tempElement);
                                            projectListArray.push(tempElement);
                                        } else if (index === tempElement.end_year && (MonthCount + 1) <= tempElement.end_month && mainElement.STAFF_ID === element.STAFF_ID) {
                                            total += tempElement.ALLOCATION;
                                            tempElement = removeSparklineElements(tempElement);
                                            projectListArray.push(tempElement);
                                        }
                                    }
                                });
                                var tempObj = {};
                                tempObj.projects = projectListArray;
                                if (total === 0) {
                                    tempObj.total = 0;
                                } else {
                                    tempObj.total = total;
                                }
                                yearArray[MonthCount] = tempObj;
                            }
                            employeeInstance[index] = yearArray;
                        }
                        respsonseArray[mainElement.STAFF_ID] = employeeInstance;
                    });

                    callback(null, respsonseArray);
                }
            ],
            function (err, result) {
                res.send({
                    "error": false,
                    "status": "success",
                    "data": result
                });
            });
    })
}

exports.getProjectPeopleTypehead = function (req, res) {
    var search_string = req.params.getProjectPeopleTypehead;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID', function (err, rows) {
            if (err) {
                return res.send({
                    "error": true,
                    "status": "failed",
                    "message": "Something went wrong"
                });
            }
            var SearchArray = [];
            var itemsProcessed = 0;
            for (var i = rows.length - 1; i >= 0; i--) {
                if (rows[i].STAFF_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].STAFF_NAME);
                }

                if (rows[i].PROJECT_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].PROJECT_NAME);
                }

                if (rows[i].ROLE_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].ROLE_NAME);
                }

                if (rows[i].STATUS_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].STATUS_NAME);
                }

                itemsProcessed++;
                if (itemsProcessed === rows.length) {
                    data = {};
                    data.searchResult = SearchArray;
                    data.searchResult = _.uniqBy(data.searchResult, _.lowerCase);

                    res.send({
                        "error": false,
                        "status": "success",
                        "data": data
                    });
                }
            }
        });
    })
}

exports.getProjectPeoplesList = function (req, res) {
    var tempCurrentDate = new Date();
    const minDayDiff = 30;
    const midDaydiff = 60;
    const maxDaydiff = 90;
    req.getConnection(function (err, connection) {
        async.waterfall([
                function (callback) {
                    if (err)
                        return next("Cannot Connect");
                    var con = 'WHERE 1=1 ';
                    if (req.body.ADVANCE_SEARCH) {
                        var ADVANCE_SEARCH = req.body.ADVANCE_SEARCH;
                        //con = con + " AND (EMAIL_ID LIKE '%" + ADVANCE_SEARCH + "%' OR FIRST_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR MIDDLE_INITIAL LIKE '%" + ADVANCE_SEARCH + "%' OR LAST_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR PREFERRED_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR STATUS_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR ROLE_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR CATEGORY_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR OFFICE_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_1 LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_1_TYPE LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_2 LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_2_TYPE LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_CITY LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_STATE LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_ZIP LIKE '%" + ADVANCE_SEARCH + "%' )";
                        var strArray = ADVANCE_SEARCH.split(" ");
                        var stringArray = [];
                        for (var i = 0; i < strArray.length; i++) {
                            stringArray.push(strArray[i]);
                        }
                        var likeQuery = connection.query("SELECT PROJECT_PEOPLE.PROJECT_ID,PROJECT_PEOPLE.STAFF_ID  FROM `STAFF` INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE FIRST_NAME LIKE '%" + stringArray[0] + "%' AND MIDDLE_INITIAL LIKE '%" + stringArray[1] + "%' AND LAST_NAME LIKE '%" + stringArray[2] + "%' ", function (err, pmNamesArray) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }
                            if (pmNamesArray.length < 1) {
                                roleNameQuery = connection.query("SELECT ROLE_ID FROM `STAFF_ROLE` WHERE `ROLE_NAME` LIKE '%" + ADVANCE_SEARCH + "%'", function (err, roleNameArray) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }
                                    if (roleNameArray.length < 1) {
                                        proNameQuery = connection.query("SELECT PROJECT_ID FROM `PROJECT` WHERE `PROJECT_NAME` LIKE '%" + ADVANCE_SEARCH + "%'", function (err, proNameArray) {
                                            if (err) {
                                                return res.send({
                                                    "error": true,
                                                    "status": "failed",
                                                    "message": "Something went wrong"
                                                });
                                            }
                                            if (proNameArray < 1) {
                                                statusQuery = connection.query("SELECT STATUS_ID FROM `PROJECT_STATUS` WHERE `STATUS_NAME` LIKE '%" + ADVANCE_SEARCH + "%'", function (err, statusArray) {
                                                    if (err) {
                                                        return res.send({
                                                            "error": true,
                                                            "status": "failed",
                                                            "message": "Something went wrong"
                                                        });
                                                    }
                                                    if (statusArray < 1) {

                                                        res.send({
                                                            "error": false,
                                                            "status": "success",
                                                            "data": statusArray
                                                        });
                                                        return;
                                                    } else {
                                                        callback(null, statusArray, 'PROJECT_STATUS_ID');
                                                    }
                                                });

                                            } else {
                                                callback(null, proNameArray, 'PROJECT_ID');
                                            }
                                        })

                                    } else {
                                        callback(null, roleNameArray, 'PROJECT_ROLE_ID');
                                    }
                                });

                            } else {
                                callback(null, pmNamesArray, 'STAFF_ID');
                            }
                        });
                    } else {
                        let projectStatusID = ['1', '2', '3'];
                        var query = connection.query("SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, STAFF.STAFF_PHOTO, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID " + con + "AND PROJECT.PROJECT_STATUS_ID IN (" + projectStatusID + ")", function (err, rows) {
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
                                var tempCondition = 0;
                                var tempAssignment = '';
                                rows.forEach(element => {
                                    element.IMAGEPATH = req.headers.host + '/assets/images/user-images/';
                                    tempCondition++;
                                    var date2 = element.END_DATE;
                                    var timeDiff = Math.abs(date2.getTime() - tempCurrentDate);
                                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                    if (diffDays >= 0 && diffDays <= minDayDiff) {
                                        element.FUTURE_DAYS = "Available in 30 Days";
                                    } else if (diffDays > minDayDiff && diffDays <= midDaydiff) {
                                        element.FUTURE_DAYS = "Available in 30 to 60 Days";
                                    } else if (diffDays > midDaydiff && diffDays <= maxDaydiff) {
                                        element.FUTURE_DAYS = "Available in 60 to 90 Days";
                                    } else {
                                        element.FUTURE_DAYS = null;
                                    }
                                    tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                                    element.STAFF_ASSIGNMENT = tempAssignment;
                                    if (tempCondition === rows.length) {
                                        res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": rows
                                        });
                                        return;
                                    }
                                })
                            }
                        });
                    }
                },
                function (proIdList, fieldName, callback) {
                    var tempCondition;
                    var queryTemp;
                    if (fieldName === 'PROJECT_STATUS_ID') {
                        tempCondition = proIdList[0].STATUS_ID
                        queryTemp = "SELECT PROJECT_ID FROM PROJECT WHERE " + fieldName + " = '" + tempCondition + "'";
                    } else if (fieldName === 'PROJECT_ID') {
                        tempCondition = proIdList[0].PROJECT_ID;
                        queryTemp = "SELECT PROJECT_ID FROM PROJECT WHERE " + fieldName + " = '" + tempCondition + "'";
                    } else if (fieldName === 'PROJECT_ROLE_ID') {
                        tempCondition = proIdList[0].ROLE_ID;
                        queryTemp = "SELECT PROJECT_ID FROM `PROJECT_PEOPLE` WHERE PROJECT_ROLE_ID = '" + tempCondition + "'";
                    } else if (fieldName === 'STAFF_ID') {
                        tempCondition = proIdList[0].STAFF_ID;
                        queryTemp = "SELECT PROJECT_ID FROM `PROJECT_PEOPLE` WHERE " + fieldName + " = '" + tempCondition + "'";
                    }
                    var getResultQuery = connection.query(queryTemp, function (err, projectList) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        if (projectList < 1) {
                            res.send({
                                "error": false,
                                "status": "success",
                                "data": projectList
                            });
                        } else {
                            var proIdArray = [];
                            projectList.forEach(element => {
                                proIdArray.push("\'" + element.PROJECT_ID + "\'");
                            });
                            if (fieldName === 'PROJECT_ROLE_ID') {
                                callback(null, proIdArray, tempCondition, 'PROJECT_ROLE_ID');
                            } else if (fieldName === 'STAFF_ID') {
                                callback(null, proIdArray, tempCondition, 'STAFF_ID');
                            } else {
                                callback(null, proIdArray, tempCondition, 'Else');
                            }
                        }
                    })
                },
                function (proIdArray, tempCondition, condition, callback) {
                    var tQuery;
                    let projectStatusID = ['1', '2', '3'];
                    if (condition === 'PROJECT_ROLE_ID') {
                        tQuery = 'AND PROJECT_PEOPLE.PROJECT_ROLE_ID = ' + tempCondition;
                    } else if (condition === 'STAFF_ID') {
                        tQuery = 'AND PROJECT_PEOPLE.STAFF_ID = "' + tempCondition + '"';
                    } else {
                        tQuery = ' AND 1 = 1';
                    }
                    var query = connection.query('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID  WHERE PROJECT.PROJECT_STATUS_ID IN (' + projectStatusID + ') AND PROJECT_PEOPLE.PROJECT_ID IN (' + proIdArray + ')' + tQuery, function (err, rows) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        callback(null, rows);
                    });
                },
                function (rows, callback) {
                    var tempCondition = 0;
                    var tempAssignment = '';
                    rows.forEach(element => {
                        tempCondition++;
                        var date2 = element.END_DATE;
                        var timeDiff = Math.abs(date2.getTime() - tempCurrentDate);
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        if (diffDays >= 0 && diffDays <= minDayDiff) {
                            element.FUTURE_DAYS = "Available in 30 Days";
                        } else if (diffDays > minDayDiff && diffDays <= midDaydiff) {
                            element.FUTURE_DAYS = "Available in 30 to 60 Days";
                        } else if (diffDays > midDaydiff && diffDays <= maxDaydiff) {
                            element.FUTURE_DAYS = "Available in 60 to 90 Days";
                        } else {
                            element.FUTURE_DAYS = null;
                        }

                        tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                        element.STAFF_ASSIGNMENT = tempAssignment;

                        if (tempCondition === rows.length) {
                            callback(null, rows);
                        }
                    })
                }
            ],
            function (err, result) {
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
    });
}

// exports.bulkUpdateProjectPeople = function (req, res) {
//     req.getConnection(function (err, connection) {
//         var data = req.body.data;
//         if (err) return res.send("Cannot Connect");
//         var tempCondition = 0;
//         data.forEach(element => {
//             var emp_id = element.STAFF_ID;
//             var pro_id = element.PROJECT_ID;
//             updateData = {
//                 START_DATE: element.START_DATE,
//                 END_DATE: element.END_DATE,
//                 ALLOCATION: element.ALLOCATION,
//                 PROJECT_ROLE_ID: element.PROJECT_ROLE_ID,
//                 ASSIGNMENT_DURATION: element.ASSIGNMENT_DURATION,
//                 CONFIRMED: element.CONFIRMED,
//                 NEXT_AVAILABLE: element.NEXT_AVAILABLE
//             }
//             var query_update = connection.query("UPDATE PROJECT_PEOPLE set ? WHERE PROJECT_PEOPLE.STAFF_ID = ? AND PROJECT_PEOPLE.PROJECT_ID = ? ", [updateData, emp_id, pro_id], function (err, rows_update) {
//                 tempCondition++;
//                 if (err) {
//                     if (err.code == 'ER_DUP_ENTRY') {
//                         return res.send({
//                             "error": true,
//                             "status": "failed",
//                             "message": "Project people already added"
//                         });
//                     } else {
//                         return res.send({
//                             "error": true,
//                             "status": "failed",
//                             "message": "Please add all the fields"
//                         });
//                     }
//                 }
//                 if (tempCondition === data.length) {
//                     res.send({
//                         "error": false,
//                         "status": "success",
//                         "message": "Project People updated success"
//                     });
//                 }
//             });
//         });
//     });
// }

exports.bulkUpdateProjectPeople = function (req, res) {
    req.getConnection(function (err, connection) {
        var data = req.body.data;
        if (err)
            return res.send("Cannot Connect");
        var tempCondition = 0;
        data.forEach(element => {
            var emp_id = element.STAFF_ID;
            var pro_id = element.PROJECT_ID;
            updateData = {
                START_DATE: element.START_DATE,
                END_DATE: element.END_DATE,
                ALLOCATION: element.ALLOCATION,
                PROJECT_ROLE_ID: element.PROJECT_ROLE_ID,
                ASSIGNMENT_DURATION: element.ASSIGNMENT_DURATION,
                CONFIRMED: element.CONFIRMED,
                NEXT_AVAILABLE: element.NEXT_AVAILABLE,
                RESUME_SUBMITTED: element.RESUME_SUBMITTED || '0'
            }
            if (element.STAFF_ID && !element.PLANNED_PROJECT_PEOPLE_ID) {
                var query_update = connection.query("UPDATE PROJECT_PEOPLE set ? WHERE PROJECT_PEOPLE.STAFF_ID = ? AND PROJECT_PEOPLE.PROJECT_ID = ? ", [updateData, emp_id, pro_id], function (err, rows_update) {
                    tempCondition++;
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Project people already added"
                            });
                        } else {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Please add all the fields"
                            });
                        }
                    }
                    if (tempCondition === data.length) {
                        res.send({
                            "error": false,
                            "status": "success",
                            "message": "Project People updated success"
                        });
                    }
                });
            } else if (!element.STAFF_ID && element.PLANNED_PROJECT_PEOPLE_ID) {
                var query_update = connection.query("UPDATE PLANNED_PROJECT_PEOPLE set ? WHERE PLANNED_PROJECT_PEOPLE.ID = ? AND PLANNED_PROJECT_PEOPLE.PROJECT_ID = ? ", [updateData, element.PLANNED_PROJECT_PEOPLE_ID, pro_id], function (err, rows_update) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Please add all the fields"
                        });
                    } else {
                        res.send({
                            "error": false,
                            "status": "success",
                            "message": "Planned Project People updated success"
                        });
                    }
                });
            } else if (element.STAFF_ID && element.PLANNED_PROJECT_PEOPLE_ID) {
                var tempPlanId = element.PLANNED_PROJECT_PEOPLE_ID;
                delete element.PLANNED_PROJECT_PEOPLE_ID;
                var tempQuery = "INSERT INTO PROJECT_PEOPLE set ? ";
                var query_inser = connection.query(tempQuery, element, function (err, rows) {
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Project people already added"
                            });
                        } else {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                    } else {
                        var query_delete = connection.query("DELETE FROM PLANNED_PROJECT_PEOPLE  WHERE PLANNED_PROJECT_PEOPLE.ID = ? ", [tempPlanId], function (err, rows_delete) {
                            if (err) {
                                res.send({
                                    "error": false,
                                    "status": "success",
                                    "message": "Project People updated partilly"
                                });
                            } else {
                                res.send({
                                    "error": false,
                                    "status": "success",
                                    "message": "Project People updated success"
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}

exports.deleteProjectPeople = function (req, res) {
    var emp_id = req.body.STAFF_ID;
    var pro_id = req.body.PROJECT_ID;
    var project_status_id = req.body.PROJECT_STATUS_ID;
    var dateObj = new Date();
    var updateData = {};
    updateData.END_DATE = dateObj;
    req.getConnection(function (err, connection) {
        if (err)
            return res.send("Cannot Connect");

        async.waterfall([
            function (callback) {
                if (emp_id && project_status_id != 1) {
                    var query = connection.query("UPDATE PROJECT_PEOPLE set ? WHERE PROJECT_PEOPLE.STAFF_ID = ? AND PROJECT_PEOPLE.PROJECT_ID = ? ", [updateData, emp_id, pro_id], function (err, updatedData) {
                        if (err) {
                            callback(err, null)
                        } else {
                            callback(null, "Project People updated success");
                        }
                    })
                } else {

                    if (typeof req.body.PLANNED_EMPLOYEE_ID !== 'undefined' && req.body.PLANNED_EMPLOYEE_ID) {
                        var query = connection.query("DELETE FROM PLANNED_PROJECT_PEOPLE  WHERE PLANNED_PROJECT_PEOPLE.ID = ? ", [req.body.PLANNED_EMPLOYEE_ID], function (err, rows) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, "Planned Project People deleted success");
                            }
                        });
                    } else {
                        var query = connection.query("DELETE FROM PROJECT_PEOPLE  WHERE PROJECT_PEOPLE.STAFF_ID = ? AND PROJECT_PEOPLE.PROJECT_ID = ? ", [emp_id, pro_id], function (err, rows) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, "Project People deleted success");
                            }
                        });
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
        return;

    });
}

exports.bulkAddProjectPeople = function (req, res) {
    req.getConnection(function (err, connection) {
        var data = req.body.data;
        if (err)
            return res.send("Cannot Connect");
        var tempCondition = 0;
        var duplicateArray = [];
        var tempQuery = '';
        data.forEach(element => {

            var addData = {
                STAFF_ID: element.STAFF_ID,
                PROJECT_ID: element.PROJECT_ID,
                START_DATE: element.START_DATE,
                END_DATE: element.END_DATE,
                ALLOCATION: element.ALLOCATION,
                PROJECT_ROLE_ID: element.PROJECT_ROLE_ID,
                ASSIGNMENT_DURATION: element.ASSIGNMENT_DURATION,
                CONFIRMED: element.CONFIRMED,
                NEXT_AVAILABLE: element.NEXT_AVAILABLE,
                RESUME_SUBMITTED: element.RESUME_SUBMITTED || '0'
            };
            if (typeof element.STAFF_ID !== 'undefined' && typeof element.STAFF_ID !== null && element.STAFF_ID) {
                tempQuery = "INSERT INTO PROJECT_PEOPLE set ? ";
            } else {
                addData.RESUME_SUBMITTED = element.RESUME_SUBMITTED;
                delete addData.STAFF_ID;
                tempQuery = "INSERT INTO PLANNED_PROJECT_PEOPLE set ? "
            }

            var query = connection.query(tempQuery, addData, function (err, rows) {
                tempCondition++;
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        duplicateArray.push(element);
                    } else {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Please add all the fields"
                        });
                    }
                }

                if (tempCondition === data.length) {
                    if (duplicateArray.length > 0) {
                        var responseArray = [];
                        var counter = 0;
                        var lastCounter = 0;
                        var tempString = '';
                        var finalResponseArray = [];
                        duplicateArray.forEach(duplicateElement => {
                            var queryDuplicate = connection.query("SELECT CONCAT (STAFF.FIRST_NAME,STAFF.MIDDLE_INITIAL,STAFF.LAST_NAME) AS STAFF_NAME,PROJECT.PROJECT_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID INNER JOIN PROJECT ON PROJECT.PROJECT_ID = PROJECT_PEOPLE.PROJECT_ID WHERE PROJECT_PEOPLE.PROJECT_ID = '" + duplicateElement.PROJECT_ID + "' AND STAFF.STAFF_ID = '" + duplicateElement.STAFF_ID + "'", function (err, rowsDuplicate) {
                                counter++;
                                if (err) {
                                    return res.send({
                                        "error": true,
                                        "status": "failed",
                                        "message": "Something went wrong"
                                    });
                                } else {
                                    responseArray.push(rowsDuplicate);
                                    if (counter === duplicateArray.length) {
                                        responseArray.forEach(element => {
                                            lastCounter++;
                                            tempString = element[0].STAFF_NAME + ' is already assigned to ' + element[0].PROJECT_NAME + ' Project';
                                            finalResponseArray.push(tempString);
                                            if (lastCounter === responseArray.length) {
                                                res.send({
                                                    "error": true,
                                                    "status": "success",
                                                    "message": finalResponseArray + " "
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    } else {
                        res.send({
                            "error": false,
                            "status": "success",
                            "message": "Successfully add action is performed"
                        });
                    }
                }
            });
        });
    });
};


exports.bulkDeleteProjectPeople = function (req, res) {

    req.getConnection(function (err, connection) {
        var data = req.body.data;
        var dateObj = new Date();
        var updateData = {};
        updateData.END_DATE = dateObj;
        if (err)
            return res.send("Cannot Connect");
        var tempCondition = 0;
        var tempQuery = '';
        data.forEach(element => {
            tempCondition++;
            if (element.PROJECT_STATUS_ID != 1 && !element.PLANNED_EMPLOYEE_ID) {

                var query = connection.query("UPDATE PROJECT_PEOPLE set ? WHERE PROJECT_PEOPLE.STAFF_ID = ? AND PROJECT_PEOPLE.PROJECT_ID = ? ", [updateData, element.STAFF_ID, element.PROJECT_ID], function (err, updatedData) {

                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }
                    if (tempCondition === data.length) {
                        res.send({
                            "error": false,
                            "status": "success",
                            "message": "Project People Update success"
                        });
                    }
                })
            } else {
                if (typeof element.PLANNED_EMPLOYEE_ID !== 'undefined' && element.PLANNED_EMPLOYEE_ID) {
                    if (element.PROJECT_STATUS_ID != 1) {
                        var queryUpdate = connection.query("UPDATE PLANNED_PROJECT_PEOPLE set ? WHERE PLANNED_PROJECT_PEOPLE.ID = ? ", [updateData, element.PLANNED_EMPLOYEE_ID], function (err, queryUpdateData) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }

                            if (tempCondition === data.length) {
                                res.send({
                                    "error": false,
                                    "status": "success",
                                    "message": "Planned Project People Update success"
                                });
                            }

                        });
                    } else {
                        tempQuery = "DELETE FROM PLANNED_PROJECT_PEOPLE  WHERE PLANNED_PROJECT_PEOPLE.ID = " + element.PLANNED_EMPLOYEE_ID;
                    }
                } else {
                    tempQuery = "DELETE FROM PROJECT_PEOPLE  WHERE PROJECT_PEOPLE.STAFF_ID = '" + element.STAFF_ID + "' AND PROJECT_PEOPLE.PROJECT_ID = '" + element.PROJECT_ID + "'";
                }

                var query = connection.query(tempQuery, function (err, rows) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }
                    if (tempCondition === data.length) {
                        res.send({
                            "error": false,
                            "status": "success",
                            "message": "Project People Deleted success"
                        });
                    }
                });
            }
        })
    });
}
exports.getPlannedProjectPeople = function (req, res) {
    var search_string = req.params.search_string;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT PLANNED_PROJECT_PEOPLE.*, PROJECT.PROJECT_NAME, STAFF_ROLE.ROLE_NAME, PROJECT.PROJECT_STATUS_ID, PROJECT_STATUS.STATUS_NAME FROM PLANNED_PROJECT_PEOPLE INNER JOIN PROJECT ON PROJECT.PROJECT_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ID INNER JOIN STAFF_ROLE ON STAFF_ROLE.ROLE_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT_STATUS.STATUS_ID = PROJECT.PROJECT_STATUS_ID', function (err, officeList) {
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
                    "data": officeList
                });
            }
        })
    })
}


exports.getPlannedProjectPeopleSearch = function (req, res) {
    var search_string = req.params.search_string;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT PLANNED_PROJECT_PEOPLE.*, PROJECT.PROJECT_NAME, STAFF_ROLE.ROLE_NAME, PROJECT.PROJECT_STATUS_ID, PROJECT_STATUS.STATUS_NAME FROM PLANNED_PROJECT_PEOPLE INNER JOIN PROJECT ON PROJECT.PROJECT_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ID INNER JOIN STAFF_ROLE ON STAFF_ROLE.ROLE_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT_STATUS.STATUS_ID = PROJECT.PROJECT_STATUS_ID', function (err, officeList) {
            if (err) {
                return res.send({
                    "error": true,
                    "status": "failed",
                    "message": "Something went wrong"
                });
            } else {

                var SearchArray = [];
                var itemsProcessed = 0;
                for (var i = officeList.length - 1; i >= 0; i--) {
                    if (officeList[i].PROJECT_NAME == null ? false : officeList[i].PROJECT_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(officeList[i].PROJECT_NAME);
                    }
                    if (officeList[i].ALLOCATION == null ? false : officeList[i].ALLOCATION.toString().includes(search_string.toString())) {
                        SearchArray.push(officeList[i].ALLOCATION);
                    }
                    if (officeList[i].ROLE_NAME == null ? false : officeList[i].ROLE_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(officeList[i].ROLE_NAME);
                    }
                    if (officeList[i].STATUS_NAME == null ? false : officeList[i].STATUS_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(officeList[i].STATUS_NAME);
                    }

                    itemsProcessed++;
                    if (itemsProcessed === officeList.length) {
                        data = {};
                        data.searchResult = SearchArray;
                        data.searchResult = _.uniqBy(data.searchResult, _.lowerCase);

                        res.send({
                            "error": false,
                            "status": "success",
                            "data": data
                        });
                    }
                }
            }
        })
    })
}


exports.getPlannedProjectPeopleDetails = function (req, res) {
    var ADVANCE_SEARCH = req.body.ADVANCE_SEARCH;
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                if (err)
                    return next("Cannot Connect");
                var con = 'WHERE 1=1 ';

                if (ADVANCE_SEARCH) {
                    var projectListQuery = connection.query("SELECT * FROM PROJECT WHERE PROJECT_NAME LIKE '%" + ADVANCE_SEARCH + "%'", function (err, ProjectList) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            if (ProjectList.length < 1) {
                                var statusListQuery = connection.query("SELECT * FROM PROJECT_STATUS WHERE STATUS_NAME LIKE '%" + ADVANCE_SEARCH + "%'", function (err, StatusList) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    } else {
                                        if (StatusList.length < 1) {
                                            var roleListQuery = connection.query("SELECT * FROM STAFF_ROLE WHERE ROLE_NAME LIKE '%" + ADVANCE_SEARCH + "%'", function (err, RoleListQuery) {
                                                if (err) {
                                                    return res.send({
                                                        "error": true,
                                                        "status": "failed",
                                                        "message": "Something went wrong"
                                                    });
                                                } else {
                                                    if (RoleListQuery.length < 1) {

                                                        var alloccationQuery = connection.query("SELECT * FROM PLANNED_PROJECT_PEOPLE WHERE ALLOCATION LIKE '%" + ADVANCE_SEARCH + "%'", function (err, alloccationQueryData) {
                                                            if (err) {
                                                                return res.send({
                                                                    "error": true,
                                                                    "status": "failed",
                                                                    "message": "Something went wrong"
                                                                });
                                                            } else {
                                                                if (alloccationQueryData < 1) {
                                                                    res.send({
                                                                        "error": false,
                                                                        "status": "success",
                                                                        "data": alloccationQueryData
                                                                    });
                                                                } else {
                                                                    var tempArray = [];
                                                                    var itemsProcessed = 0;
                                                                    var PlannedQuery = connection.query("SELECT * FROM PROJECT INNER JOIN PLANNED_PROJECT_PEOPLE ON PROJECT.PROJECT_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ID WHERE PROJECT.PROJECT_ID = '" + alloccationQueryData[0].PROJECT_ID + "' AND ALLOCATION LIKE '%" + ADVANCE_SEARCH + "%'", function (err, plannedData) {
                                                                        if (err) {
                                                                            return res.send({
                                                                                "error": true,
                                                                                "status": "failed",
                                                                                "message": "Something went wrong"
                                                                            });
                                                                        } else {
                                                                            callback(null, plannedData);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    } else {
                                                        var roleListQuery = connection.query("SELECT * FROM PROJECT INNER JOIN PLANNED_PROJECT_PEOPLE ON PROJECT.PROJECT_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ID WHERE PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID =" + RoleListQuery[0].ROLE_ID, function (err, RoleList) {
                                                            if (err) {
                                                                return res.send({
                                                                    "error": true,
                                                                    "status": "failed",
                                                                    "message": "Something went wrong"
                                                                });
                                                            } else {
                                                                callback(null, RoleList);
                                                            }
                                                        });
                                                    }

                                                }
                                            });
                                        } else {
                                            var statusListQuery = connection.query("SELECT * FROM PROJECT INNER JOIN PLANNED_PROJECT_PEOPLE ON PROJECT.PROJECT_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ID WHERE PROJECT.PROJECT_STATUS_ID =" + StatusList[0].STATUS_ID, function (err, StatusListNew) {
                                                if (err) {
                                                    return res.send({
                                                        "error": true,
                                                        "status": "failed",
                                                        "message": "Something went wrong"
                                                    });
                                                } else {
                                                    callback(null, StatusListNew);
                                                }
                                            });
                                        }
                                    }
                                });
                            } else {
                                var statusListQuery = connection.query("SELECT * FROM PROJECT INNER JOIN PLANNED_PROJECT_PEOPLE ON PROJECT.PROJECT_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ID WHERE PROJECT.PROJECT_ID = '" + ProjectList[0].PROJECT_ID + "'", function (err, ProjectList1) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    } else {
                                        callback(null, ProjectList1);
                                    }
                                });
                                // callback(null, ProjectList1);
                            }
                        }
                    });
                } else {
                    var query = connection.query('SELECT PLANNED_PROJECT_PEOPLE.*, PROJECT.PROJECT_NAME, STAFF_ROLE.ROLE_NAME, PROJECT.PROJECT_STATUS_ID, PROJECT_STATUS.STATUS_NAME, OFFICE.OFFICE_NAME,OFFICE.OFFICE_CITY ,PROJECT_TYPE.TYPE_NAME FROM PLANNED_PROJECT_PEOPLE INNER JOIN PROJECT ON PROJECT.PROJECT_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ID INNER JOIN STAFF_ROLE ON STAFF_ROLE.ROLE_ID = PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT_STATUS.STATUS_ID = PROJECT.PROJECT_STATUS_ID LEFT JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID LEFT JOIN PROJECT_TYPE ON PROJECT_TYPE.TYPE_ID = PROJECT.PROJECT_TYPE_ID', function (err, officeList) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrongdfsadfa"
                            });
                        } else {
                            var tempCondition = 0;
                            var projectList = [];
                            var tempAssignment = '';
                            officeList.forEach(element => {
                                tempCondition++;
                                tempAssignment = calculateProjectAssignment(new Date(element.START_DATE), new Date(element.END_DATE));
                                element.STAFF_ASSIGNMENT = tempAssignment;
                                projectList.push(element);
                                if (tempCondition === officeList.length) {
                                    res.send({
                                        "error": false,
                                        "status": "success",
                                        "data": projectList
                                    });
                                }
                            });

                        }
                    });
                }
            },
            function (plannedDataSet, callback) {
                var TempArray = [];
                var itemsProcessed = 0;
                plannedDataSet.forEach(element => {
                    var customQuery = connection.query("SELECT STAFF_ROLE.ROLE_NAME, PROJECT_STATUS.STATUS_NAME FROM STAFF_ROLE INNER JOIN PROJECT_STATUS ON STATUS_ID = '" + element.PROJECT_STATUS_ID + "' WHERE STAFF_ROLE.ROLE_ID = '" + element.PROJECT_ROLE_ID + "'", function (err, customQueryData) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {
                            itemsProcessed++;
                            element.ROLE_NAME = customQueryData[0].ROLE_NAME;
                            element.STATUS_NAME = customQueryData[0].STATUS_NAME;
                            delete element.PROJECT_ROM;
                            delete element.PROJECT_CATEGORY;
                            delete element.PROJECT_ADDRESS;
                            delete element.PROJECT_CITY;
                            delete element.PROJECT_STATE;
                            delete element.PROJECT_ZIP;
                            // delete element.START_DATE;
                            // delete element.END_DATE;
                            delete element.PROJECT_DURATION;
                            delete element.PROJECT_TYPE_ID;
                            delete element.OFFICE_ID;
                            delete element.PROJECT_DESCRIPTION;
                            delete element.CATEGORY_ID;
                            delete element.TIMELINE_TYPE;

                            TempArray.push(element);
                            if (itemsProcessed === plannedDataSet.length) {
                                callback(null, TempArray);
                            }
                        }
                    });
                });
            }, function (ProPeoList, callback) {
                var tempCondition = 0;
                var tempArray = [];
                var tempAssignment = '';
                ProPeoList.forEach(element => {
                    tempCondition++;
                    tempAssignment = calculateProjectAssignment(new Date(element.START_DATE), new Date(element.END_DATE));
                    element.STAFF_ASSIGNMENT = tempAssignment;
                    tempArray.push(element);
                    if (tempCondition === ProPeoList.length) {
                        callback(null, tempArray);
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

function dayCount(currentDate, startDate) {
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


exports.getUnassignedStaff = function (req, res) {

}


exports.getOverAllocation = function (req, res) {
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                connection.query('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME,PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME,OFFICE.OFFICE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME, (SELECT SUM(ALLOCATION) as ALLOCATION_TOTAL FROM PROJECT_PEOPLE WHERE PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID AND PROJECT_PEOPLE.START_DATE <= NOW() AND PROJECT_PEOPLE.END_DATE >= NOW()) as ALLOCATION_TOTAL  FROM PROJECT_PEOPLE  INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID WHERE PROJECT_PEOPLE.START_DATE <= NOW() AND PROJECT_PEOPLE.END_DATE >= NOW() HAVING ALLOCATION_TOTAL > 100', function (err, OUAllocation) {
                    if (err) {
                        callback(null, 'count not found');
                    } else {
                        if (OUAllocation.length <= 0) {
                            return res.send({
                                "error": false,
                                "status": "No record",
                                "message": "No record found"
                            });
                        } else {
                            callback(null, OUAllocation);
                        }
                    }
                })
            },
            function (bothData, callback) {
                if (req.body.ADVANCE_SEARCH) {
                    var searchResultArray = [];
                    var tempCondition = 0;
                    bothData.forEach(element => {
                        tempCondition++;
                        element.ALLOCATION = element.ALLOCATION.toString();
                        if (_.isMatch(element, {
                            STAFF_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            PROJECT_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            STATUS_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            ROLE_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            STAFF_STATUS_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            ALLOCATION: req.body.ADVANCE_SEARCH
                        })) {
                            searchResultArray.push(element);
                            if (tempCondition === bothData.length) {
                                callback(null, searchResultArray);
                            }
                        } else {
                            if (tempCondition === bothData.length) {
                                callback(null, searchResultArray);
                            }
                        }
                    });
                } else {
                    callback(null, bothData);
                }
            }, function (ProPeoList, callback) {
                var tempCondition = 0;
                var tempArray = [];
                var tempAssignment = '';
                if (ProPeoList.length) {
                    ProPeoList.forEach(element => {
                        tempCondition++;
                        tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                        if (element.STAFF_ID) {
                            element.STAFF_ASSIGNMENT = tempAssignment;
                        } else {
                            element.STAFF_ASSIGNMENT = '';
                        }
                        tempArray.push(element);
                        if (tempCondition === ProPeoList.length) {
                            callback(null, tempArray);
                        }
                    });
                } else {
                    callback(null, ProPeoList);
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
    })
}

exports.getStaffingGap = function (req, res) {
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                var DBName = connectionModule.SUBSCRIBERDB;
                var staffAllocated = 'SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME,PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME,OFFICE.OFFICE_NAME FROM PROJECT_PEOPLE  INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID  where PROJECT_PEOPLE.STAFF_ID not in ( SELECT STAFF_ID FROM PROJECT_PEOPLE WHERE START_DATE <= NOW() AND END_DATE >= NOW())';
                var newStaff = 'SELECT STAFF_ID, NULL PROJECT_ID, EMPLOYMENT_START_DATE START_DATE, EMPLOYMENT_START_DATE END_DATE, 0 ALLOCATION, 0 PROJECT_ROLE_ID, NULL ASSIGNMENT_DURATION, NULL CONFIRMED, NULL NEXT_AVAILABLE, 0 RESUME_SUBMITTED, NULL EXPERIENCE_ID, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, NULL PROJECT_NAME, NULL PROJECT_STATUS_ID, NULL STATUS_NAME, NULL ROLE_NAME, STAFF_STATUS.STATUS_NAME ASSTAFF_STATUS_NAME, NULL OFFICE_NAME FROM STAFF INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID AND STAFF_STATUS.STATUS_ID = 1 WHERE STAFF_ID not in (SELECT STAFF_ID FROM PROJECT_PEOPLE GROUP BY STAFF_ID)';
                connection.query(`${staffAllocated} UNION ALL ${newStaff}`, function (err, StaffingGap) {
                    if (err) {
                        callback(null, 'count not found');
                    } else {
                        debugger;
                        var inactiveProjectPeople = JSON.parse(JSON.stringify(StaffingGap));
                        var responseCounter = 0;
                        var arrayResponse = [];
                        inactiveProjectPeople.forEach(element => {
                            inactiveProjectPeople.forEach(subElement => {
                                // if (element.STAFF_ID == subElement.STAFF_ID && formatDate(element.END_DATE) < formatDate(subElement.START_DATE)) {
                                //     var dayCounts = dayCount(element.END_DATE, subElement.START_DATE);
                                //     if (dayCounts >= 30) {
                                //         arrayResponse.push(subElement);
                                //     }
                                // }
                                if (element.STAFF_ID == subElement.STAFF_ID && element.STAFF_NAME) {
                                    if (subElement.PROJECT_ID !== null && formatDate(element.END_DATE) < formatDate(subElement.START_DATE)) {
                                        var dayCounts = dayCount(element.END_DATE, subElement.START_DATE);
                                        if (dayCounts >= 30) {
                                            arrayResponse.push(subElement);
                                        }
                                    } else if (subElement.PROJECT_ID === null) {
                                        if (element.STAFF_NAME.trim() !== '') {
                                            arrayResponse.push(subElement);
                                        }
                                    }
                                }
                            });
                        });
                        // console.log(JSON.stringify(arrayResponse));
                        if (arrayResponse.length <= 0) {
                            return res.send({
                                "error": false,
                                "status": "No record",
                                "message": "No record found"
                            });
                        } else {
                            return callback(null, arrayResponse);
                        }
                    }
                })
            },
            function (bothData, callback) {
                if (req.body.ADVANCE_SEARCH) {
                    var searchResultArray = [];
                    var tempCondition = 0;
                    bothData.forEach(element => {
                        tempCondition++;
                        element.ALLOCATION = element.ALLOCATION.toString();
                        if (_.isMatch(element, {
                            STAFF_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            PROJECT_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            STATUS_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            ROLE_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            STAFF_STATUS_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            ALLOCATION: req.body.ADVANCE_SEARCH
                        })) {
                            searchResultArray.push(element);
                            if (tempCondition === bothData.length) {
                                callback(null, searchResultArray);
                            }
                        } else {
                            if (tempCondition === bothData.length) {
                                callback(null, searchResultArray);
                            }
                        }
                    });
                } else {
                    callback(null, bothData);
                }
            }, function (ProPeoList, callback) {
                var tempCondition = 0;
                var tempArray = [];
                var tempAssignment = '';
                ProPeoList.forEach(element => {
                    tempCondition++;
                    tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                    if (element.STAFF_ID) {
                        element.STAFF_ASSIGNMENT = tempAssignment;
                    } else {
                        element.STAFF_ASSIGNMENT = '';
                    }
                    tempArray.push(element);
                    if (tempCondition === ProPeoList.length) {
                        callback(null, tempArray);
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
    })
}

exports.getNewStaffList = function (req, res) {
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                var DBName = connectionModule.SUBSCRIBERDB;
                connection.query('SELECT *,CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME from ' + DBName + '.STAFF INNER JOIN STAFF_ROLE ON STAFF.STAFF_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_GROUP ON STAFF.STAFF_GROUP_ID = STAFF_GROUP.GROUP_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON STAFF.OFFICE_ID = OFFICE.OFFICE_ID Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM ' + DBName + '.PROJECT_PEOPLE WHERE START_DATE <= NOW() AND END_DATE >= NOW())', function (err, NewStaffList) {
                    if (err) {
                        callback(null, 'count not found');
                    } else {
                        if (err) {
                            callback(null, 'count not found');
                        } else {
                            if (NewStaffList.length <= 0) {
                                return res.send({
                                    "error": false,
                                    "status": "No record",
                                    "message": "No record found"
                                });
                            } else {
                                callback(null, NewStaffList);
                            }
                        }
                    }
                })
            },
            function (bothData, callback) {
                if (req.body.ADVANCE_SEARCH) {
                    var searchResultArray = [];
                    var tempCondition = 0;
                    bothData.forEach(element => {
                        tempCondition++;
                        if (_.isMatch(element, {
                            STAFF_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            PREFERRED_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            STATUS_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            ROLE_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            GROUP_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            OFFICE_NAME: req.body.ADVANCE_SEARCH
                        })) {
                            searchResultArray.push(element);
                            if (tempCondition === bothData.length) {
                                callback(null, searchResultArray);
                            }
                        } else {
                            if (tempCondition === bothData.length) {
                                callback(null, searchResultArray);
                            }
                        }
                    });
                } else {
                    callback(null, bothData);
                }
            }, function (ProPeoList, callback) {
                var tempCondition = 0;
                var tempArray = [];
                var tempAssignment = '';
                ProPeoList.forEach(element => {
                    tempCondition++;
                    tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                    if (element.STAFF_ID) {
                        element.STAFF_ASSIGNMENT = tempAssignment;
                    } else {
                        element.STAFF_ASSIGNMENT = '';
                    }
                    tempArray.push(element);
                    if (tempCondition === ProPeoList.length) {
                        callback(null, tempArray);
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
    })
}

exports.getProjectPeopleAndPlannedProject = function (req, res) {
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                if (req.body.STAFFGAP) {
                    var DBName = connectionModule.SUBSCRIBERDB;

                    if (req.body.STAFFGAP === 'ASSIGNMENTENDING') {
                        var currentDate = new Date();
                        var formatedDate = formatDate(currentDate);
                        connection.query('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME,PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME,OFFICE.OFFICE_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID  WHERE (PROJECT_PEOPLE.START_DATE < "' + formatedDate + '" AND PROJECT_PEOPLE.END_DATE > "' + formatedDate + '") AND DATEDIFF(' + DBName + '.PROJECT_PEOPLE.END_DATE, NOW()) <= 90', function (err, assignmentEnding) {
                            if (err) {
                                callback(null, 'count not found');
                            } else {
                                if (assignmentEnding.length <= 0) {
                                    return res.send({
                                        "error": false,
                                        "status": "No record",
                                        "message": "No record found"
                                    });
                                } else {
                                    callback(null, assignmentEnding);
                                }
                            }
                        })
                    } else if (req.body.STAFFGAP === 'OVERUNDER') {
                        connection.query('SELECT * FROM ( SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME,PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME, OFFICE.OFFICE_NAME FROM PROJECT_PEOPLE  INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN  OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID WHERE PROJECT_PEOPLE.START_DATE <= NOW() AND PROJECT_PEOPLE.END_DATE >= NOW()) AS ALLOCATION_COUNT WHERE ALLOCATION < 100 OR ALLOCATION > 100', function (err, OUAllocation) {
                            if (err) {
                                callback(null, 'count not found');
                            } else {
                                if (OUAllocation.length <= 0) {
                                    return res.send({
                                        "error": false,
                                        "status": "No record",
                                        "message": "No record found"
                                    });
                                } else {
                                    callback(null, OUAllocation);
                                }
                            }
                        })
                    } else {
                        connection.query('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME,PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME,OFFICE.OFFICE_NAME FROM PROJECT_PEOPLE  INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN  OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID where PROJECT_PEOPLE.STAFF_ID not in ( SELECT STAFF_ID FROM PROJECT_PEOPLE WHERE START_DATE <= NOW() AND END_DATE >= NOW())', function (err, StaffingGap) {
                            if (err) {
                                callback(null, 'count not found');
                            } else {
                                var inactiveProjectPeople = JSON.parse(JSON.stringify(StaffingGap));
                                var responseCounter = 0;
                                var arrayResponse = [];
                                inactiveProjectPeople.forEach(element => {
                                    inactiveProjectPeople.forEach(subElement => {
                                        if (element.STAFF_ID == subElement.STAFF_ID && formatDate(element.END_DATE) < formatDate(subElement.START_DATE)) {
                                            var dayCounts = dayCount(element.END_DATE, subElement.START_DATE);
                                            if (dayCounts >= 30) {
                                                arrayResponse.push(subElement);
                                            }
                                        }
                                    });
                                });
                                if (arrayResponse.length <= 0) {
                                    return res.send({
                                        "error": false,
                                        "status": "No record",
                                        "message": "No record found"
                                    });
                                } else {
                                    return callback(null, arrayResponse);
                                }
                            }
                        })
                    }
                } else {
                    var query = connection.query('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME, OFFICE.OFFICE_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID WHERE STAFF.STAFF_STATUS_ID != 3', function (err, rows) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        if (rows.length < 1) {
                            callback(null, rows);
                        } else {
                            callback(null, rows);
                        }
                    });
                }
            },
            function (ProjecyPeopleData, callback) {

                if (req.body.STAFFGAP) {
                    callback(null, ProjecyPeopleData);
                } else {
                    var tempCondition = 0;
                    var PlannedPeopleQuery = connection.query('SELECT PLANNED_PROJECT_PEOPLE.*, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, OFFICE.OFFICE_NAME, STAFF_ROLE.ROLE_NAME FROM PLANNED_PROJECT_PEOPLE INNER JOIN PROJECT ON PLANNED_PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID ', function (err, PlannedPeopleData) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        } else {

                            if (PlannedPeopleData.length < 1) {
                                callback(null, ProjecyPeopleData);
                            } else {
                                PlannedPeopleData.forEach(element => {
                                    tempCondition++;
                                    ProjecyPeopleData.push(element);
                                    if (tempCondition === PlannedPeopleData.length) {
                                        callback(null, ProjecyPeopleData);
                                    }
                                });
                            }
                        }
                    });
                }
            },
            function (bothData, callback) {
                if (req.body.ADVANCE_SEARCH) {
                    var searchResultArray = [];
                    var tempCondition = 0;
                    bothData.forEach(element => {
                        tempCondition++;
                        element.ALLOCATION = element.ALLOCATION.toString();
                        if (_.isMatch(element, {
                            STAFF_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            PROJECT_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            STATUS_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            ROLE_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            STAFF_STATUS_NAME: req.body.ADVANCE_SEARCH
                        }) || _.isMatch(element, {
                            ALLOCATION: req.body.ADVANCE_SEARCH
                        })) {
                            searchResultArray.push(element);
                            if (tempCondition === bothData.length) {
                                callback(null, searchResultArray);
                            }
                        } else {
                            if (tempCondition === bothData.length) {
                                callback(null, searchResultArray);
                            }
                        }
                    });
                } else {
                    callback(null, bothData);
                }
            }, function (ProPeoList, callback) {
                var tempCondition = 0;
                var tempArray = [];
                var tempAssignment = '';
                ProPeoList.forEach(element => {
                    tempCondition++;
                    tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                    if (element.STAFF_ID) {
                        element.STAFF_ASSIGNMENT = tempAssignment;
                    } else {
                        element.STAFF_ASSIGNMENT = '';
                    }
                    tempArray.push(element);
                    if (tempCondition === ProPeoList.length) {
                        callback(null, tempArray);
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
    })
}

exports.getProjectPeopleAndPlannedTypehead = function (req, res) {
    var search_string = req.params.String;
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                var query = connection.query('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID ', function (err, rows) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }
                    callback(null, rows);
                });
            },
            function (ProjecyPeopleData, callback) {
                var tempCondition = 0;
                var PlannedPeopleQuery = connection.query('SELECT PLANNED_PROJECT_PEOPLE.*, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME FROM PLANNED_PROJECT_PEOPLE INNER JOIN PROJECT ON PLANNED_PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PLANNED_PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID ', function (err, PlannedPeopleData) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "status": "failed",
                            "message": "Something went wrong"
                        });
                    }

                    if (PlannedPeopleData.length < 1) {
                        callback(null, ProjecyPeopleData);
                    } else {
                        PlannedPeopleData.forEach(element => {
                            tempCondition++;
                            ProjecyPeopleData.push(element);
                            if (tempCondition === PlannedPeopleData.length) {
                                callback(null, ProjecyPeopleData);
                            }
                        });
                    }
                });
            },
            function (combineData, callback) {
                var SearchArray = [];
                var itemsProcessed = 0;
                for (var i = combineData.length - 1; i >= 0; i--) {
                    if (combineData[i].STAFF_NAME == null ? false : combineData[i].STAFF_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(combineData[i].STAFF_NAME);
                    }

                    if (combineData[i].PROJECT_NAME == null ? false : combineData[i].PROJECT_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(combineData[i].PROJECT_NAME);
                    }

                    if (combineData[i].ROLE_NAME == null ? false : combineData[i].ROLE_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(combineData[i].ROLE_NAME);
                    }

                    if (combineData[i].STATUS_NAME == null ? false : combineData[i].STATUS_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(combineData[i].STATUS_NAME);
                    }

                    if (combineData[i].ALLOCATION == null ? false : combineData[i].ALLOCATION.toString().includes(search_string.toLowerCase())) {
                        SearchArray.push(combineData[i].ALLOCATION);
                    }

                    itemsProcessed++;
                    if (itemsProcessed === combineData.length) {
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
    })
}

exports.getProjectPeoplesListFuture = function (req, res) {
    var tempCurrentDate = new Date();
    const minDayDiff = 30;
    const midDaydiff = 60;
    const maxDaydiff = 90;
    req.getConnection(function (err, connection) {
        async.waterfall([
                function (callback) {
                    if (err)
                        return next("Cannot Connect");
                    var con = 'WHERE 1=1 ';
                    if (req.body.ADVANCE_SEARCH) {
                        var ADVANCE_SEARCH = req.body.ADVANCE_SEARCH;
                        //con = con + " AND (EMAIL_ID LIKE '%" + ADVANCE_SEARCH + "%' OR FIRST_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR MIDDLE_INITIAL LIKE '%" + ADVANCE_SEARCH + "%' OR LAST_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR PREFERRED_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR STATUS_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR ROLE_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR CATEGORY_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR OFFICE_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_1 LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_1_TYPE LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_2 LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_2_TYPE LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_CITY LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_STATE LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_ZIP LIKE '%" + ADVANCE_SEARCH + "%' )";
                        var strArray = ADVANCE_SEARCH.split(" ");
                        var stringArray = [];
                        for (var i = 0; i < strArray.length; i++) {
                            stringArray.push(strArray[i]);
                        }
                        var likeQuery = connection.query("SELECT PROJECT_PEOPLE.PROJECT_ID,PROJECT_PEOPLE.STAFF_ID  FROM `STAFF` INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE FIRST_NAME LIKE '%" + stringArray[0] + "%' AND MIDDLE_INITIAL LIKE '%" + stringArray[1] + "%' AND LAST_NAME LIKE '%" + stringArray[2] + "%' ", function (err, pmNamesArray) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }
                            if (pmNamesArray.length < 1) {
                                roleNameQuery = connection.query("SELECT ROLE_ID FROM `STAFF_ROLE` WHERE `ROLE_NAME` LIKE '%" + ADVANCE_SEARCH + "%'", function (err, roleNameArray) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }
                                    if (roleNameArray.length < 1) {
                                        proNameQuery = connection.query("SELECT PROJECT_ID FROM `PROJECT` WHERE `PROJECT_NAME` LIKE '%" + ADVANCE_SEARCH + "%'", function (err, proNameArray) {
                                            if (err) {
                                                return res.send({
                                                    "error": true,
                                                    "status": "failed",
                                                    "message": "Something went wrong"
                                                });
                                            }
                                            if (proNameArray < 1) {
                                                statusQuery = connection.query("SELECT STATUS_ID FROM `PROJECT_STATUS` WHERE `STATUS_NAME` LIKE '%" + ADVANCE_SEARCH + "%'", function (err, statusArray) {
                                                    if (err) {
                                                        return res.send({
                                                            "error": true,
                                                            "status": "failed",
                                                            "message": "Something went wrong"
                                                        });
                                                    }
                                                    if (statusArray < 1) {
                                                        var resData = {};
                                                        resData.ASSIGNEDSTAFF = [];
                                                        resData.FREESTAFF = [];
                                                        res.send({
                                                            "error": false,
                                                            "status": "success",
                                                            "data": resData
                                                        });
                                                        return;
                                                    } else {
                                                        callback(null, statusArray, 'PROJECT_STATUS_ID');
                                                    }
                                                });

                                            } else {
                                                callback(null, proNameArray, 'PROJECT_ID');
                                            }
                                        })

                                    } else {
                                        callback(null, roleNameArray, 'PROJECT_ROLE_ID');
                                    }
                                });

                            } else {
                                callback(null, pmNamesArray, 'STAFF_ID');
                            }
                        });
                    } else {
                        let projectStatusID = ['1', '2', '3'];
                        var query = connection.query("SELECT PROJECT_PEOPLE.*,DATE_FORMAT(PROJECT_PEOPLE.END_DATE, '%Y-%m-%d') AS END_DATE1, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME,OFFICE.OFFICE_NAME,STAFF_GROUP.GROUP_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID LEFT JOIN OFFICE ON OFFICE.OFFICE_ID = STAFF.OFFICE_ID LEFT JOIN STAFF_GROUP ON STAFF_GROUP.GROUP_ID = STAFF.STAFF_GROUP_ID " + con + " AND PROJECT.PROJECT_STATUS_ID IN (" + projectStatusID + ")", function (err, rows) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }
                            //if user not found
                            if (rows.length < 1) {
                                var resData = {};
                                resData.ASSIGNEDSTAFF = [];
                                resData.FREESTAFF = [];
                                res.send({
                                    "error": false,
                                    "status": "success",
                                    "data": resData
                                });
                                return;
                            } else {
                                var freeStaff = [];
                                var tempCondition = 0;
                                var tempResponse = [];
                                var tempAssignment = '';
                                rows.forEach(element => {
                                    tempCondition++;
                                    var date2 = element.END_DATE;
                                    var timeDiff = Math.abs(date2.getTime() - tempCurrentDate);
                                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                    if (diffDays >= 0 && diffDays <= minDayDiff) {
                                        element.FUTURE_DAYS = "Available in 30 Days";
                                    } else if (diffDays > minDayDiff && diffDays <= midDaydiff) {
                                        element.FUTURE_DAYS = "Available in 30 to 60 Days";
                                    } else if (diffDays > midDaydiff && diffDays <= maxDaydiff) {
                                        element.FUTURE_DAYS = "Available in 60 to 90 Days";
                                    } else {
                                        element.FUTURE_DAYS = null;
                                    }
                                    freeStaff.push("'" + element.STAFF_ID + "'");
                                    var dateObj = new Date();
                                    var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                    month = (month < 10) ? "0" + month : month;
                                    var day = dateObj.getUTCDate();
                                    day = (day < 10) ? "0" + day : day;
                                    var year = dateObj.getUTCFullYear();
                                    newdate = year + "-" + month + "-" + day;
                                    if (element.END_DATE1 >= newdate) {
                                        var tomorrow = new Date(element.END_DATE.getTime() + 1000 * 60 * 60 * 24);
                                        element.NEXT_AVAILABLE = tomorrow;
                                        tempResponse.push(element);
                                    }

                                    tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                                    element.STAFF_ASSIGNMENT = tempAssignment;
                                    if (tempCondition === rows.length) {
                                        var resData = {};
                                        var StaffNameListQuery = connection.query("SELECT STAFF_ID, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME FROM STAFF WHERE STAFF_ID NOT IN ( " + freeStaff + ")", function (err, StaffNameList) {
                                            if (err) {
                                                return res.send({
                                                    "error": true,
                                                    "status": "failed",
                                                    "message": "Something went wrong"
                                                });
                                            }
                                            if (StaffNameList.length < 1) {
                                                resData.ASSIGNEDSTAFF = tempResponse;
                                                resData.FREESTAFF = [];
                                                res.send({
                                                    "error": false,
                                                    "status": "success",
                                                    "data": resData
                                                });
                                                return;
                                            } else {
                                                var result = StaffNameList.map(function (el) {
                                                    var o = Object.assign({}, el);
                                                    o.NEXT_AVAILABLE = new Date();
                                                    return o;
                                                });
                                                resData.ASSIGNEDSTAFF = tempResponse;
                                                resData.FREESTAFF = result;
                                                res.send({
                                                    "error": false,
                                                    "status": "success",
                                                    "data": resData
                                                });
                                                return;
                                            }
                                        });
                                    }
                                })
                            }
                        });
                    }
                },
                function (proIdList, fieldName, callback) {
                    var tempCondition;
                    var queryTemp;
                    if (fieldName === 'PROJECT_STATUS_ID') {
                        tempCondition = proIdList[0].STATUS_ID
                        queryTemp = "SELECT PROJECT_ID FROM PROJECT WHERE " + fieldName + " = '" + tempCondition + "'";
                    } else if (fieldName === 'PROJECT_ID') {
                        tempCondition = proIdList[0].PROJECT_ID;
                        queryTemp = "SELECT PROJECT_ID FROM PROJECT WHERE " + fieldName + " = '" + tempCondition + "'";
                    } else if (fieldName === 'PROJECT_ROLE_ID') {
                        tempCondition = proIdList[0].ROLE_ID;
                        queryTemp = "SELECT PROJECT_ID FROM `PROJECT_PEOPLE` WHERE PROJECT_ROLE_ID = '" + tempCondition + "'";
                    } else if (fieldName === 'STAFF_ID') {
                        tempCondition = proIdList[0].STAFF_ID;
                        queryTemp = "SELECT PROJECT_ID FROM `PROJECT_PEOPLE` WHERE " + fieldName + " = '" + tempCondition + "'";
                    }
                    var getResultQuery = connection.query(queryTemp, function (err, projectList) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        if (projectList < 1) {
                            var resData = {};
                            resData.ASSIGNEDSTAFF = [];
                            resData.FREESTAFF = [];
                            res.send({
                                "error": false,
                                "status": "success",
                                "data": resData
                            });
                            return;
                        } else {
                            var proIdArray = [];
                            projectList.forEach(element => {
                                proIdArray.push("\'" + element.PROJECT_ID + "\'");
                            });
                            if (fieldName === 'PROJECT_ROLE_ID') {
                                callback(null, proIdArray, tempCondition, 'PROJECT_ROLE_ID');
                            } else if (fieldName === 'STAFF_ID') {
                                callback(null, proIdArray, tempCondition, 'STAFF_ID');
                            } else {
                                callback(null, proIdArray, tempCondition, 'Else');
                            }
                        }
                    })
                },
                function (proIdArray, tempCondition, condition, callback) {
                    var tQuery;
                    let projectStatusID = ['1', '2', '3'];
                    if (condition === 'PROJECT_ROLE_ID') {
                        tQuery = 'AND PROJECT_PEOPLE.PROJECT_ROLE_ID = ' + tempCondition;
                    } else if (condition === 'STAFF_ID') {
                        tQuery = 'AND PROJECT_PEOPLE.STAFF_ID = "' + tempCondition + '"';
                    } else {
                        tQuery = ' AND 1 = 1';
                    }
                    var query = connection.query('SELECT PROJECT_PEOPLE.*,DATE_FORMAT(PROJECT_PEOPLE.END_DATE, "%Y-%m-%d") AS END_DATE1, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME,OFFICE.OFFICE_NAME,STAFF_GROUP.GROUP_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID LEFT JOIN OFFICE ON OFFICE.OFFICE_ID = STAFF.OFFICE_ID LEFT JOIN STAFF_GROUP ON STAFF_GROUP.GROUP_ID = STAFF.STAFF_GROUP_ID WHERE PROJECT.PROJECT_STATUS_ID IN (' + projectStatusID + ') AND PROJECT_PEOPLE.PROJECT_ID IN (' + proIdArray + ')' + tQuery, function (err, rows) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        callback(null, rows);
                    });
                },
                function (rows, callback) {
                    var tempCondition = 0;
                    var tempResponse = [];
                    var freeStaff = [];
                    rows.forEach(element => {
                        tempCondition++;
                        var date2 = element.END_DATE;
                        var timeDiff = Math.abs(date2.getTime() - tempCurrentDate);
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        if (diffDays >= 0 && diffDays <= minDayDiff) {
                            element.FUTURE_DAYS = "Available in 30 Days";
                        } else if (diffDays > minDayDiff && diffDays <= midDaydiff) {
                            element.FUTURE_DAYS = "Available in 30 to 60 Days";
                        } else if (diffDays > midDaydiff && diffDays <= maxDaydiff) {
                            element.FUTURE_DAYS = "Available in 60 to 90 Days";
                        } else {
                            element.FUTURE_DAYS = null;
                        }
                        freeStaff.push("'" + element.STAFF_ID + "'");
                        var dateObj = new Date();
                        var month = dateObj.getUTCMonth() + 1; //months from 1-12
                        month = (month < 10) ? "0" + month : month;
                        var day = dateObj.getUTCDate();
                        day = (day < 10) ? "0" + day : day;
                        var year = dateObj.getUTCFullYear();
                        newdate = year + "-" + month + "-" + day;
                        if (element.END_DATE1 >= newdate) {
                            var tomorrow = new Date(element.END_DATE.getTime() + 1000 * 60 * 60 * 24);
                            element.NEXT_AVAILABLE = tomorrow;
                            tempResponse.push(element);
                        }
                        if (tempCondition === rows.length) {

                            var resData = {};
                            if (tempResponse > 1) {
                                resData.ASSIGNEDSTAFF = tempResponse;
                                resData.FREESTAFF = [];
                                callback(null, resData);
                            } else {
                                var StaffNameListQuery = connection.query("SELECT STAFF_ID, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME FROM STAFF WHERE STAFF_ID NOT IN ( " + freeStaff + ")", function (err, StaffNameList) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }
                                    if (StaffNameList.length < 1) {
                                        resData.ASSIGNEDSTAFF = tempResponse;
                                        resData.FREESTAFF = [];
                                        callback(null, resData);
                                    } else {
                                        var result = StaffNameList.map(function (el) {
                                            var o = Object.assign({}, el);
                                            o.NEXT_AVAILABLE = new Date();
                                            return o;
                                        });
                                        resData.ASSIGNEDSTAFF = tempResponse;
                                        resData.FREESTAFF = result;
                                        callback(null, resData);
                                    }
                                });
                            }
                        }
                    })
                }, function (ProPeoList, callback) {
                    if (!ProPeoList.ASSIGNEDSTAFF) {
                        var resData = {};
                        resData.ASSIGNEDSTAFF = [];
                        resData.FREESTAFF = ProPeoList.FREESTAFF;
                        callback(null, resData);
                    } else {
                        var tempCondition = 0;
                        var tempArray = [];
                        var tempAssignment = '';
                        ProPeoList.ASSIGNEDSTAFF.forEach(element => {
                            tempCondition++;
                            tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                            element.STAFF_ASSIGNMENT = tempAssignment;
                            tempArray.push(element);
                            if (tempCondition === ProPeoList.ASSIGNEDSTAFF.length) {
                                var resData = {};
                                resData.ASSIGNEDSTAFF = tempArray;
                                resData.FREESTAFF = ProPeoList.FREESTAFF;
                                callback(null, resData);
                            }
                        });
                    }
                }
            ],
            function (err, result) {
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
    });
}
exports.getProjectPeoplesListUpcomingRollOff = function (req, res) {
    var tempCurrentDate = new Date();
    const minDayDiff = 60;
    req.getConnection(function (err, connection) {
        async.waterfall([
                function (callback) {
                    if (err)
                        return next("Cannot Connect");
                    let con = 'WHERE 1=1 ';
                    if (req.body.ADVANCE_SEARCH) {
                        var ADVANCE_SEARCH = req.body.ADVANCE_SEARCH;
                        //con = con + " AND (EMAIL_ID LIKE '%" + ADVANCE_SEARCH + "%' OR FIRST_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR MIDDLE_INITIAL LIKE '%" + ADVANCE_SEARCH + "%' OR LAST_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR PREFERRED_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR STATUS_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR ROLE_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR CATEGORY_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR OFFICE_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_1 LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_1_TYPE LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_2 LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_2_TYPE LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_CITY LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_STATE LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_ZIP LIKE '%" + ADVANCE_SEARCH + "%' )";
                        var strArray = ADVANCE_SEARCH.split(" ");
                        var stringArray = [];
                        for (var i = 0; i < strArray.length; i++) {
                            stringArray.push(strArray[i]);
                        }
                        var likeQuery = connection.query("SELECT PROJECT_PEOPLE.PROJECT_ID,PROJECT_PEOPLE.STAFF_ID,CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME FROM `STAFF` INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE FIRST_NAME LIKE '%" + stringArray[0] + "%' AND MIDDLE_INITIAL LIKE '%" + stringArray[1] + "%' AND LAST_NAME LIKE '%" + stringArray[2] + "%' ", function (err, pmNamesArray) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }
                            if (pmNamesArray.length < 1) {
                                roleNameQuery = connection.query("SELECT ROLE_ID FROM `STAFF_ROLE` WHERE `ROLE_NAME` LIKE '%" + ADVANCE_SEARCH + "%'", function (err, roleNameArray) {
                                    if (err) {
                                        return res.send({
                                            "error": true,
                                            "status": "failed",
                                            "message": "Something went wrong"
                                        });
                                    }
                                    if (roleNameArray.length < 1) {
                                        proNameQuery = connection.query("SELECT PROJECT_ID FROM `PROJECT` WHERE `PROJECT_NAME` LIKE '%" + ADVANCE_SEARCH + "%'", function (err, proNameArray) {
                                            if (err) {
                                                return res.send({
                                                    "error": true,
                                                    "status": "failed",
                                                    "message": "Something went wrong"
                                                });
                                            }
                                            if (proNameArray < 1) {
                                                statusQuery = connection.query("SELECT STATUS_ID FROM `PROJECT_STATUS` WHERE `STATUS_NAME` LIKE '%" + ADVANCE_SEARCH + "%'", function (err, statusArray) {
                                                    if (err) {
                                                        return res.send({
                                                            "error": true,
                                                            "status": "failed",
                                                            "message": "Something went wrong"
                                                        });
                                                    }
                                                    if (statusArray < 1) {
                                                        var resData = [];
                                                        res.send({
                                                            "error": false,
                                                            "status": "success",
                                                            "data": resData
                                                        });
                                                        return;
                                                    } else {
                                                        callback(null, statusArray, 'PROJECT_STATUS_ID');
                                                    }
                                                });

                                            } else {
                                                callback(null, proNameArray, 'PROJECT_ID');
                                            }
                                        })

                                    } else {
                                        callback(null, roleNameArray, 'PROJECT_ROLE_ID');
                                    }
                                });

                            } else {
                                callback(null, pmNamesArray, 'STAFF_ID');
                            }
                        });
                    } else {
                        let projectStatusID = ['1', '2', '3'];
                        let query = connection.query("SELECT PROJECT_PEOPLE.*,DATE_FORMAT(PROJECT_PEOPLE.END_DATE, '%Y-%m-%d') AS END_DATE1, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME,OFFICE.OFFICE_NAME,STAFF_GROUP.GROUP_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID LEFT JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID LEFT JOIN STAFF_GROUP ON STAFF_GROUP.GROUP_ID = STAFF.STAFF_GROUP_ID " + con + " AND PROJECT.PROJECT_STATUS_ID IN (" + projectStatusID + ")", function (err, rows) {
                            if (err) {
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Something went wrong"
                                });
                            }
                            //if user not found
                            if (rows.length < 1) {
                                let resData = [];
                                res.send({
                                    "error": false,
                                    "status": "success",
                                    "data": resData
                                });
                                return;
                            } else {
                                let tempCondition = 0;
                                let tempResponse = [];
                                let tempAssignment = '';
                                rows.forEach(element => {
                                    tempCondition++;

                                    let dateObj = new Date();
                                    let month = dateObj.getUTCMonth() + 1; //months from 1-12
                                    month = (month < 10) ? "0" + month : month;
                                    let day = dateObj.getUTCDate();
                                    day = (day < 10) ? "0" + day : day;
                                    let year = dateObj.getUTCFullYear();
                                    let newdate = year + "-" + month + "-" + day;
                                    let date2 = element.END_DATE;
                                    let timeDiff = Math.abs(date2.getTime() - tempCurrentDate);
                                    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                    if (element.END_DATE1 >= newdate && diffDays <= minDayDiff) {
                                        let tomorrow = new Date(element.END_DATE.getTime() + 1000 * 60 * 60 * 24);
                                        element.NEXT_AVAILABLE = tomorrow;
                                        tempResponse.push(element);
                                    }
                                    tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                                    element.STAFF_ASSIGNMENT = tempAssignment;
                                    if (tempCondition === rows.length) {
                                        let resData = [];
                                        let StaffNameListQuery = connection.query("SELECT STAFF_ID, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME FROM STAFF", function (err, StaffNameList) {
                                            if (err) {
                                                return res.send({
                                                    "error": true,
                                                    "status": "failed",
                                                    "message": "Something went wrong"
                                                });
                                            }

                                            if (StaffNameList.length < 1) {
                                                resData = tempResponse;
                                                res.send({
                                                    "error": false,
                                                    "status": "success",
                                                    "data": resData
                                                });
                                                return;
                                            } else {
                                                resData = tempResponse;
                                                res.send({
                                                    "error": false,
                                                    "status": "success",
                                                    "data": resData
                                                });
                                                return;
                                            }
                                        });
                                    }
                                })
                            }
                        });
                    }
                },
                function (proIdList, fieldName, callback) {
                    let tempCondition;
                    let queryTemp;
                    if (fieldName === 'PROJECT_STATUS_ID') {
                        tempCondition = proIdList[0].STATUS_ID
                        queryTemp = "SELECT PROJECT_ID FROM PROJECT WHERE " + fieldName + " = '" + tempCondition + "'";
                    } else if (fieldName === 'PROJECT_ID') {
                        tempCondition = proIdList[0].PROJECT_ID;
                        queryTemp = "SELECT PROJECT_ID FROM PROJECT WHERE " + fieldName + " = '" + tempCondition + "'";
                    } else if (fieldName === 'PROJECT_ROLE_ID') {
                        tempCondition = proIdList[0].ROLE_ID;
                        queryTemp = "SELECT PROJECT_ID FROM `PROJECT_PEOPLE` WHERE PROJECT_ROLE_ID = '" + tempCondition + "'";
                    } else if (fieldName === 'STAFF_ID') {
                        tempCondition = proIdList[0].STAFF_ID;
                        queryTemp = "SELECT PROJECT_ID FROM `PROJECT_PEOPLE` WHERE " + fieldName + " = '" + tempCondition + "'";
                    }
                    let getResultQuery = connection.query(queryTemp, function (err, projectList) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        if (projectList < 1) {
                            var resData = [];
                            res.send({
                                "error": false,
                                "status": "success",
                                "data": resData
                            });
                            return;
                        } else {
                            let proIdArray = [];
                            projectList.forEach(element => {
                                proIdArray.push("\'" + element.PROJECT_ID + "\'");
                            });
                            if (fieldName === 'PROJECT_ROLE_ID') {
                                callback(null, proIdArray, tempCondition, 'PROJECT_ROLE_ID');
                            } else if (fieldName === 'STAFF_ID') {
                                callback(null, proIdArray, tempCondition, 'STAFF_ID');
                            } else {
                                callback(null, proIdArray, tempCondition, 'Else');
                            }
                        }
                    })
                },
                function (proIdArray, tempCondition, condition, callback) {
                    let tQuery;
                    let projectStatusID = ['1', '2', '3'];
                    if (condition === 'PROJECT_ROLE_ID') {
                        tQuery = 'AND PROJECT_PEOPLE.PROJECT_ROLE_ID = ' + tempCondition;
                    } else if (condition === 'STAFF_ID') {
                        tQuery = 'AND PROJECT_PEOPLE.STAFF_ID = "' + tempCondition + '"';
                    } else {
                        tQuery = ' AND 1 = 1';
                    }
                    let query = connection.query('SELECT PROJECT_PEOPLE.*,DATE_FORMAT(PROJECT_PEOPLE.END_DATE, "%Y-%m-%d") AS END_DATE1, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME,OFFICE.OFFICE_NAME,STAFF_GROUP.GROUP_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID LEFT JOIN OFFICE ON OFFICE.OFFICE_ID = STAFF.OFFICE_ID LEFT JOIN STAFF_GROUP ON STAFF_GROUP.GROUP_ID = STAFF.STAFF_GROUP_ID WHERE PROJECT.PROJECT_STATUS_ID IN (' + projectStatusID + ') AND PROJECT_PEOPLE.PROJECT_ID IN (' + proIdArray + ')' + tQuery, function (err, rows) {
                        if (err) {
                            return res.send({
                                "error": true,
                                "status": "failed",
                                "message": "Something went wrong"
                            });
                        }
                        callback(null, rows);
                    });
                },
                function (rows, callback) {
                    let tempCondition = 0;
                    let tempResponse = [];
                    rows.forEach(element => {
                        tempCondition++;
                        let dateObj = new Date();
                        let month = dateObj.getUTCMonth() + 1; //months from 1-12
                        month = (month < 10) ? "0" + month : month;
                        let day = dateObj.getUTCDate();
                        day = (day < 10) ? "0" + day : day;
                        let year = dateObj.getUTCFullYear();
                        let newdate = year + "-" + month + "-" + day;
                        let date2 = element.END_DATE;
                        let timeDiff = Math.abs(date2.getTime() - tempCurrentDate);
                        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        if (element.END_DATE1 >= newdate && diffDays <= minDayDiff) {
                            let tomorrow = new Date(element.END_DATE.getTime() + 1000 * 60 * 60 * 24);
                            element.NEXT_AVAILABLE = tomorrow;
                            tempResponse.push(element);
                        }
                        if (tempCondition === rows.length) {
                            let resData = [];
                            if (tempResponse) {
                                resData = tempResponse;
                                callback(null, resData);
                            } else {
                                resData = tempResponse;
                                res.send({
                                    "error": false,
                                    "status": "success",
                                    "data": resData
                                });
                                return;
                            }
                        }
                    })
                }, function (ProPeoList, callback) {
                    if (!ProPeoList) {
                        let resData = [];
                        callback(null, resData);
                    } else {
                        let tempCondition = 0;
                        let tempArray = [];
                        let tempAssignment = '';
                        ProPeoList.forEach(element => {
                            tempCondition++;
                            tempAssignment = calculateProjectAssignment(element.START_DATE, element.END_DATE);
                            element.STAFF_ASSIGNMENT = tempAssignment;
                            tempArray.push(element);
                            if (tempCondition === ProPeoList.length) {
                                let resData = [];
                                resData = tempArray;
                                callback(null, resData);
                            }
                        });
                    }
                }
            ],
            function (err, result) {
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
    });
}


function calculateProjectAssignment(StartDate, EndDate) {
    var TodayDate = new Date();
    var ProjectAssignment = '';
    if (TodayDate < StartDate) {
        ProjectAssignment = 'Planned';
    } else if (TodayDate >= StartDate && TodayDate <= EndDate) {
        ProjectAssignment = 'Active';
    } else if (TodayDate > EndDate) {
        ProjectAssignment = 'Inactive';
    }
    return ProjectAssignment;
}