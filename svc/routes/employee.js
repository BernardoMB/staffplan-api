var MagicIncrement = require('magic-increment');
var async = require('async');
var _ = require('lodash');
var serialize = require('serialize-javascript');
var fs = require('fs');
var moment = require('moment');
var common = require('../common');

exports.getRole = function (req, res) {
	req.getConnection(function (err, connection) {
		var query = connection.query('SELECT * FROM STAFF_ROLE', function (err, rows) {
			if (err) {
				return res.send({
					"error": true,
					"status": "failed",
					"message": "Something went wrong"
				});
			}
			res.send({
				"error": false,
				"status": "success",
				"data": rows
			});
		});
	});
}

exports.getStaffList = function (req, res) {
	req.getConnection(function (err, connection) {
		var query = connection.query('SELECT STAFF_ID, CONCAT_WS(" ",  (CASE WHEN PREFERRED_NAME = "" THEN FIRST_NAME WHEN PREFERRED_NAME IS NULL THEN FIRST_NAME ELSE PREFERRED_NAME END), LAST_NAME) AS STAFF_NAME FROM STAFF', function (err, rows) {
			if (err) {
				return res.send({
					"error": true,
					"status": "failed",
					"message": "Something went wrong"
				});
			}
			res.send({
				"error": false,
				"status": "success",
				"data": rows
			});
		});
	});
}

exports.getPeopleProject = function (req, res) {
	var PeopleProjectID = req.params.PeopleProjectID;
	req.getConnection(function (err, connection) {
		var query = connection.query('SELECT PROJECT_PEOPLE.*, DATE_FORMAT(PROJECT_PEOPLE.START_DATE, "%Y-%m-%d") AS START_DATE,DATE_FORMAT(PROJECT_PEOPLE.END_DATE, "%Y-%m-%d") AS END_DATE, PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID, STAFF_ROLE.ROLE_NAME FROM PROJECT_PEOPLE INNER JOIN PROJECT ON PROJECT.PROJECT_ID = PROJECT_PEOPLE.PROJECT_ID INNER JOIN STAFF_ROLE ON STAFF_ROLE.ROLE_ID = PROJECT_PEOPLE.PROJECT_ROLE_ID WHERE STAFF_ID = "' + PeopleProjectID + '"', function (err, rows) {
			if (err) {
				return res.send({
					"error": true,
					"status": "failed",
					"message": "Something went wrong"
				});
			}
			res.send({
				"error": false,
				"status": "success",
				"data": rows
			});
		});
	});
}

