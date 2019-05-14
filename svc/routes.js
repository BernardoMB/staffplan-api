const authenticate = require('./modules/auth/authenticate');
const isAuthenticated = authenticate.isAuthenticated;

module.exports = function (app) {
    var Projects = require('./routes/projects');
    var ProjectsPeople = require('./routes/projectPeople');
    var Employee = require('./routes/employee');
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
