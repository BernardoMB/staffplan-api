import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {BASE_URL} from './global/settings';
import {Observable, BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseUrl: string = BASE_URL;
    public redirect = new BehaviorSubject<any>(null);
    public urlStatus = this.redirect.asObservable();
    public redirectStaff = new BehaviorSubject<any>(null);
    public staffUrlStatus = this.redirectStaff.asObservable();
    public redirectAssStaff = new BehaviorSubject<any>(null);
    public assStaffUrlStatus = this.redirectAssStaff.asObservable();
    public redirectQuickPro = new BehaviorSubject<any>(null);
    public quickProUrlStatus = this.redirectQuickPro.asObservable();
    public redirectQuickStaff = new BehaviorSubject<any>(null);
    public quickStaffUrlStatus = this.redirectQuickStaff.asObservable();

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    redirectToQuickProjectPage(status) {
        this.redirectQuickPro.next(status);
        this.router.navigate(['projectQuickViews']);
    }

    redirectToQuickStaffPage(status) {
        this.redirectQuickStaff.next(status);
        this.router.navigate(['staffQuickViews']);
    }

    redirectToProjectPage(status) {
        this.redirect.next(status);
        this.router.navigate(['project/view']);
    }

    redirectToStaffPage(status) {
        this.redirectStaff.next(status);
        this.router.navigate(['staff/view']);
    }

    redirectToAssStaffPage(status) {
        this.redirectAssStaff.next(status);
        this.router.navigate(['staffAssignment']);
    }

    getPeopleProject(employeeId) {
        return this.httpClient.get(this.baseUrl + 'getPeopleProject/' + employeeId)
            .map(response => response);
    }

    getProjectsList(searchValue) {
        return this.httpClient.post(this.baseUrl + 'getProjectList', searchValue)
            .map(response => response);
    }

    getProjectDetails(projectId) {
        return this.httpClient.get(this.baseUrl + 'getProjectDetails/' + projectId)
            .map(response => response);
    }

    projectListByfilterChange(filterValue) {
        return this.httpClient.get(this.baseUrl + 'projectTypehead/' + filterValue)
            .map(response => response);
    }

    getStaffList(searchValue) {
        return this.httpClient.post(this.baseUrl + 'getEmployeeList', searchValue)
            .map(response => response);
    }

    getStaffDetails(employeeId) {
        return this.httpClient.get(this.baseUrl + 'getEmployeeDetails/' + employeeId)
            .map(response => response);
    }

    getStaffDataByFilter(filterValue) {
        return this.httpClient.get(this.baseUrl + 'getEmployeeTypehead/' + filterValue)
            .map(response => response);
    }

    getRoleList() {
        return this.httpClient.get(this.baseUrl + 'getRole')
            .map(response => response);
    }

    getStaffForProject(projectId) {
        return this.httpClient.get(this.baseUrl + 'getProjectPeople/' + projectId)
            .map(response => response);
    }

    addProjectInStaff(postJSON) {
        return this.httpClient.post(this.baseUrl + 'addProjectPeople', postJSON)
            .map(response => response);
    }

    updateProjectInStaff(postJSON) {
        return this.httpClient.post(this.baseUrl + 'updateProjectPeople', postJSON)
            .map(response => response);
    }

    deleteProjectInStaff(postJSON) {
        return this.httpClient.post(this.baseUrl + 'deleteProjectPeople', postJSON)
            .map(response => response);
    }

    getSparklinesForAllStaffs() {
        return this.httpClient.get(this.baseUrl + 'getSparklinesForAllEmployees')
            .map(response => response);
    }

    getAllProjectPeopleList(searchValue) {
        return this.httpClient.post(this.baseUrl + 'getProjectPeopleList', searchValue)
            .map(response => response);
    }

    getProjectPeoplesListFuture(searchValue) {
        return this.httpClient.post(this.baseUrl + 'getProjectPeoplesListFuture', searchValue)
            .map(response => response);
    }

    getProjectDataByFilter(filterValue) {
        return this.httpClient.get(this.baseUrl + 'getProjectPeopleTypehead/' + filterValue)
            .map(response => response);
    }

    bulkDeleteProjectInStaff(postJSON) {
        return this.httpClient.post(this.baseUrl + 'bulkDeleteProjectPeople', postJSON)
            .map(response => response);
    }

    getCommonListForProject(key) {
        return this.httpClient.get(this.baseUrl + 'commonListing/' + key)
            .map(response => response);
    }

    addProjectDetail(postJSON) {
        return this.httpClient.post(this.baseUrl + 'addProject', postJSON)
            .map(response => response);
    }

    bulkAddProjectInStaff(postJSON) {
        return this.httpClient.post(this.baseUrl + 'bulkAddProjectPeople', postJSON)
            .map(response => response);
    }

    bulkUpdateProjectInStaff(postJSON) {
        return this.httpClient.post(this.baseUrl + 'bulkUpdateProjectPeople', postJSON)
            .map(response => response);
    }

    getProjectNameList(filterValue) {
        return this.httpClient.get(this.baseUrl + 'getProjectNameList/' + filterValue)
            .map(response => response);
    }

    updateProjectDetail(projectData, id) {
        return this.httpClient.post(this.baseUrl + 'updateProject/' + id, projectData)
            .map(response => response);
    }

    getOfficeNameListing() {
        return this.httpClient.get(this.baseUrl + 'getOfficeNameListing')
            .map(response => response);
    }

    addStaffDetail(postJSON) {
        return this.httpClient.post(this.baseUrl + 'addStaff', postJSON)
            .map(response => response);
    }

    updateStaffDetail(postJSON) {
        return this.httpClient.post(this.baseUrl + 'updateStaffDetail', postJSON)
            .map(response => response);
    }

    uploadStaffProfilePic(imageData, id) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data;boundary=' + Math.random());
        headers.append('Accept', 'application/json');
        return this.httpClient.post(this.baseUrl + 'upload/' + id, imageData, {headers: headers})
            .map(response => response);
    }

    getPlannedProjectDataByFilter(filterValue) {
        return this.httpClient.get(this.baseUrl + 'getPlannedProjectPeopleSearch/' + filterValue)
            .map(response => response);
    }

    getPlannedProjectPeople(searchValue) {
        return this.httpClient.post(this.baseUrl + 'getPlannedProjectPeopleDetails', searchValue)
            .map(response => response);
    }

    getProjectPeopleAndPlannedProject(searchValue) {
        return this.httpClient.post(this.baseUrl + 'getProjectPeopleAndPlannedProject', searchValue)
            .map(response => response);
    }

    getProjectPeopleAndPlannedTypehead(filterValue) {
        return this.httpClient.get(this.baseUrl + 'getProjectPeopleAndPlannedTypehead/' + filterValue)
            .map(response => response);
    }

    addStaffCertification(postJSON) {
        return this.httpClient.post(this.baseUrl + 'addStaffCertification', postJSON)
            .map(response => response);
    }

    deleteStaffCertification(postJSON) {
        return this.httpClient.post(this.baseUrl + 'deleteStaffCertification', postJSON)
            .map(response => response);
    }

    addStaffExperience(postJSON) {
        return this.httpClient.post(this.baseUrl + 'addStaffExperience', postJSON)
            .map(response => response);
    }

    checkLoginDetail(postJSON): Observable<any> {
        return this.httpClient.post(this.baseUrl + 'authenticate', postJSON)
            .map(response => response);
    }

    getDashboardDetails(filterValue) {
        return this.httpClient.get(this.baseUrl + 'getDashboardDetails/' + filterValue)
            .map(response => response);
    }

    getAvailableStaff(postJSON) {
        return this.httpClient.post(this.baseUrl + 'getAvailableStaff', postJSON)
            .map(response => response);
    }

    getAvailableProject(postJSON) {
        return this.httpClient.post(this.baseUrl + 'getProjectRoleWise', postJSON)
            .map(response => response);
    }

    getProjectInitiatedList(postJSON) {
        return this.httpClient.post(this.baseUrl + 'getProjectInitiatedList', postJSON)
            .map(response => response);
    }

    getProjectStartingList(postJSON) {
        return this.httpClient.post(this.baseUrl + 'getProjectStartingList', postJSON)
            .map(response => response);
    }

    getProjectEndingList(postJSON) {
        return this.httpClient.post(this.baseUrl + 'getProjectEndingList', postJSON)
            .map(response => response);
    }

    getProjectInitiatedTypehead(filterValue) {
        return this.httpClient.get(this.baseUrl + 'projectInitiatedTypehead/' + filterValue)
            .map(response => response);
    }

    getNewStaffList(postJSON) {
        return this.httpClient.post(this.baseUrl + 'getNewStaffList', postJSON)
            .map(response => response);
    }

    getStaffingGap(postJSON) {
        return this.httpClient.post(this.baseUrl + 'getStaffingGap', postJSON)
            .map(response => response);
    }

    getOverAllocation(postJSON) {
        return this.httpClient.post(this.baseUrl + 'getOverAllocation', postJSON)
            .map(response => response);
    }

    getProjectPeoplesListUpcomingRollOff(postJSON) {
        return this.httpClient.post(this.baseUrl + 'getProjectPeoplesListUpcomingRollOff', postJSON)
            .map(response => response);
    }

    getStaffNewTypehead(filterValue) {
        return this.httpClient.get(this.baseUrl + 'staffNewTypehead/' + filterValue)
            .map(response => response);
    }

    getStaffingGapTypehead(filterValue) {
        return this.httpClient.get(this.baseUrl + 'staffingGapTypehead/' + filterValue)
            .map(response => response);
    }

    getUpComingRollOffTypehead(filterValue) {
        return this.httpClient.get(this.baseUrl + 'upComingRollOffTypehead/' + filterValue)
            .map(response => response);
    }

    getFilteredlocationValue(filterValue) {
        return this.httpClient.get(this.baseUrl + 'filteredlocationValue/' + filterValue)
            .map(response => response);
    }
}