exports.getEmployeeDetails = async function (req, res) {
	var EmployeeID = req.params.EmployeeID;
	req.getConnection(async function (err, connection) {
		var send_rows = {};
		var a = [];
		await connection.query('SELECT STAFF.*, STAFF_ROLE.ROLE_NAME, STAFF_GROUP.GROUP_NAME,STAFF_STATUS.STATUS_NAME, OFFICE.*,REGION.REGION_NAME FROM STAFF INNER JOIN STAFF_ROLE ON STAFF.STAFF_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_GROUP ON STAFF.STAFF_GROUP_ID = STAFF_GROUP.GROUP_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON STAFF.OFFICE_ID = OFFICE.OFFICE_ID INNER JOIN REGION ON OFFICE.REGION_ID = REGION.REGION_ID WHERE STAFF_ID = "' + EmployeeID + '"', async function (err, rows) {
			if (err) {
				return res.send({
					"error": true,
					"status": "failed",
					"message": "Something went wrong"
				});
			}
			if (rows.length > 0) {
				let ProTempObj = [];
				ProTempObj.ProInnerObj = {};
				ProTempObj.ProInnerObj = rows[0];
				await connection.query('SELECT PROJECT_PEOPLE.PROJECT_ID,PROJECT_PEOPLE.STAFF_ID,CUSTOMER_PROJECTS.CUSTOMER_ID FROM `PROJECT_PEOPLE` LEFT JOIN CUSTOMER_PROJECTS ON PROJECT_PEOPLE.PROJECT_ID = CUSTOMER_PROJECTS.PROJECT_ID WHERE STAFF_ID ="' + EmployeeID + '"', async function (err, empProData) {
					if (err) {
						return res.send({
							"error": true,
							"status": "failed",
							"message": "Something went wrong"
						});
					}

					if (empProData.length > 0) {
						var ProIdArry = [];
						var currentPeojectArray = [];
						var nextPeojectArray = [];
						var experiancenameList = [];
						var itemsProcessed = 0;
						var currentDate = new Date();
						var projectLength = empProData.length;
						empProData.map(async (element, index) => {
							await connection.query('SELECT PROJECT.*,PROJECT_STATUS.STATUS_NAME,PROJECT_TYPE.TYPE_NAME, OFFICE.*, REGION.REGION_NAME,CUSTOMER.*, PROJECT_PEOPLE.*,STAFF_ROLE.ROLE_NAME, CATEGORY.CATEGORY_NAME FROM `PROJECT` INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID LEFT JOIN OFFICE ON PROJECT.OFFICE_ID = OFFICE.OFFICE_ID LEFT JOIN REGION ON OFFICE.REGION_ID = REGION.REGION_ID INNER JOIN CUSTOMER ON CUSTOMER.CUSTOMER_ID = "' + element.CUSTOMER_ID + '" INNER JOIN PROJECT_PEOPLE ON PROJECT_PEOPLE.STAFF_ID = "' + element.STAFF_ID + '" INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID AND PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID WHERE PROJECT.PROJECT_ID ="' + element.PROJECT_ID + '"', async function (err, empProdatas) {
								// return;
								if (empProdatas.length > 0) {
									ProIdArry.push(empProdatas[0]);
									if (currentDate > empProdatas[0].START_DATE && currentDate < empProdatas[0].END_DATE) {
										currentPeojectArray.push(empProdatas[0]);
									}

									if (empProdatas[0].START_DATE > currentDate) {
										nextPeojectArray.push(empProdatas[0]);
									}

									var nameListArray = [];
									if(empProdatas[0].EXPERIENCE_ID === null){
										empProdatas[0].EXPERIENCE_ID = [];
										ProTempObj.ProInnerObj.PROJECT_DATA = ProIdArry;
										ProTempObj.ProInnerObj.CURRENT_PROJECT = currentPeojectArray;
										ProTempObj.ProInnerObj.NEXT_PROJECT = nextPeojectArray;
										empD(projectLength,index,ProTempObj.ProInnerObj, req, res, connection);
									} else {
										var withoutSquareBreckets = empProdatas[0].EXPERIENCE_ID.replace(/[\[\]']+/g, '');
										await connection.query('SELECT * FROM STAFF_EXPERIENCE WHERE EXPERIENCE_ID IN (' + withoutSquareBreckets + ')', function (err, data) {
											empProdatas[0].EXPERIENCE_ID = data;
											ProTempObj.ProInnerObj.PROJECT_DATA = ProIdArry;
											ProTempObj.ProInnerObj.CURRENT_PROJECT = currentPeojectArray;
											ProTempObj.ProInnerObj.NEXT_PROJECT = nextPeojectArray;
											empD(projectLength,index,ProTempObj.ProInnerObj, req, res, connection);
										});
									}
									
								} else {
									await connection.query('SELECT PROJECT_PEOPLE.PROJECT_ID,PROJECT_PEOPLE.STAFF_ID FROM `PROJECT_PEOPLE` WHERE STAFF_ID ="' + EmployeeID + '"', async function (err, empNewProData) {
										if (err) {
											return res.send({
												"error": true,
												"status": "failed",
												"message": "Something went wrong"
											});
										}
										if (empNewProData.length <= 0) {
											ProTempObj.ProInnerObj.PROJECT_DATA = [];
											empD(projectLength,index,ProTempObj.ProInnerObj, req, res, connection);
										} else {
											var ProIdArry = [];
											var currentPeojectArray = [];
											var nextPeojectArray = [];
											var itemsProcessed = 0;
											var currentDate = new Date();
											empNewProData.forEach(async element => {
												await connection.query('SELECT PROJECT.*,PROJECT_STATUS.STATUS_NAME,PROJECT_TYPE.TYPE_NAME, OFFICE.*, REGION.REGION_NAME, PROJECT_PEOPLE.*,STAFF_ROLE.ROLE_NAME, CATEGORY.CATEGORY_NAME FROM `PROJECT` INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN OFFICE ON PROJECT.OFFICE_ID = OFFICE.OFFICE_ID INNER JOIN REGION ON OFFICE.REGION_ID = REGION.REGION_ID INNER JOIN PROJECT_PEOPLE ON PROJECT_PEOPLE.STAFF_ID = "' + element.STAFF_ID + '" INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID AND PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID WHERE PROJECT.PROJECT_ID ="' + element.PROJECT_ID + '"', async function (err, empProdatas) {
													if (err) {
														return res.send({
															"error": true,
															"status": "failed",
															"message": "Something went wrong"
														});
													}
													if (empProdatas.length <= 0) {
														ProTempObj.ProInnerObj.PROJECT_DATA = [];
														ProTempObj.ProInnerObj.CURRENT_PROJECT = [];
														ProTempObj.ProInnerObj.NEXT_PROJECT = [];
														empD(projectLength,index,ProTempObj.ProInnerObj, req, res, connection);
													} else {
														ProIdArry.push(empProdatas[0]);
														if (currentDate > empProdatas[0].START_DATE && currentDate < empProdatas[0].END_DATE) {
															currentPeojectArray.push(empProdatas[0]);
														}

														if (empProdatas[0].START_DATE > currentDate) {
															nextPeojectArray.push(empProdatas[0]);
														}


														ProTempObj.ProInnerObj.PROJECT_DATA = ProIdArry;
														ProTempObj.ProInnerObj.CURRENT_PROJECT = currentPeojectArray;
														ProTempObj.ProInnerObj.NEXT_PROJECT = nextPeojectArray;
														empD(projectLength,index,ProTempObj.ProInnerObj, req, res, connection);

													}
												});
											});
										}

									});
								}
							});
						});
					} else {
						await connection.query('SELECT PROJECT_PEOPLE.PROJECT_ID,PROJECT_PEOPLE.STAFF_ID FROM `PROJECT_PEOPLE` WHERE STAFF_ID ="' + EmployeeID + '"', async function (err, empNewProData) {
							if (err) {
								return res.send({
									"error": true,
									"status": "failed",
									"message": "Something went wrong"
								});
							}
							if (empNewProData.length <= 0) {
								ProTempObj.ProInnerObj.PROJECT_DATA = [];
								ProTempObj.ProInnerObj.CURRENT_PROJECT = [];
								ProTempObj.ProInnerObj.NEXT_PROJECT = [];
								ProTempObj.ProInnerObj.TENURE = 0;
								ProTempObj.ProInnerObj.CERTIFICATION_NAME = 0;
								ProTempObj.ProInnerObj.IMAGEPATH = req.headers.host + '/assets/images/user-images/';;
								// empD(projectLength,1,ProTempObj.ProInnerObj, req, res, connection);
								return res.send({
									"error": false,
									"status": "success",
									"data": rows[0]
								});
							} else {
								var ProIdArry = [];
								var currentPeojectArray = [];
								var nextPeojectArray = [];
								var itemsProcessed = 0;
								var currentDate = new Date();
								empNewProData.forEach(async element => {
									
									await connection.query('SELECT PROJECT.*,PROJECT_STATUS.STATUS_NAME,PROJECT_TYPE.TYPE_NAME, OFFICE.*, REGION.REGION_NAME, PROJECT_PEOPLE.*,STAFF_ROLE.ROLE_NAME, CATEGORY.CATEGORY_NAME FROM `PROJECT` INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN PROJECT_TYPE ON PROJECT.PROJECT_TYPE_ID = PROJECT_TYPE.TYPE_ID INNER JOIN OFFICE ON PROJECT.OFFICE_ID = OFFICE.OFFICE_ID INNER JOIN REGION ON OFFICE.REGION_ID = REGION.REGION_ID INNER JOIN PROJECT_PEOPLE ON PROJECT_PEOPLE.STAFF_ID = "' + element.STAFF_ID + '" INNER JOIN CATEGORY ON PROJECT.CATEGORY_ID = CATEGORY.CATEGORY_ID AND PROJECT_PEOPLE.PROJECT_ID = "' + element.PROJECT_ID + '" INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID WHERE PROJECT.PROJECT_ID ="' + element.PROJECT_ID + '"', async function (err, empProdatas) {
										if (err) {
											return res.send({
												"error": true,
												"status": "failed",
												"message": "Something went wrong"
											});
										}
										if (empProdatas.length <= 0) {
											ProTempObj.ProInnerObj.PROJECT_DATA = [];
											ProTempObj.ProInnerObj.CURRENT_PROJECT = [];
											ProTempObj.ProInnerObj.NEXT_PROJECT = [];
											empD(projectLength,index,ProTempObj.ProInnerObj, req, res, connection);
										} else {
											ProIdArry.push(empProdatas[0]);
											if (currentDate > empProdatas[0].START_DATE && currentDate < empProdatas[0].END_DATE) {
												currentPeojectArray.push(empProdatas[0]);
											}

											if (empProdatas[0].START_DATE > currentDate) {
												nextPeojectArray.push(empProdatas[0]);
											}

											ProTempObj.ProInnerObj.PROJECT_DATA = ProIdArry;
											ProTempObj.ProInnerObj.CURRENT_PROJECT = currentPeojectArray;
											ProTempObj.ProInnerObj.NEXT_PROJECT = nextPeojectArray;
											empD(projectLength,index,ProTempObj.ProInnerObj, req, res, connection);

										}
									});
								});
							}
						});
					}
				});
			} else {
				return res.send({
					"error": true,
					"status": "failed",
					"message": "No record found."
				});
			}
		});
	});
};

const empD = async (projectLength,index,empDatas, req, res, connection) => {
	var Tenure = getTenure(empDatas.EMPLOYMENT_START_DATE);
	empDatas.TENURE = Tenure;
	let allData = empDatas;
	var tempCondition = 0;
	var projectList = [];
	if (!_.isEmpty(allData.PROJECT_DATA)) {
		allData.PROJECT_DATA.forEach(async element => {
			tempCondition++;
			var duration = dateToDays(element.START_DATE, element.END_DATE);
			var tempAssignment = calculateProjectAssignment(new Date(element.START_DATE), new Date(element.END_DATE));
			element.DURATION = duration;
			element.STAFF_ASSIGNMENT = tempAssignment;
			projectList.push(element);
			if (tempCondition === allData.PROJECT_DATA.length) {
				allData.PROJECT_DATA = projectList;
				empAD(projectLength,index,allData, req, res, connection);
			}
		});
	} else {
		empAD(projectLength,index,allData, req, res, connection);		
	}
}

empAD = async (projectLength,index,empallData, req, res, connection) => {
	await connection.query('SELECT STAFF_CERTIFICATION.*, CERTIFICATION_SKILLS.CERTIFICATION_NAME FROM STAFF_CERTIFICATION INNER JOIN CERTIFICATION_SKILLS ON STAFF_CERTIFICATION.CERTIFICATION_ID = CERTIFICATION_SKILLS.CERTIFICATION_ID WHERE STAFF_CERTIFICATION.STAFF_ID ="' + req.params.EmployeeID + '"', async function (err, certificationList) {
		if (err) {
			return res.send({
				"error": true,
				"status": "failed",
				"message": "Something went wrong"
			});
		} else {
			certificationList.forEach(element => {
				delete element.STAFF_ID;
			});
			empallData.CERTIFICATION_NAME = certificationList;
			empallData.IMAGEPATH = req.headers.host + '/assets/images/user-images/';
			if(projectLength === index + 1){
				return res.send({
					"error": false,
					"status": "success",
					"data": empallData
				});
			}
			
		}
	})
}
exports.getEmployeeTypehead = function (req, res) {

	req.getConnection(function (err, connection) {
		var search_string = req.params.employeeTypehead;
		var query = connection.query('SELECT STAFF.* , STAFF_STATUS.STATUS_NAME,STAFF_ROLE.ROLE_NAME,STAFF_GROUP.GROUP_NAME, OFFICE.OFFICE_NAME FROM STAFF INNER JOIN STAFF_ROLE ON STAFF.STAFF_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_GROUP ON STAFF.STAFF_GROUP_ID = STAFF_GROUP.GROUP_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON STAFF.OFFICE_ID = OFFICE.OFFICE_ID', function (err, rows) {
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

exports.getEmployeeList = function (req, res) {
	req.getConnection(function (err, connection) {
		async.waterfall([
			function (callback) {

				EMAIL_ID = req.body.EMAIL_ID;
				STATUS_NAME = req.body.STATUS_NAME;
				ROLE_NAME = req.body.ROLE_NAME;
				GROUP_NAME = req.body.GROUP_NAME;
				OFFICE_NAME = req.body.OFFICE_NAME;
				PREFERRED_NAME = req.body.PREFERRED_NAME;


				if (err) return next("Cannot Connect");
				var con = 'WHERE 1=1 ';
				if (req.body.EMAIL_ID) {
					var EMAIL_ID = req.body.EMAIL_ID;
					con = con + 'AND EMAIL_ID LIKE ' + "'%" + EMAIL_ID + "%'";
				}

				if (req.body.FIRST_NAME) {
					var FIRST_NAME = req.body.FIRST_NAME;
					con = con + 'AND FIRST_NAME LIKE ' + "'%" + FIRST_NAME + "%'";
				}

				if (req.body.MIDDLE_INITIAL) {
					var MIDDLE_INITIAL = req.body.MIDDLE_INITIAL;
					con = con + 'AND MIDDLE_INITIAL LIKE ' + "'%" + MIDDLE_INITIAL + "%'";
				}

				if (req.body.LAST_NAME) {
					var LAST_NAME = req.body.LAST_NAME;
					con = con + 'AND LAST_NAME LIKE ' + "'%" + LAST_NAME + "%'";
				}

				if (req.body.PREFERRED_NAME) {
					var PREFERRED_NAME = req.body.PREFERRED_NAME;
					con = con + 'AND PREFERRED_NAME LIKE ' + "'%" + PREFERRED_NAME + "%'";
				}

				if (req.body.STATUS_NAME) {
					var STATUS_NAME = req.body.STATUS_NAME;
					con = con + 'AND STATUS_NAME LIKE ' + "'%" + STATUS_NAME + "%'";
				}

				if (req.body.ROLE_NAME) {
					var ROLE_NAME = req.body.ROLE_NAME;
					con = con + 'AND ROLE_NAME LIKE ' + "'%" + ROLE_NAME + "%'";
				}

				if (req.body.GROUP_NAME) {
					var GROUP_NAME = req.body.GROUP_NAME;
					con = con + 'AND GROUP_NAME LIKE ' + "'%" + GROUP_NAME + "%'";
				}

				if (req.body.OFFICE_NAME) {
					var OFFICE_NAME = req.body.OFFICE_NAME;
					con = con + 'AND OFFICE_NAME LIKE ' + "'%" + OFFICE_NAME + "%'";
				}

				if(req.body.STAFF_TYPE){
					if(req.body.STAFF_TYPE === 'ADMIN'){
						con = con + 'AND STAFF_GROUP_ID = 2';
					} else {
						con = con + 'AND STAFF_GROUP_ID = 1';
					}
				}

				if(req.body.ONBENCH){
					var DBName = req.payload.DB;
					connection.query('SELECT *, CONCAT_WS(" ",  (CASE WHEN PREFERRED_NAME = "" THEN FIRST_NAME WHEN PREFERRED_NAME IS NULL THEN FIRST_NAME ELSE PREFERRED_NAME END), LAST_NAME) AS STAFF_NAME from '+ DBName +'.STAFF INNER JOIN STAFF_ROLE ON STAFF.STAFF_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_GROUP ON STAFF.STAFF_GROUP_ID = STAFF_GROUP.GROUP_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON STAFF.OFFICE_ID = OFFICE.OFFICE_ID Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE WHERE START_DATE <= NOW() AND END_DATE >= NOW())', function (err, StaffIDList) {
						if (StaffIDList.length < 1) {
							res.send({
								"error": false,
								"status": "success",
								"data": rows
							});
							return;
						} else {
							callback(null, StaffIDList);
						}
					})
				}

				if (req.body.ADVANCE_SEARCH) {
					var ADVANCE_SEARCH = req.body.ADVANCE_SEARCH;
					con = con + " AND (EMAIL_ID LIKE '%" + ADVANCE_SEARCH + "%' OR FIRST_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR MIDDLE_INITIAL LIKE '%" + ADVANCE_SEARCH + "%' OR LAST_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR PREFERRED_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR STATUS_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR ROLE_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR GROUP_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR OFFICE_NAME LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_1 LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_1_TYPE LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_2 LIKE '%" + ADVANCE_SEARCH + "%' OR PHONE_2_TYPE LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_CITY LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_STATE LIKE '%" + ADVANCE_SEARCH + "%' OR HOME_ZIP LIKE '%" + ADVANCE_SEARCH + "%' )";
				}
				if(!req.body.ONBENCH){
					var query = connection.query("SELECT STAFF.*, CONCAT_WS(' ',  (CASE WHEN PREFERRED_NAME = '' THEN FIRST_NAME WHEN PREFERRED_NAME IS NULL THEN FIRST_NAME ELSE PREFERRED_NAME END), LAST_NAME) AS STAFF_NAME , STAFF_STATUS.STATUS_NAME,STAFF_ROLE.ROLE_NAME,STAFF_GROUP.GROUP_NAME, OFFICE.OFFICE_NAME FROM STAFF INNER JOIN STAFF_ROLE ON STAFF.STAFF_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN STAFF_GROUP ON STAFF.STAFF_GROUP_ID = STAFF_GROUP.GROUP_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON STAFF.OFFICE_ID = OFFICE.OFFICE_ID " + con, function (err, rows) {
						if (err) {
							return res.send({
								"error": true,
								"status": "failed",
								"message": "Something went wrong"
							});
						}

						//if user not found
						if (rows.length < 1) {
							return res.send({
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
			}
		], function (err, result) {
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
					"data": result
				});
			}
		});
	})
}

exports.uploadimage = function (req, res) {
	req.getConnection(function (err, connection) {
		var query = connection.query("SELECT * FROM STAFF WHERE STAFF_ID = '" + req.params.id + "'", function (err, rows) {
			if (err) {
				return res.send({
					"error": true,
					"status": "failed",
					"message": "Something went wrong"
				});
			} else {
				var tempObj = {};
				tempObj.STAFF_PHOTO = req.file.filename;

				var query = connection.query("UPDATE STAFF set ? WHERE STAFF_ID = ? ", [tempObj, req.params.id], function (err, result) {
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
							"message": "Image uploaded success"
						});
					}
				});
			}
		});
	});
};

exports.addStaff = function (req, res) {
	var data = req.body;
	if(req.body.PREFERRED_NAME === ''){
		req.body.PREFERRED_NAME = null
	}
	req.getConnection(function (err, connection) {
		var queryGetLastId = connection.query('SELECT STAFF_ID FROM STAFF ORDER BY STAFF_ID DESC LIMIT 1;', function (err, rows) {
			if (err) {
				return res.send({
					"error": true,
					"status": "failed",
					"message": "Something went wrong"
				});
			} else {
				var forIncrement = MagicIncrement.inc(rows[0].STAFF_ID);
				data.STAFF_ID = forIncrement;
				var insertStaff = connection.query("INSERT INTO STAFF set ? ", data, function (err, insertStaffData) {
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
							"message": "Staff added success",
							"STAFF_ID": data.STAFF_ID
						});
					}
				});
			}
		});
	});
}

exports.updateStaff = function (req, res) {
	var updateStaffID = req.params.staffID;
	var data = req.body;
	if (_.isEmpty(data)) {
		res.send({
			"error": "false",
			"status": "success",
			"message": "Staff update success",
			"STAFF_ID": updateStaffID
		});
	} else {
		req.getConnection(function (err, connection) {
			var updateStaffQuery = connection.query("UPDATE STAFF set ? WHERE STAFF_ID = ? ", [data, updateStaffID], function (err, updateStaffQueryData) {
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
						"message": "Staff update success",
						"STAFF_ID": updateStaffID
					});
				}
			});
		});
	}
}

exports.addStaffCertificationSkill = function (req, res) {
	req.getConnection(function (err, connection) {
		var data = {};
		data.CERTIFICATION_NAME = req.body.CERTIFICATION_SKILL;
		var query = connection.query("INSERT INTO CERTIFICATION_SKILLS set ? ", data, function (err, rows) {
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
					"message": "Certification skill added success"
				});
			}
		});
	});
}

