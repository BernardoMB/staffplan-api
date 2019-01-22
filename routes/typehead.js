var MagicIncrement = require('magic-increment');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');
var moment = require('moment');
var connectionModule = require('../connection');

exports.projectInitiatedTypehead = function (req, res) {
    var search_string = req.params.projectInitiatedTypehead;
    var conditionForTypehead = '';
    if (req.params.type === 'Initiated') {
        conditionForTypehead = ' PROJECT.PROJECT_STATUS_ID = 2';
    } else if (req.params.type === 'StartingDate') {
        conditionForTypehead = 'DATEDIFF(START_DATE, NOW()) > 90';
    } else if (req.params.type === 'EndingDate') {
        conditionForTypehead = 'DATEDIFF(END_DATE, NOW()) > 90';
    } else {
        res.send({
            "error": true,
            "status": "failed",
            "message": "Request url not found"
        });
    }
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                var send_rows = {};
                var query = connection.query('SELECT * , DATE_FORMAT(START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(END_DATE, "%Y-%m-%d") AS END_DATE FROM PROJECT INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID WHERE ' + conditionForTypehead, function (err, rows) {
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
                    var GetEmpQuery = connection.query('SELECT CONCAT (FIRST_NAME,MIDDLE_INITIAL,LAST_NAME) AS Project_Manager FROM STAFF INNER JOIN PROJECT_PEOPLE ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE PROJECT_PEOPLE.PROJECT_ROLE_ID = "8" AND PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '"', function (err, ProData) {
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

exports.staffNewTypehead = function (req, res) {
    var conditionForTypehead = '';
    var queryGetData = '';
    if (req.params.type === 'NewStaff') {
        queryGetData = 'SELECT *,CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME from sp_staffplan.STAFF INNER JOIN STAFF_ROLE ON STAFF.STAFF_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_GROUP ON STAFF.STAFF_GROUP_ID = STAFF_GROUP.GROUP_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON STAFF.OFFICE_ID = OFFICE.OFFICE_ID Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM sp_staffplan.PROJECT_PEOPLE WHERE START_DATE <= NOW() AND END_DATE >= NOW())';
    } else if (req.params.type === 'OverAllocation') {
        queryGetData = 'SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME,PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME, (SELECT SUM(ALLOCATION) as ALLOCATION_TOTAL FROM PROJECT_PEOPLE WHERE PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID AND PROJECT_PEOPLE.START_DATE <= NOW() AND PROJECT_PEOPLE.END_DATE >= NOW()) as ALLOCATION_TOTAL  FROM PROJECT_PEOPLE  INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID WHERE PROJECT_PEOPLE.START_DATE <= NOW() AND PROJECT_PEOPLE.END_DATE >= NOW() HAVING ALLOCATION_TOTAL > 100';
    } else {
        return res.send({
            "error": true,
            "status": "failed",
            "message": "Url not found"
        });
    }
    var DBName = connectionModule.SUBSCRIBERDB;
    req.getConnection(function (err, connection) {
        var search_string = req.params.staffNewTypehead;
        var query = connection.query(queryGetData, function (err, rows) {
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
                if (rows[i].FIRST_NAME == null ? false : rows[i].FIRST_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].FIRST_NAME);
                }

                if (rows[i].STAFF_NAME == null ? false : rows[i].STAFF_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].STAFF_NAME);
                }

                if (rows[i].MIDDLE_INITIAL == null ? false : rows[i].MIDDLE_INITIAL.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].MIDDLE_INITIAL);
                }

                if (rows[i].LAST_NAME == null ? false : rows[i].LAST_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].LAST_NAME);
                }

                if (rows[i].PREFERRED_NAME == null ? false : rows[i].PREFERRED_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].PREFERRED_NAME);
                }

                if (rows[i].EMAIL_ID == null ? false : rows[i].EMAIL_ID.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].EMAIL_ID);
                }

                if (rows[i].PHONE_1 == null ? false : rows[i].PHONE_1.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].PHONE_1);
                }

                if (rows[i].PHONE_1_TYPE == null ? false : rows[i].PHONE_1_TYPE.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].PHONE_1_TYPE);
                }

                if (rows[i].PHONE_2 == null ? false : rows[i].PHONE_2.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].PHONE_2);
                }

                if (rows[i].PHONE_2_TYPE == null ? false : rows[i].PHONE_2_TYPE.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].PHONE_2_TYPE);
                }

                if (rows[i].HOME_CITY == null ? false : rows[i].HOME_CITY.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].HOME_CITY);
                }

                if (rows[i].HOME_STATE == null ? false : rows[i].HOME_STATE.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].HOME_STATE);
                }

                if (rows[i].HOME_ZIP == null ? false : rows[i].HOME_ZIP.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].HOME_ZIP);
                }

                if (rows[i].STATUS_NAME == null ? false : rows[i].STATUS_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].STATUS_NAME);
                }

                if (rows[i].ROLE_NAME == null ? false : rows[i].ROLE_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].ROLE_NAME);
                }

                if (rows[i].GROUP_NAME == null ? false : rows[i].GROUP_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].GROUP_NAME);
                }

                if (rows[i].OFFICE_NAME == null ? false : rows[i].OFFICE_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                    SearchArray.push(rows[i].OFFICE_NAME);
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
    });
}


