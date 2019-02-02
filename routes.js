module.exports = function (app) {
    var express = require('express');
    var Projects = require('./routes/projects');
    var ProjectsPeople = require('./routes/projectPeople');
    var Employee = require('./routes/employee');
    var Common = require('./routes/common');
    var Users = require('./routes/users');
    var accessCombination = require('./routes/accessCombination');
    var role = require('./routes/role');
    var UserAccess = require('./routes/userAccess');
    var AccessType = require('./routes/accessType');
    var Subscriber = require('./routes/subscriber');
    var Dashboard = require('./routes/dashboard');
    var Typehead = require('./routes/typehead');
    var multer = require('multer');
    var fs = require('fs');
    var jwt = require('jsonwebtoken');
    var newConnection = require('./connection');
    var crypto = require('crypto');
    var cookieParser = require('cookie-parser');
    const tokenList = {};
    // var upload = multer({dest: './public/assets/images/Profilepic/'});
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (!fs.existsSync('./public/assets/images/user-images')){
                fs.mkdirSync('./public/assets/images/user-images');
            }
            cb(null, './public/assets/images/user-images/')
        },
        filename: function (req, file, cb) {
            cb(null, req.params.id);
        }
    })

    var upload = multer({
        storage: storage
    })
    app.use(cookieParser())

    app.set('superSecret', newConnection.ENCRYPTION_KEY);
    app.set('superSecretRefresh', newConnection.ENCRYPTION_KEY);
    
    app.post('/api/authenticate', function(req, res) {
        console.log("In authenticate");
        var mastersConnection = newConnection.masterConnection;
        // Debug logs to figure the case when the nodejs just hang in authentication call
        console.log("master connection: " + mastersConnection);
        var subsctiberDomainID = req.body.username;
        console.log("Subsctiber Email: " + subsctiberDomainID);
        subsctiberDomainID = subsctiberDomainID.substring(subsctiberDomainID.indexOf('@')+1);
        console.log("Subsctiber Domain ID: " + subsctiberDomainID);
        req.getConnection(function (err, connectionMaster) {
            console.log("In getconnection");
            var query = mastersConnection.query("SELECT * FROM SUBSCRIBER INNER JOIN COMPANY ON COMPANY.COMPANY_ID = SUBSCRIBER.COMPANY_ID WHERE DOMAIN_ID = '" + subsctiberDomainID + "'", function (err, user) {
                if (err) {
                    console.log(`Subscriber error`,err);
                    return res.send({
                        "error": true,
                        "status": "failed",
                        "message": "Somthing went wrong"
                    });
                }
                
                if (!user.length) {
                    console.log(`Subscriber.lengt = 0`);
                    return res.send({
                        "error": true,
                        "status": "failed",
                        "message": "Authentication failed. User not found."
                    });
                } else {
                    console.log("In first query else");
                    const cipher = crypto.createCipher('aes192', newConnection.ENCRYPTION_KEY);  
                    var encPassword = cipher.update(req.body.password, 'utf8', 'hex');  
                    encPassword += cipher.final('hex');
                    var UsersDB = "demo_"+user[0].COMPANY_NAME.toLowerCase();
                    req.getConnection(function (err, connection) {
                        connection.query("SELECT "+ UsersDB +".USERS.* ,"+ UsersDB +".ROLE.ROLE_NAME,"+ UsersDB +".ROLE.COMBINATION_ID FROM "+ UsersDB +".USERS INNER JOIN "+ UsersDB +".ROLE ON "+ UsersDB +".USERS.ROLE_ID = "+ UsersDB +".ROLE.ID WHERE EMAIL = '" + req.body.username + "' AND PASSWORD = '" + encPassword + "'", function(err, usersData){
                            console.log("In second query");
                            if (err){
                                console.log(`User error`,err);
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Somthing went wrong"
                                });
                            }
                            if (!usersData.length) {
                                console.log(`User.length = 0`);
                                return res.send({
                                    "error": true,
                                    "status": "failed",
                                    "message": "Authentication failed. Username or password wrong."
                                });
                            } else {
                                console.log("In second query else");
                                var payload = {
                                    ID: usersData[0].ID,
                                    DB: UsersDB	
                                }
                                var token = jwt.sign(payload, app.get('superSecret'), {
                                    expiresIn: newConnection.SUPERSECRETTIME
                                });

                                const refreshToken = jwt.sign(payload, app.get('superSecretRefresh'),
                                {
                                    expiresIn: newConnection.SUPERSECRETREFRESHTIME
                                })
                                const response = {
                                    "status": "Logged in",
                                    "token": token,
                                    "refreshToken": refreshToken,
                                }
                                
                                tokenList[token] = response;
                                let userObj = {};
                                userObj.user = usersData[0];
                                userObj.token = token;
                                res.cookie('auth',token);
                                var query = connection.query('SELECT '+ UsersDB +'.USER_ACCESS.OFFICE_ID,'+ UsersDB +'.OFFICE.OFFICE_NAME FROM '+ UsersDB +'.USER_ACCESS INNER JOIN '+ UsersDB +'.OFFICE ON '+ UsersDB +'.OFFICE.OFFICE_ID = '+ UsersDB +'.USER_ACCESS.OFFICE_ID WHERE '+ UsersDB +'.USER_ACCESS.USER_ID = ' + userObj.user.ID, function (err, userOfficeList) {
                                    if(err){
                                        return res.send({
                                            "error" : true,
                                            "status" : "office list failed",
                                            "message" : "Something went wrong in office list",
                                            "data" : userObj
                                        });
                                    } else {
                                        var officeList = [];
                                        userOfficeList.forEach(element => {
                                            officeList.push(element);
                                        });
                                        userObj.user.OFFICE_LIST = officeList;
                                        return res.send({
                                            "error": false,
                                            "status": "success",
                                            "data": userObj
                                        });        
                                    }
                                })
                            }
                        })
                    })
                }
            })
        });
    });


    function isAuthenticated(req, res, next) {
        var token = req.headers.sessionid;
        // update the token in the list
        if(!tokenList[token]){
            return res.json({ status : 401, success: false, message: 'Failed to authenticate token.' });
        } else {
            let refreshToken = tokenList[token].refreshToken;
            jwt.verify(refreshToken, app.get('superSecretRefresh'), function(err, decoded) {
                if (err) {
                    return res.json({ status : 401, success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    // console.log(decoded);
                    var payload = {
                        ID: decoded.ID,
                        DB:decoded.DB
                    }
                    const newRefreshToken = jwt.sign(payload, app.get('superSecretRefresh'), { expiresIn: newConnection.SUPERSECRETREFRESHTIME})
                    tokenList[token].refreshToken = newRefreshToken;
                    next();
                }
            });
        }
    }
    // Project Routes
    app.get('/',isAuthenticated, Projects.onServerStart);
    app.get('/api/getDashboardDetails/:officeCity', Projects.getDashboardDetails);
    app.post('/api/addProject',isAuthenticated, Projects.addProject);
    app.post('/api/updateProject/:id',isAuthenticated, Projects.updateProject);
    app.post('/api/deleteProject/:id',isAuthenticated, Projects.deleteProject);
    app.post('/api/searchProject/:projectsearch',isAuthenticated, Projects.searchProject);
    app.post('/api/getProjectList',isAuthenticated, Projects.getProjectList);
    app.post('/api/getProjectListTest',isAuthenticated, Projects.getProjectListTest);
    app.get('/api/projectTypehead/:projectTypehead',isAuthenticated, Projects.projectTypehead);
    app.get('/api/projectTypehead/',isAuthenticated, Projects.projectTypeheadSpace);
    app.get('/api/getProjectDetails/:ProjectID',isAuthenticated, Projects.getProjectDetails);
    app.get('/api/getProjectNameList/:ProjectCharacter',isAuthenticated, Projects.getProjectNameList);
    app.post('/api/getProjectInitiatedList',isAuthenticated, Projects.getProjectInitiatedList);
    app.post('/api/getProjectStartingList',isAuthenticated, Projects.getProjectStartingList);
    app.post('/api/getProjectEndingList',isAuthenticated, Projects.getProjectEndingList);


    // Project People

    app.use(app.router);
    // app.get('/api/getProjectPeopleList', ProjectsPeople.getProjectPeopleList);
    app.post('/api/addProjectPeople',isAuthenticated, ProjectsPeople.addProjectPeople);
    app.post('/api/bulkAddProjectPeople',isAuthenticated, ProjectsPeople.bulkAddProjectPeople);
    app.post('/api/updateProjectPeople',isAuthenticated, ProjectsPeople.updateProjectPeople);
    // app.post('/api/deleteProjectPeople', ProjectsPeople.deleteProjectPeople);
    app.post('/api/deleteProjectPeople',isAuthenticated, ProjectsPeople.deleteProjectPeople);
    app.get('/api/getProjectPeople/:getProjectPeople',isAuthenticated, ProjectsPeople.getProjectPeople);
    app.get('/api/getSparklines/:empId',isAuthenticated, ProjectsPeople.getSparklines);
    app.get('/api/getSparklinesForAllEmployees',isAuthenticated, ProjectsPeople.getSparklinesForAllEmployees);
    app.get('/api/getProjectPeopleTypehead/:getProjectPeopleTypehead',isAuthenticated, ProjectsPeople.getProjectPeopleTypehead);
    app.post('/api/getProjectPeopleList',isAuthenticated, ProjectsPeople.getProjectPeoplesList);
    app.post('/api/getProjectPeoplesListFuture',isAuthenticated, ProjectsPeople.getProjectPeoplesListFuture);
    app.post('/api/bulkUpdateProjectPeople',isAuthenticated, ProjectsPeople.bulkUpdateProjectPeople);
    // api.post('/api/bulkUpdateProjectPeople', ProjectsPeople.bulkUpdateProjectPeople);
    app.post('/api/bulkDeleteProjectPeople',isAuthenticated, ProjectsPeople.bulkDeleteProjectPeople);
    app.get('/api/getPlannedProjectPeople',isAuthenticated, ProjectsPeople.getPlannedProjectPeople);
    app.get('/api/getPlannedProjectPeopleSearch/:search_string',isAuthenticated, ProjectsPeople.getPlannedProjectPeopleSearch);
    app.post('/api/getPlannedProjectPeopleDetails',isAuthenticated,ProjectsPeople.getPlannedProjectPeopleDetails);
    app.post('/api/getProjectPeopleAndPlannedProject',isAuthenticated,ProjectsPeople.getProjectPeopleAndPlannedProject);
    app.post('/api/getUnassignedStaff',isAuthenticated,ProjectsPeople.getUnassignedStaff);
    app.post('/api/getOverAllocation',isAuthenticated,ProjectsPeople.getOverAllocation);
    app.post('/api/getStaffingGap',isAuthenticated,ProjectsPeople.getStaffingGap);
    app.post('/api/getNewStaffList',isAuthenticated,ProjectsPeople.getNewStaffList);
    app.get('/api/getProjectPeopleAndPlannedTypehead/:String',isAuthenticated, ProjectsPeople.getProjectPeopleAndPlannedTypehead);
    app.get('/api/getPlannedProjectFromID/:ProjectID',isAuthenticated , ProjectsPeople.getPlannedProjectFromID);
    app.post('/api/getProjectPeoplesListUpcomingRollOff',isAuthenticated , ProjectsPeople.getProjectPeoplesListUpcomingRollOff);

    // Employee
    
    app.post('/api/getAvailableStaff',isAuthenticated,Employee.getAvailableStaff2);
    app.get('/api/getRole',isAuthenticated, Employee.getRole);
    app.get('/api/getPeopleProject/:PeopleProjectID',isAuthenticated, Employee.getPeopleProject);
    app.get('/api/getEmployeeDetails/:EmployeeID',isAuthenticated, Employee.getEmployeeDetails);
    app.get('/api/getEmployeeTypehead/:employeeTypehead',isAuthenticated, Employee.getEmployeeTypehead);
    app.post('/api/getEmployeeList',isAuthenticated, Employee.getEmployeeList);
    app.post('/api/upload/:id',isAuthenticated, upload.single('file'), Employee.uploadimage);
    // app.get('/api/getImage/:path',Employee.getImage);
    app.post('/api/addStaff',isAuthenticated, Employee.addStaff);
    app.post('/api/updateStaff/:staffID',isAuthenticated, Employee.updateStaff);
    app.get('/api/getStaffList',isAuthenticated, Employee.getStaffList);
    app.post('/api/addStaffCertificationSkill',isAuthenticated, Employee.addStaffCertificationSkill);
    app.post('/api/addStaffCertification',isAuthenticated, Employee.addStaffCertification);
    app.get('/api/getStaffCertification/:staffID',isAuthenticated, Employee.getStaffCertification);
    app.post('/api/addStaffExperience',isAuthenticated, Employee.addStaffExperience);
    app.post('/api/deleteStaffCertification',isAuthenticated, Employee.deleteStaffCertification);
    app.post('/api/getProjectRoleWise',isAuthenticated, Employee.getProjectRoleWise);
    
    
    // CommonAPi  
    
    app.get('/api/commonListing/:modelName',isAuthenticated, Common.commonListing);
    app.get('/api/getOfficeNameListing',isAuthenticated, Common.getOfficeNameListing);
    app.get('/api/getCustomLabel',isAuthenticated, Common.getCustomLabel);
    
    // Users api
    app.get('/api/getUser/:userID',isAuthenticated, Users.getUser);
    app.get('/api/deleteUser/:userID',isAuthenticated, Users.deleteUser);
    app.post('/api/checkLoginDetail',isAuthenticated, Users.userLogin);
    app.post('/api/addUser',isAuthenticated, Users.addUser);
    app.post('/api/updateUser/:userID',isAuthenticated, Users.updateUser);
    
    // Access Combination
    app.get('/api/getAccessCombination/:combinationID',isAuthenticated, accessCombination.getAccessCombination);
    app.get('/api/deleteAccessCombination/:combinationID',isAuthenticated, accessCombination.deleteAccessCombination);
    app.get('/api/getAllAccessCombination',isAuthenticated, accessCombination.getAllAccessCombination);
    app.post('/api/addAccessCombination',isAuthenticated, accessCombination.addAccessCombination);
    app.post('/api/updateAccessCombination/:combinationID',isAuthenticated, accessCombination.updateAccessCombination);
    
    
    // Role
    app.get('/api/getRole/:roleID',isAuthenticated, role.getRole);
    app.get('/api/getAllRole',isAuthenticated, role.getAllRole);
    app.get('/api/deleteRole/:roleID',isAuthenticated, role.deleteRole);
    app.post('/api/addRole',isAuthenticated, role.addRole);
    app.post('/api/updateRole/:roleID',isAuthenticated, role.updateRole);
    
    // User Access
    app.get('/api/getUserAccess/:userAccessID',isAuthenticated, UserAccess.getUserAccess);
    app.get('/api/deleteUserAccess/:userAccessID',isAuthenticated, UserAccess.deleteUserAccess);
    app.post('/api/addUserAccess',isAuthenticated, UserAccess.addUserAccess);
    app.post('/api/bulkAddUserAccess',isAuthenticated, UserAccess.bulkAddUserAccess);
    app.post('/api/updateUserAccess/:userAccessID',isAuthenticated, UserAccess.updateUserAccess);
    
    // Access Type
    app.get('/api/getAccessType/:accessTypeID',isAuthenticated, AccessType.getAccessType);
    app.get('/api/deleteAccessType/:accessTypeID',isAuthenticated, AccessType.deleteAccessType);
    app.get('/api/getAllAccessType',isAuthenticated, AccessType.getAllAccessType);
    app.post('/api/addAccessType',isAuthenticated, AccessType.addAccessType);
    app.post('/api/updateAccessType/:accessTypeID',isAuthenticated, AccessType.updateAccessType);
    
    // Subscriber
    app.get('/api/getTableList',isAuthenticated, Subscriber.getTableList);
    app.get('/api/getSubscriber',isAuthenticated, Subscriber.getSubscriber);
    app.get('/api/getFieldList/:tableName',isAuthenticated, Subscriber.getFieldList);
    app.post('/api/addSubscriber',isAuthenticated, Subscriber.addSubscriber);
    app.post('/api/addCustomLabel',isAuthenticated, Subscriber.addCustomLabel);
    
    // Dashboard details
    app.get('/api/Dashboard/projectInProgress',isAuthenticated, Dashboard.projectInProgress);
    app.get('/api/Dashboard/projectStartThisYear',isAuthenticated, Dashboard.projectStartThisYear);
    app.get('/api/Dashboard/projectEndThisYear',isAuthenticated, Dashboard.projectEndThisYear);
    
    // Typehead
    app.get('/api/projectInitiatedTypehead/:type/:projectInitiatedTypehead',isAuthenticated, Typehead.projectInitiatedTypehead);
    app.get('/api/staffNewTypehead/:type/:staffNewTypehead',isAuthenticated, Typehead.staffNewTypehead);
    app.get('/api/staffingGapTypehead/:staffNewTypehead',isAuthenticated, Typehead.staffingGapTypehead);
    app.get('/api/upComingRollOffTypehead/:upCommingTypehead',isAuthenticated, Typehead.upComingRollOffTypehead);


}