exports.addStaffCertification = function (req, res) {
	req.getConnection(function (err, connection) {
		var reqData = req.body;
		async.waterfall([
			function (callback) {
				if (reqData.newSkill) {
					var tempObj = {};
					var lastestIDs = [];
					var tempCondition = 0;
					reqData.newSkill.forEach(element => {
						tempObj.CERTIFICATION_NAME = element;
						var query = connection.query("INSERT INTO CERTIFICATION_SKILLS set ? ", tempObj, function (err, rows) {
							if (err) {
								return res.send({
									"error": true,
									"status": "failed",
									"message": "Something went wrong"
								});
							} else {
								tempCondition++;
								if(reqData.oldSkill){
									reqData.oldSkill.push(rows.insertId);
									if (tempCondition === reqData.newSkill.length) {
										callback(null, reqData.oldSkill);
									}
								} else {
									
									lastestIDs.push(rows.insertId);
									if (tempCondition === reqData.newSkill.length) {
										callback(null, lastestIDs);
									}
								}
							}
						});
					});
				} else {
					let staffCertification = {};
					let duplicateArray = [];
					let tempCondition = 0;
					reqData.oldSkill.forEach(element => {
						staffCertification.STAFF_ID = req.body.STAFF_ID;
						staffCertification.CERTIFICATION_ID = element;
						var query = connection.query("INSERT INTO STAFF_CERTIFICATION set ? ", staffCertification, function (err, rows) {
							if (err) {
								duplicateArray.push(element);
								tempCondition++;
								if (tempCondition === reqData.oldSkill.length) {
									res.send({
										"error": false,
										"status": "success",
										"message": "Certification Inserted successfully"
									});
								}
							} else {
								tempCondition++;
								if (tempCondition === reqData.oldSkill.length) {
									res.send({
										"error": false,
										"status": "success",
										"message": "Certification Inserted successfully"
									});
								}
							}
						});
					});
				}
			},
			function (insertedData, callback) {
				let staffCertification = {};
				var tempCondition = 0;
				let duplicateArray = [];
				insertedData.forEach(element => {
					staffCertification.STAFF_ID = req.body.STAFF_ID;
					staffCertification.CERTIFICATION_ID = element;
					var query = connection.query("INSERT INTO STAFF_CERTIFICATION set ? ", staffCertification, function (err, rows) {
						if (err) {
							duplicateArray.push(element);
							tempCondition++;
							if (tempCondition === reqData.newSkill.length) {
								callback(null, duplicateArray);
							}
						} else {
							tempCondition++;
							if (tempCondition === reqData.newSkill.length) {
								callback(null, duplicateArray);
							}
						}
					});
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
					"message": "Certification Inserted successfully"
				});
			}
		});
	});
}