exports.staffingGapTypehead = function (req, res) {
    req.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) {
                var DBName = connectionModule.SUBSCRIBERDB;
                connection.query('SELECT PROJECT_PEOPLE.*,STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME,PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME FROM PROJECT_PEOPLE  INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID  where PROJECT_PEOPLE.STAFF_ID not in ( SELECT STAFF_ID FROM PROJECT_PEOPLE WHERE START_DATE <= NOW() AND END_DATE >= NOW())', function (err, StaffingGap) {
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
            },
            function (rows, callback) {
                var search_string = req.params.staffNewTypehead;
                var SearchArray = [];
                var itemsProcessed = 0;
                for (var i = rows.length - 1; i >= 0; i--) {
                    if (rows[i].FIRST_NAME == null ? false : rows[i].FIRST_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].FIRST_NAME);
                    }

                    if (rows[i].MIDDLE_INITIAL == null ? false : rows[i].MIDDLE_INITIAL.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].MIDDLE_INITIAL);
                    }

                    if (rows[i].LAST_NAME == null ? false : rows[i].LAST_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].LAST_NAME);
                    }

                    if (rows[i].PREFERRED_NAME == null ? false : rows[i].PREFERRED_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].PREFERRED_NAME);
                    }

                    if (rows[i].EMAIL_ID == null ? false : rows[i].EMAIL_ID.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].EMAIL_ID);
                    }

                    if (rows[i].PHONE_1 == null ? false : rows[i].PHONE_1.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].PHONE_1);
                    }

                    if (rows[i].PHONE_1_TYPE == null ? false : rows[i].PHONE_1_TYPE.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].PHONE_1_TYPE);
                    }

                    if (rows[i].PHONE_2 == null ? false : rows[i].PHONE_2.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].PHONE_2);
                    }

                    if (rows[i].PHONE_2_TYPE == null ? false : rows[i].PHONE_2_TYPE.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].PHONE_2_TYPE);
                    }

                    if (rows[i].HOME_CITY == null ? false : rows[i].HOME_CITY.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].HOME_CITY);
                    }

                    if (rows[i].HOME_STATE == null ? false : rows[i].HOME_STATE.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].HOME_STATE);
                    }

                    if (rows[i].HOME_ZIP == null ? false : rows[i].HOME_ZIP.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].HOME_ZIP);
                    }

                    if (rows[i].STATUS_NAME == null ? false : rows[i].STATUS_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].STATUS_NAME);
                    }

                    if (rows[i].ROLE_NAME == null ? false : rows[i].ROLE_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].ROLE_NAME);
                    }

                    if (rows[i].GROUP_NAME == null ? false : rows[i].GROUP_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].GROUP_NAME);
                    }

                    if (rows[i].OFFICE_NAME == null ? false : rows[i].OFFICE_NAME.toLowerCase().includes(search_string.toLowerCase())) {
                        SearchArray.push(rows[i].OFFICE_NAME);
                    }

                    itemsProcessed++;
                    if (itemsProcessed === rows.length) {
                        data = {};
                        data.searchResult = SearchArray;
                        data.searchResult = _.uniqBy(data.searchResult, _.lowerCase);

                        // res.send({
                        // 	"error": false,
                        // 	"status": "success",
                        // 	"data": data
                        // });
                        return callback(null, data);
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
        })
    });
}
exports.upComingRollOffTypehead = function (req, res) {
    var search_string = req.params.upCommingTypehead;
    var x = 2; //or whatever offset
    var CurrentDate = new Date();
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID WHERE PROJECT_PEOPLE.END_DATE < NOW()' + 'AND PROJECT_PEOPLE.END_DATE < CURDATE() + INTERVAL 60 DAY', function (err, rows) {
            // console.log('SELECT PROJECT_PEOPLE.*, CONCAT(STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME) AS STAFF_NAME, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME FROM PROJECT_PEOPLE INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID WHERE PROJECT_PEOPLE.END_DATE < NOW()' + 'AND PROJECT_PEOPLE.END_DATE < CURDATE() + INTERVAL 1 DAY)');
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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function dayCount(currentDate, startDate) {
    var date1 = new Date(currentDate);
    var date2 = new Date(startDate);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}