exports.deleteStaffCertification = function(req,res){
		var certificationDeleteData = req.body.data;
		var tempCondition = 0;
		req.getConnection(function (err, connection) {
			certificationDeleteData.forEach(element => {
			tempCondition++;
			var query = connection.query('DELETE FROM `STAFF_CERTIFICATION` WHERE STAFF_ID = "'+ element.STAFF_ID + '" AND CERTIFICATION_ID = "'+ element.CERTIFICATION_ID + '"', function (err, certificationList) {
				if (err) {
					return res.send({
						"error": true,
						"status": "failed",
						"message": "Something went wrong"
					});
				} else {
					if(tempCondition === certificationDeleteData.length){
						res.send({
							"error": false,
							"status": "success",
							"message": "Staff certification deleted successfully"
						});
					}
				}
			});
		});
	})
}

exports.getStaffCertification = function (req, res) {
	var staffID = req.params.staffID;
	req.getConnection(function (err, connection) {
		var query = connection.query('SELECT STAFF_CERTIFICATION.*, CERTIFICATION_SKILLS.CERTIFICATION_NAME FROM STAFF_CERTIFICATION INNER JOIN CERTIFICATION_SKILLS ON STAFF_CERTIFICATION.CERTIFICATION_ID = CERTIFICATION_SKILLS.CERTIFICATION_ID WHERE STAFF_CERTIFICATION.STAFF_ID ="' + staffID + '"', function (err, certificationList) {
			if (err) {
				return res.send({
					"error": true,
					"status": "failed",
					"message": "Something went wrong"
				});
			} else {
				certificationList.forEach(element => {
					delete element.STAFF_ID;
				});
				res.send({
					"error": false,
					"status": "success",
					"data": certificationList
				});
			}
		})
	})
}

// exports.addStaffExperience = function (req, res) {
// 	let reqData = req.body.data;
// 	let tempGlobal = [];
// 	let tempGlobal1 = [];

// 	function insertExperianc(element, newExp, connection) {
// 		return new Promise((resolve, reject) => {
// 			var query = connection.query('SELECT EXPERIENCE_ID FROM STAFF_EXPERIENCE WHERE EXPERIENCE_LABEL= "' + newExp.EXPERIENCE_LABEL + '"', async function (err, existExp) {
// 				if (!_.isEmpty(existExp)) {
// 					if(element.OLD_EXPERIENCE){
// 						element.OLD_EXPERIENCE.push(existExp[0].EXPERIENCE_ID);
// 						tempGlobal1 = element;
// 						tempGlobal.push(tempGlobal1);
// 						resolve();
// 					} else {
// 						let tempExperience = {};
// 						tempExperience.EXPERIENCE_LABEL = newExp.EXPERIENCE_LABEL;
// 						await insertExperianc2(element, connection, tempExperience);
// 						resolve();	
// 					}
// 				} else {
// 					let tempExperience = {};
// 					tempExperience.EXPERIENCE_LABEL = newExp.EXPERIENCE_LABEL;
// 					await insertExperianc2(element, connection, tempExperience);
// 					resolve();
// 				}
// 			})
// 		})
// 	}

// 	function insertExperianc2(element, connection, tempExperience) {
// 		return new Promise((resolve, reject) => {
// 			var query = connection.query("INSERT INTO STAFF_EXPERIENCE set ? ", tempExperience, function (err, rows) {
// 				if (err) {
// 					return res.send({
// 						"error": true,
// 						"status": "failed",
// 						"message": "Something went wrong"
// 					});
// 				} else {
// 					if(element.OLD_EXPERIENCE){
// 						element.OLD_EXPERIENCE.push(rows.insertId);
// 						tempGlobal1 = element;
// 						tempGlobal.push(tempGlobal1);
// 						resolve();
// 					} else {
// 						res.send({
// 							"error": false,
// 							"status": "success",
// 							"message": "Experiance added successfully"
// 						});
// 					}
// 				}
// 			});
// 		})
// 	}

// 	req.getConnection(async function (err, connection) {
// 		let tempObj = {};
// 		let tempCondition = 0;
// 		for (const element of reqData) {
// 			tempCondition++;
// 			if (element.NEW_EXPERIENCE) {
// 				for (const newExp of element.NEW_EXPERIENCE) {
// 					let temp2 = await insertExperianc(element, newExp, connection);
// 				}
// 				if (tempGlobal) {
// 					tempGlobal.forEach(element => {
// 						tempObj.EXPERIENCE_ID = serialize(element.OLD_EXPERIENCE);
// 						var updateStaffQuery = connection.query("UPDATE PROJECT_PEOPLE set ? WHERE STAFF_ID = ? AND PROJECT_ID = ?", [tempObj, element.STAFF_ID, element.PROJECT_ID], function (err, updateStaffQueryData) {
// 							if (err) {
// 								return res.send({
// 									"error": true,
// 									"status": "failed",
// 									"message": "Something went wrong"
// 								});
// 							}
// 							if (tempCondition === reqData.length) {
// 								res.send({
// 									"error": false,
// 									"status": "success",
// 									"message": "Experiance added successfully"
// 								});
// 							}

// 						})
// 					});
// 				}
// 			} else {
// 				var idArray = [];
// 				if(element.OLD_EXPERIENCE){
// 					idArray.push(element.OLD_EXPERIENCE);
// 					tempObj.EXPERIENCE_ID = serialize(element.OLD_EXPERIENCE);
// 					var updateStaffQuery = connection.query("UPDATE PROJECT_PEOPLE set ? WHERE STAFF_ID = ? AND PROJECT_ID = ?", [tempObj, element.STAFF_ID, element.PROJECT_ID], function (err, updateStaffQueryData) {
// 						if (err) {
// 							return res.send({
// 								"error": true,
// 								"status": "failed",
// 								"message": "Something went wrong"
// 							});
// 						}
// 						if (tempCondition === reqData.length) {
// 							res.send({
// 								"error": false,
// 								"status": "success",
// 								"message": "Experiance added successfully"
// 							});
// 						}

// 					});
// 				}
// 			}
// 		}

// 	})
// };


exports.addStaffExperience = function (req, res) {
	let reqData = req.body.data;
	let tempGlobal = [];
	let tempGlobal1 = [];

	function insertExperianc(element, newExp, connection) {
		return new Promise((resolve, reject) => {
			var query = connection.query('SELECT EXPERIENCE_ID FROM STAFF_EXPERIENCE WHERE EXPERIENCE_LABEL= "' + newExp.EXPERIENCE_LABEL + '"', async function (err, existExp) {
				if (!_.isEmpty(existExp)) {
					element.OLD_EXPERIENCE.push(existExp[0].EXPERIENCE_ID);
					tempGlobal1 = element;
					tempGlobal.push(tempGlobal1);
					resolve();
				} else {
					let tempExperience = {};
					tempExperience.EXPERIENCE_LABEL = newExp.EXPERIENCE_LABEL;
					await insertExperianc2(element, connection, tempExperience);
					resolve();
				}
			})
		})
	}

	function insertExperianc2(element, connection, tempExperience) {
		return new Promise((resolve, reject) => {
			var query = connection.query("INSERT INTO STAFF_EXPERIENCE set ? ", tempExperience, function (err, rows) {
				if (err) {
					return res.send({
						"error": true,
						"status": "failed",
						"message": "Something went wrong"
					});
				} else {
					element.OLD_EXPERIENCE.push(rows.insertId);
					tempGlobal1 = element;
					tempGlobal.push(tempGlobal1);
					resolve();
				}
			});
		})
	}

	req.getConnection(async function (err, connection) {
		let tempObj = {};
		let tempCondition = 0;
		for (const element of reqData) {
			tempCondition++;
			if(!element.NEW_EXPERIENCE && !element.OLD_EXPERIENCE){
				var blankValue = {};
				blankValue.EXPERIENCE_ID = [];
				var updateStaffQuery = connection.query("UPDATE PROJECT_PEOPLE set EXPERIENCE_ID = '' WHERE STAFF_ID = '" + element.STAFF_ID + "' AND PROJECT_ID = '" + element.PROJECT_ID + "'", function (err, updateStaffQueryData) {
					if (err) {
						return res.send({
							"error": true,
							"status": "failed",
							"message": "Something went wrongsss"
						});
					}
					if (tempCondition === reqData.length) {
						res.send({
							"error": false,
							"status": "success",
							"message": "Experiance added successfully"
						});
					}

				})
			} else if (element.NEW_EXPERIENCE) {
				for (const newExp of element.NEW_EXPERIENCE) {
					let temp2 = await insertExperianc(element, newExp, connection);
				}
				if (tempGlobal) {
					tempGlobal.forEach(element => {
						tempObj.EXPERIENCE_ID = serialize(element.OLD_EXPERIENCE);
						var updateStaffQuery = connection.query("UPDATE PROJECT_PEOPLE set ? WHERE STAFF_ID = ? AND PROJECT_ID = ?", [tempObj, element.STAFF_ID, element.PROJECT_ID], function (err, updateStaffQueryData) {
							if (err) {
								return res.send({
									"error": true,
									"status": "failed",
									"message": "Something went wrong"
								});
							}
							if (tempCondition === reqData.length) {
								res.send({
									"error": false,
									"status": "success",
									"message": "Experiance added successfully"
								});
							}

						})
					});
				}
			} else {
				var idArray = [];
				idArray.push(element.OLD_EXPERIENCE);
				tempObj.EXPERIENCE_ID = serialize(element.OLD_EXPERIENCE);
				var updateStaffQuery = connection.query("UPDATE PROJECT_PEOPLE set ? WHERE STAFF_ID = ? AND PROJECT_ID = ?", [tempObj, element.STAFF_ID, element.PROJECT_ID], function (err, updateStaffQueryData) {
					if (err) {
						return res.send({
							"error": true,
							"status": "failed",
							"message": "Something went wrong"
						});
					}
					if (tempCondition === reqData.length) {
						res.send({
							"error": false,
							"status": "success",
							"message": "Experiance added successfully"
						});
					}

				});
			}
		}

	})
};




function getTenure(employementDate) {
	var tempCurrentDate = new Date();
	var date2 = new Date(employementDate);
	var timeDiff = Math.abs(date2.getTime() - tempCurrentDate);
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	var totalYear = diffDays / 365;
	var yearReminder = diffDays % 365;
	var totalMonth = 0;
	var Duration = '';
	if (yearReminder >= 0) {
		totalMonth = yearReminder / 30;
		var monthReminder = diffDays % 30;
		if (Math.trunc(totalMonth) === 12) {
			totalMonth = 0;
			totalYear = 1;
		}
	} else {
		totalMonth = diffDays / 30;
		var monthReminder = diffDays % 30;
	}

	if (Math.trunc(totalYear) > 0) {
		Duration += Math.trunc(totalYear) + ' Years ';
	}

	if (Math.trunc(totalMonth) > 0) {
		Duration += Math.trunc(totalMonth) + ' Months ';
	}

	if (monthReminder > 0) {
		Duration += monthReminder + ' Days ';
	}
	return Duration;
}

function dateToDays(startDate, endDate) {
	var tempCurrentDate = new Date(startDate);
	var date2 = new Date(endDate);
	var timeDiff = Math.abs(date2.getTime() - tempCurrentDate);
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	var totalYear = diffDays / 365;
	var yearReminder = diffDays % 365;
	var totalMonth = 0;
	var Duration = '';
	if (yearReminder >= 0) {
		totalMonth = yearReminder / 30;
		var monthReminder = diffDays % 30;
		if (Math.trunc(totalMonth) === 12) {
			totalMonth = 0;
			totalYear = 1;
		}
	} else {
		totalMonth = diffDays / 30;
		var monthReminder = diffDays % 30;
	}

	if (Math.trunc(totalYear) > 0) {
		Duration += Math.trunc(totalYear) + ' Years ';
	}

	if (Math.trunc(totalMonth) > 0) {
		Duration += Math.trunc(totalMonth) + ' Months ';
	}

	if (monthReminder > 0) {
		Duration += monthReminder + ' Days ';
	}
	return Duration;
}

function calculateProjectAssignment(StartDate, EndDate) {
	var TodayDate = new Date();
	var ProjectAssignment = '';
	if (TodayDate < StartDate) {
		ProjectAssignment = 'Planned';
	} else if (TodayDate >= StartDate && TodayDate <= EndDate) {
		ProjectAssignment = 'Active';
	} else if(TodayDate > EndDate) {
		ProjectAssignment = 'Inactive';
	}
	return ProjectAssignment;
}


async function getExperiancenameFunction(connection, experianceIds) {
	var withoutSquareBreckets = experianceIds.replace(/[\[\]']+/g, '');
	var blackArray = [];
	var query = await connection.query('SELECT * FROM STAFF_EXPERIENCE WHERE EXPERIENCE_ID IN (' + withoutSquareBreckets + ')', function (err, experianceList) {
		if (err) {
			return blackArray;
		} else {
			return experianceList;
		}
	})
}




exports.getAvailableStaff = function(req,res){
	var DBName = req.payload.DB;
	var staffIdArray = [];
	var currentDate  = new Date();
	req.getConnection(function (err, connection) {

		if(req.body.EMPTY){
			async.waterfall([
				function (callback) {
					// connection.query('SELECT STAFF_ID from '+ DBName +'.STAFF Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE)', function (err, StaffIDList) {
					connection.query('SELECT * FROM '+ DBName +'.PROJECT_PEOPLE', function (err, StaffIDList) {
						if (err) {
							callback(null, 'OPS count not found');
						} else {
							return;
							StaffIDList.forEach(element => {
								staffIdArray.push('"' + element.STAFF_ID + '"');
							});
							callback(null, staffIdArray);
						}
					})
				},function(data,callback){
					connection.query('SELECT STAFF_ID FROM ( SELECT SUM(ALLOCATION) AS ALLOCATION,STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE GROUP BY STAFF_ID) AS ALLOCATION_COUNT WHERE ALLOCATION <= 70', function (err, StaffIDList) {
						if (err) {
							callback(null, err);
						} else {
							StaffIDList.forEach(element => {
								data.push('"' + element.STAFF_ID + '"');
							});
							callback(null, data);
						}
					})
				},function(data,callback){
					connection.query('SELECT STAFF.*, CONCAT_WS(" ",  (CASE WHEN PREFERRED_NAME = "" THEN FIRST_NAME WHEN PREFERRED_NAME IS NULL THEN FIRST_NAME ELSE PREFERRED_NAME END), LAST_NAME) AS STAFF_NAME, STAFF_ROLE.ROLE_NAME FROM STAFF LEFT JOIN STAFF_ROLE ON STAFF_ROLE.ROLE_ID = STAFF.STAFF_ROLE_ID WHERE STAFF_ID in(' + data + ')', function (err, StaffIDList) {
						if (err) {
							callback(null, err);
						} else {
							StaffIDList.forEach(element => {
								element.ALLOCATION_TOTAL = 0;
								element.NEXT_AVAILABLE = currentDate;
								element.IMAGEPATH = req.headers.host + '/assets/images/user-images/';
							});
							callback(null, StaffIDList);
						}
					});
				}],function(err,result){
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
		} else if(req.body.ROLE_ID && !req.body.START_DATE && !req.body.END_DATE){
			async.waterfall([
				function (callback) {
					connection.query('SELECT STAFF_ID from '+ DBName +'.STAFF Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE)', function (err, StaffIDList) {
						if (err) {
							callback(null, 'OPS count not found');
						} else {
							StaffIDList.forEach(element => {
								staffIdArray.push('"' + element.STAFF_ID + '"');
							});
							callback(null, staffIdArray);
						}
					})
				},function(data,callback){
					connection.query('SELECT STAFF_ID FROM ( SELECT SUM(ALLOCATION) AS ALLOCATION,STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE ) AS ALLOCATION_COUNT WHERE ALLOCATION <= 70', function (err, StaffIDList) {
						if (err) {
							callback(null, err);
						} else {
							StaffIDList.forEach(element => {
								data.push('"' + element.STAFF_ID + '"');
							});
							callback(null, data);
						}
					})
				},function(data,callback){
					connection.query('SELECT STAFF.*, CONCAT_WS(" ",  (CASE WHEN PREFERRED_NAME = "" THEN FIRST_NAME WHEN PREFERRED_NAME IS NULL THEN FIRST_NAME ELSE PREFERRED_NAME END), LAST_NAME) AS STAFF_NAME, STAFF_ROLE.ROLE_NAME, ANY_VALUE(PROJECT_PEOPLE.END_DATE) AS NEXT_AVAILABLE,(SELECT SUM(ALLOCATION) as ALLOCATION_TOTAL FROM PROJECT_PEOPLE WHERE PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID GROUP BY PROJECT_PEOPLE.STAFF_ID) as ALLOCATION_TOTAL  FROM STAFF LEFT JOIN STAFF_ROLE ON STAFF_ROLE.ROLE_ID = STAFF.STAFF_ROLE_ID  LEFT JOIN PROJECT_PEOPLE ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID  WHERE STAFF_ROLE.ROLE_ID = "' + req.body.ROLE_ID + '" AND STAFF.STAFF_ID in(' + data + ') GROUP BY STAFF.STAFF_ID', function (err, StaffIDList) {
						if (err) {
							callback(null, err);
						} else {
							StaffIDList.forEach(element => {
                                if(element.ALLOCATION_TOTAL === null){
                                    element.ALLOCATION_TOTAL = 0;
                                }
								if(element.NEXT_AVAILABLE === null){
									element.NEXT_AVAILABLE = currentDate;
								} else {
									element.NEXT_AVAILABLE = element.END_DATE;
								}
								element.IMAGEPATH = req.headers.host + '/assets/images/user-images/';
							});
							callback(null, StaffIDList);
						}
					});
				}
			],function(err,result){
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
		} else if(req.body.ROLE_ID && req.body.START_DATE && req.body.END_DATE){
			async.waterfall([
				function (callback) {
					connection.query('SELECT STAFF_ID from '+ DBName +'.STAFF Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE)', function (err, StaffIDList) {
						if (err) {
							callback(null, 'OPS count not found');
						} else {
							StaffIDList.forEach(element => {
								staffIdArray.push('"' + element.STAFF_ID + '"');
							});
							callback(null, staffIdArray);
						}
					})
				},function(data,callback){
					connection.query('SELECT STAFF_ID FROM ( SELECT SUM(ALLOCATION) AS ALLOCATION,STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE  WHERE START_DATE >= "'+ req.body.START_DATE +'" AND END_DATE <= "'+ req.body.END_DATE +'" GROUP BY STAFF_ID  ) AS ALLOCATION_COUNT WHERE ALLOCATION <= 70', function (err, StaffIDList) {
						if (err) {
							callback(null, err);
						} else {
							StaffIDList.forEach(element => {
								data.push('"' + element.STAFF_ID + '"');
							});
							callback(null, data);
						}
					})
				},function(data,callback){
					connection.query('SELECT STAFF.*, CONCAT_WS(" ",  (CASE WHEN PREFERRED_NAME = "" THEN FIRST_NAME WHEN PREFERRED_NAME IS NULL THEN FIRST_NAME ELSE PREFERRED_NAME END),LAST_NAME) AS STAFF_NAME, STAFF_ROLE.ROLE_NAME,ANY_VALUE(PROJECT_PEOPLE.END_DATE)  AS NEXT_AVAILABLE, (SELECT SUM(ALLOCATION) as ALLOCATION_TOTAL FROM PROJECT_PEOPLE WHERE PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID  GROUP BY PROJECT_PEOPLE.STAFF_ID) as ALLOCATION_TOTAL FROM STAFF LEFT JOIN STAFF_ROLE ON STAFF_ROLE.ROLE_ID = STAFF.STAFF_ROLE_ID  LEFT JOIN PROJECT_PEOPLE ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID  WHERE STAFF_ROLE.ROLE_ID = "' + req.body.ROLE_ID + '" AND STAFF.STAFF_ID in(' + data + ') GROUP BY STAFF.STAFF_ID', function (err, StaffIDList) {
						if (err) {
							callback(null, err);
						} else {
							StaffIDList.forEach(element => {
								if(element.ALLOCATION_TOTAL === null){
									element.ALLOCATION_TOTAL = 0;
								}
								if(element.NEXT_AVAILABLE === null){
									element.NEXT_AVAILABLE = currentDate;
								} else {
									element.NEXT_AVAILABLE = element.NEXT_AVAILABLE;
								}
								element.IMAGEPATH = req.headers.host + '/assets/images/user-images/';
							});
							callback(null, StaffIDList);
						}
					});
				}],function(err,result){
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
		// async.waterfall([
        //     function (callback) {
		// 		connection.query('SELECT STAFF_ID from '+ DBName +'.STAFF Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE)', function (err, StaffIDList) {
		// 			if (err) {
		// 				callback(null, 'OPS count not found');
		// 			} else {
		// 				StaffIDList.forEach(element => {
		// 					staffIdArray.push('"' + element.STAFF_ID + '"');
		// 				});
		// 				callback(null, staffIdArray);
		// 			}
		// 		})
		// 	},function(data,callback){
		// 		connection.query('SELECT STAFF_ID FROM ( SELECT SUM(ALLOCATION) AS ALLOCATION,STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE WHERE START_DATE >= "'+ req.body.START_DATE +'" AND END_DATE <= "'+ req.body.END_DATE +'" GROUP BY STAFF_ID ) AS ALLOCATION_COUNT WHERE ALLOCATION <= 70', function (err, StaffIDList) {
		// 			if (err) {
		// 				callback(null, err);
		// 			} else {
		// 				StaffIDList.forEach(element => {
		// 					data.push('"' + element.STAFF_ID + '"');
		// 				});
		// 				callback(null, data);
		// 			}
		// 		})
		// 	},function(data,callback){
		// 		connection.query('SELECT STAFF.*, CONCAT_WS(" ",  (CASE WHEN PREFERRED_NAME = "" THEN FIRST_NAME WHEN PREFERRED_NAME IS NULL THEN FIRST_NAME ELSE PREFERRED_NAME END), MIDDLE_INITIAL,LAST_NAME) AS STAFF_NAME, STAFF_ROLE.ROLE_NAME FROM STAFF LEFT JOIN STAFF_ROLE ON STAFF_ROLE.ROLE_ID = STAFF.STAFF_ROLE_ID WHERE STAFF_ROLE.ROLE_ID = "' + req.body.STAFF_ROLE_ID + '" AND STAFF_ID in(' + data + ')', function (err, StaffIDList) {
		// 			if (err) {
		// 				callback(null, err);
		// 			} else {
		// 				StaffIDList.forEach(element => {
		// 					element.IMAGEPATH = req.headers.host + '/assets/images/user-images/';
		// 				});
		// 				callback(null, StaffIDList);
		// 			}
		// 		});
		// 	}
		// ],function(err,result){
		// 	if (err) {
        //         return res.send({
        //             "error": true,
        //             "status": "failed",
        //             "message": "Something went wrong"
        //         });
        //     } else {
        //         res.send({
        //             "error": false,
        //             "status": "success",
        //             "data": result
        //         });
        //     }
		// })
	})
}
exports.getAvailableStaff2 = function(req,res){
	var DBName = req.payload.DB;
	var staffIdArray = [];
	var currentDate  = moment().format('YYYY-MM-DD');
	req.getConnection(function (err, connection) {
	let staffAllocationArray = [];
	var tempQueryStaff = ' AND 1 = 1';
	var tempQueryProject = ' AND 1 = 1';
		if(req.body.EMPTY){
			async.waterfall([
				function (callback) {
					connection.query('SELECT STAFF_ID,CONCAT_WS(" ",  (CASE WHEN STAFF.PREFERRED_NAME = "" THEN STAFF.FIRST_NAME WHEN STAFF.PREFERRED_NAME IS NULL THEN STAFF.FIRST_NAME ELSE STAFF.PREFERRED_NAME END),STAFF.LAST_NAME) AS STAFF_NAME from '+ DBName +'.STAFF Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE)', function (err, StaffIDList) {
						if (err) {
							callback(null, 'Something went wrong');
						} else {
							StaffIDList.forEach(element => {
								staffAllocationArray.push({
									START_DATE: moment().format('YYYY-MM-DD'),
									END_DATE : null,
									ALLOCATION : 0,
									STAFF_ID : element.STAFF_ID,
									STAFF_NAME : element.STAFF_NAME,
								});
							});
							callback(null, staffIdArray);
						}
					})
				},function(data,callback){
					connection.query('SELECT PROJECT_PEOPLE.*,CONCAT_WS(" ",  (CASE WHEN STAFF.PREFERRED_NAME = "" THEN STAFF.FIRST_NAME WHEN STAFF.PREFERRED_NAME IS NULL THEN STAFF.FIRST_NAME ELSE STAFF.PREFERRED_NAME END),STAFF.LAST_NAME) AS STAFF_NAME FROM '+ DBName +'.PROJECT_PEOPLE INNER JOIN STAFF ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE START_DATE >= "' + currentDate + '"', function (err, StaffIDList) {
						if (err) {
							callback(null, 'Something went wrong');
						} else {
							const groupBystafId = _.groupBy(StaffIDList, 'STAFF_ID');
							const arrOfGroups = Object.values(groupBystafId);
							const resultArr = [];
							for(let i=0; i<arrOfGroups.length; i++) {
								staffAllocationArray = [...staffAllocationArray, ...common.getDurationViseAllocationByStaffID(arrOfGroups[i])];
							}
							callback(null, staffAllocationArray);
						}
					})
					
				}],function(err,result){
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
		} else if (req.body.ROLE_ID && !req.body.START_DATE && !req.body.END_DATE) {
			async.waterfall([
				function (callback) {
					connection.query('SELECT *,CONCAT_WS(" ",  (CASE WHEN STAFF.PREFERRED_NAME = "" THEN STAFF.FIRST_NAME WHEN STAFF.PREFERRED_NAME IS NULL THEN STAFF.FIRST_NAME ELSE STAFF.PREFERRED_NAME END),STAFF.LAST_NAME) AS STAFF_NAME from '+ DBName +'.STAFF Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE) AND STAFF.STAFF_ROLE_ID = "' + req.body.ROLE_ID + '"' , function (err, StaffIDList) {
						if (err) {
							callback(null, 'Something went wrong');
						} else {
							StaffIDList.forEach(element => {
								staffAllocationArray.push({
									START_DATE: moment().format('YYYY-MM-DD'),
									END_DATE : null,
									ALLOCATION : 0,
									STAFF_ID : element.STAFF_ID,
									STAFF_NAME : element.STAFF_NAME,
									ROLE_ID: element.STAFF_ROLE_ID,
								});
							});
							callback(null, staffIdArray);
						}
					})
				},function(data,callback){
					connection.query('SELECT PROJECT_PEOPLE.*,CONCAT_WS(" ",  (CASE WHEN STAFF.PREFERRED_NAME = "" THEN STAFF.FIRST_NAME WHEN STAFF.PREFERRED_NAME IS NULL THEN STAFF.FIRST_NAME ELSE STAFF.PREFERRED_NAME END),STAFF.LAST_NAME) AS STAFF_NAME FROM '+ DBName +'.PROJECT_PEOPLE INNER JOIN STAFF ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE START_DATE >= "' + currentDate + '" AND PROJECT_ROLE_ID = "' + req.body.ROLE_ID + '"', function (err, StaffIDList) {
						if (err) {
							callback(null, 'Something went wrong');
						} else {
							const groupBystafId = _.groupBy(StaffIDList, 'STAFF_ID');
							const arrOfGroups = Object.values(groupBystafId);
							const resultArr = [];
							for(let i=0; i<arrOfGroups.length; i++) {
								staffAllocationArray = [...staffAllocationArray, ...common.getDurationViseAllocationByStaffID(arrOfGroups[i])];
							}
							callback(null, staffAllocationArray);
						}
					})
					
				}],function(err,result){
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
		} else if (req.body.START_DATE && req.body.END_DATE) {
			if(req.body.ROLE_ID){
				tempQueryStaff = ' AND STAFF_ROLE_ID = "' + req.body.ROLE_ID + '"';
				tempQueryProject = ' AND PROJECT_ROLE_ID = "' + req.body.ROLE_ID + '"';
			}
			async.waterfall([
				function (callback) {
					connection.query('SELECT *,CONCAT_WS(" ",  (CASE WHEN STAFF.PREFERRED_NAME = "" THEN STAFF.FIRST_NAME WHEN STAFF.PREFERRED_NAME IS NULL THEN STAFF.FIRST_NAME ELSE STAFF.PREFERRED_NAME END),STAFF.LAST_NAME) AS STAFF_NAME from '+ DBName +'.STAFF Where STAFF_ID NOT in ( SELECT DISTINCT STAFF_ID FROM '+ DBName +'.PROJECT_PEOPLE)' + tempQueryStaff , function (err, StaffIDList) {
						if (err) {
							callback(null, 'Something went wrong');
						} else {
							StaffIDList.forEach(element => {
								staffAllocationArray.push({
									START_DATE: moment().format('YYYY-MM-DD'),
									END_DATE : null,
									ALLOCATION : 0,
									STAFF_ID : element.STAFF_ID,
									STAFF_NAME : element.STAFF_NAME,
									ROLE_ID: element.STAFF_ROLE_ID,
								});
							});
							callback(null, staffIdArray);
						}
					})
				},function(data,callback){
					connection.query('SELECT PROJECT_PEOPLE.*,CONCAT_WS(" ",  (CASE WHEN STAFF.PREFERRED_NAME = "" THEN STAFF.FIRST_NAME WHEN STAFF.PREFERRED_NAME IS NULL THEN STAFF.FIRST_NAME ELSE STAFF.PREFERRED_NAME END),STAFF.LAST_NAME) AS STAFF_NAME FROM '+ DBName +'.PROJECT_PEOPLE INNER JOIN STAFF ON STAFF.STAFF_ID = PROJECT_PEOPLE.STAFF_ID WHERE START_DATE >= "' + moment(req.body.START_DATE).format('YYYY-MM-DD') + '" AND END_DATE <= "' + moment(req.body.END_DATE).format('YYYY-MM-DD') + '"' + tempQueryProject, function (err, StaffIDList) {
						if (err) {
							callback(null, 'Something went wrong');
						} else {
							const groupBystafId = _.groupBy(StaffIDList, 'STAFF_ID');
							const arrOfGroups = Object.values(groupBystafId);
							const resultArr = [];
							for(let i=0; i<arrOfGroups.length; i++) {
								staffAllocationArray = [...staffAllocationArray, ...common.getDurationViseAllocationByStaffID(arrOfGroups[i])];
							}
							callback(null, staffAllocationArray);
						}
					})
					
				}],function(err,result){
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
	})
}
exports.getProjectRoleWise = function(req,res){
	var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    tempCurrentDate = year + '-' + month + '-' + day;
	req.getConnection(function (err, connection) {
		connection.query("SELECT PLANNED_PROJECT_PEOPLE.*,PLANNED_PROJECT_PEOPLE.START_DATE AS PLANNED_START_DATE,PLANNED_PROJECT_PEOPLE.END_DATE AS PLANNED_END_DATE,PROJECT.*,PROJECT.START_DATE AS PRO_START_DATE,PROJECT.END_DATE AS PRO_END_DATE,PROJECT_STATUS.STATUS_NAME FROM `PLANNED_PROJECT_PEOPLE` INNER JOIN PROJECT ON PLANNED_PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID WHERE PROJECT_ROLE_ID = " + req.body.PROJECT_ROLE_ID + " AND PLANNED_PROJECT_PEOPLE.END_DATE >= '" + tempCurrentDate + "' AND PROJECT.PROJECT_STATUS_ID !=4 AND PROJECT.PROJECT_STATUS_ID !=5 ", function (err, availableProject) {
			if(err){
				return res.send({
					"error" : true,
					"status" : "failed",
					"message" : "Something went wrong"
				})
			}
			if(availableProject.length <= 0){
				var data = [];
				return res.send({
					"error" : false,
					"status" : "success",
					"message" : "No project found",
					"data" : data
				})
			} else {
				return res.send({
					"error" : true,
					"status" : "success",
					"data" : availableProject
				})
			}
		})
	})
}