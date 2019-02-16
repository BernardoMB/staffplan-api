import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {NgForm, FormGroup, FormBuilder, FormControl, FormArray, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {
    ERROR_MESSAGE,
    convertDateToUTC,
    convertToUTC,
} from '../../global/settings';
import {ApiService} from '../../api.service';

@Component({
    selector: 'app-project-add',
    templateUrl: './project-add.component.html',
    styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
    @ViewChild(NgForm) projectForm: NgForm;
    private filteredProjectStatusList: Array<string> = [];
    private filteredOfficeList: Array<string> = [];
    private filteredProjectTypeList: Array<string> = [];
    private filteredCustomerList: Array<string> = [];
    private filteredPeopleList: Array<string> = [];
    private filteredRoleList: Array<string> = [];
    private errorStartDate: any = {isError: false, errorMessage: ''};
    private errorEndDate: any = {isError: false, errorMessage: ''};
    private showLoader = true;
    private projectId = null;
    private projectIdForUpdate = null;
    private staffNotAssign = false;
    private addRowForAssignProject = true;
    public searchFilter = "";
    public projectStatusList = [];
    public officeList = [];
    public projectTypeList = [];
    public customerList = [];
    public divisionList = [];
    public peopleList = [];
    public roleList = [];
    public assignProjectDetail = [];
    public addProjectModel = {
        START_DATE: new Date(),
        END_DATE: new Date(),
        CUSTOMER_CONTACT: '',
        PROJECT_NAME: '',
        PROJECT_STATUS: null,
        OFFICE: null,
        ROM: null,
        PROJECT_CATEGORY: null,
        PROJECT_TYPE: null,
        CUSTOMER: null,
        PROJECT_DESCRIPTION: '',

    };
    public typeAheadSuggestions = [];
    public assignProjectForm: FormGroup;
    constructor(private router: Router, private chRef: ChangeDetectorRef, private apiService: ApiService, private toastr: ToastrService, private modalService: NgbModal, private datePipe: DatePipe, private fb: FormBuilder) {
        this.assignProjectForm = this.fb.group({
            assignProjectData: this.fb.array([])
        });
        const control = new FormGroup({
            'STAFF_DETAIL': new FormControl(null),
            'ROLE_DETAIL': new FormControl(null, Validators.required),
            'RESUME_SUBMITTED': new FormControl(true, Validators.required)
        });
        if (this.assignProjectForm.value.assignProjectData == '') {
            (<FormArray> this.assignProjectForm.get('assignProjectData')).push(control);
        }
    }
    async ngOnInit() {
        this.getCommonList();
    }
    getCommonList() {
        let projectStatus = 'PROJECT_STATUS';
        this.apiService.getCommonListForProject(projectStatus).subscribe((response: any) => {
            if (response && response.data) {
                this.projectStatusList = response.data;
                this.filteredProjectStatusList = this.projectStatusList.slice();
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });

        this.apiService.getOfficeNameListing().subscribe((response: any) => {
            if (response && response.data) {
                this.officeList = response.data;
                this.filteredOfficeList = this.officeList.slice();
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        let projectType = 'PROJECT_TYPE';
        this.apiService.getCommonListForProject(projectType).subscribe((response: any) => {
            if (response && response.data) {
                this.projectTypeList = response.data;
                this.filteredProjectTypeList = this.projectTypeList.slice();
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        let customer = 'CUSTOMER';
        this.apiService.getCommonListForProject(customer).subscribe((response: any) => {
            if (response && response.data) {
                this.customerList = response.data;
                this.filteredCustomerList = this.customerList.slice();
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        let people = 'STAFF';
        this.apiService.getCommonListForProject(people).subscribe((response: any) => {
            if (response && response.data) {
                this.peopleList = response.data;
                for (let key in this.peopleList) {
                    const dataItem = this.peopleList[key];
                    if (dataItem['PREFERRED_NAME'] && dataItem['PREFERRED_NAME'] !== '') {
                        dataItem['STAFF_NAME'] = `${dataItem['PREFERRED_NAME']} ${dataItem['LAST_NAME']}`;
                    } else {
                        dataItem['STAFF_NAME'] = `${dataItem['FIRST_NAME']} ${dataItem['LAST_NAME']}`;
                    }
                }
                this.filteredPeopleList = this.peopleList.slice();
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });

        this.apiService.getRoleList().subscribe((response: any) => {
            if (response && response.data) {
                this.roleList = response.data;
                this.filteredRoleList = this.roleList.slice();
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }
    public async valueChange(value) {
        this.searchFilter = value;
        await this.initiateProjectList();
    }
    async initiateProjectList() {
        const $that = this;
        await this.getProjectsList(function (response) {
            $that.showLoader = false;
            $that.chRef.detectChanges();
            if ('' != $that.searchFilter) {
                $that.projectIdForUpdate = response.data[0].PROJECT_ID;
                $that.getProjectDetails(function (projectDetail) {
                    if (projectDetail && projectDetail.data) {
                        $that.addProjectModel.PROJECT_NAME = projectDetail.data.PROJECT_NAME;
                        $that.addProjectModel.START_DATE = convertDateToUTC(new Date(projectDetail.data.START_DATE));
                        $that.addProjectModel.END_DATE = convertDateToUTC(new Date(projectDetail.data.END_DATE));
                        $that.addProjectModel.PROJECT_STATUS = $that.projectStatusList.find(x => x.STATUS_ID == projectDetail.data.PROJECT_STATUS_ID);
                        $that.addProjectModel.OFFICE = $that.officeList.find(x => x.OFFICE_ID == projectDetail.data.OFFICE_ID);
                        $that.addProjectModel.PROJECT_CATEGORY = $that.addProjectModel.OFFICE['CATEGORY_NAME'];
                        $that.addProjectModel.PROJECT_TYPE = $that.projectTypeList.find(x => x.TYPE_ID == projectDetail.data.PROJECT_TYPE_ID);
                        $that.addProjectModel.ROM = +projectDetail.data.PROJECT_ROM;
                        $that.addProjectModel.CUSTOMER = $that.customerList.find(x => x.CUSTOMER_ID == projectDetail.data.CUSTOMER_ID);
                        if (typeof $that.addProjectModel.CUSTOMER != 'undefined') {
                            $that.addProjectModel.CUSTOMER_CONTACT = $that.addProjectModel.CUSTOMER['CUSTOMER_CONTACT'];
                        }
                        $that.addProjectModel.PROJECT_DESCRIPTION = projectDetail.data.PROJECT_DESCRIPTION;
                        $that.assignProjectForm.value.assignProjectData = '';
                        $that.assignProjectDetail = [];
                        $that.assignProjectForm.get('assignProjectData')['controls'] = [];
                        if (projectDetail.data.STAFF_DATA.length > 0) {
                            for (let key in projectDetail.data.STAFF_DATA) {
                                const control = new FormGroup({
                                    'STAFF_DETAIL': new FormControl($that.peopleList.find(x => x.STAFF_ID == projectDetail.data.STAFF_DATA[key].STAFF_ID)),
                                    'ROLE_DETAIL': new FormControl($that.roleList.find(x => x.ROLE_ID == projectDetail.data.STAFF_DATA[key].PROJECT_ROLE_ID), Validators.required),
                                    'RESUME_SUBMITTED': new FormControl(true)
                                });
                                (<FormArray> $that.assignProjectForm.get('assignProjectData')).push(control);
                            }
                        } else {
                            $that.staffNotAssign = true;
                        }
                    }
                }, $that.projectIdForUpdate);
            }
        }, {
                "ADVANCE_SEARCH": $that.searchFilter
            });
    }
    getProjectsList(callback, postJson) {
        this.apiService.getProjectsList(postJson).subscribe((response) => {
            callback(response);
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }
    getProjectDetails(callback, projectId) {
        this.apiService.getProjectDetails(projectId).subscribe((response) => {
            callback(response);
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }
    public projectListByfilterChange(filter) {
        this.searchFilter = filter;
        if (filter != '' && filter != null) {
            this.apiService.getProjectNameList(filter).subscribe((response: any) => {
                if (response && response.data && response.data) {
                    this.typeAheadSuggestions = response.data;
                    this.chRef.detectChanges();
                }
            }, error => {
                this.showLoader = false;
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        } else {
            this.projectAddFormReset(undefined);
        }
    }
    public handleFilterChange(value, column) {
        switch (column) {
            case "PROJECT_STATUS":
                this.filteredProjectStatusList = this.projectStatusList.filter((s) => s.STATUS_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case "OFFICE":
                this.filteredOfficeList = this.officeList.filter((s) => s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case "PROJECT_TYPE":
                this.filteredProjectTypeList = this.projectTypeList.filter((s) => s.TYPE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case "CUSTOMER":
                this.filteredCustomerList = this.customerList.filter((s) => s.CUSTOMER_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case "STAFF_DETAIL":
                this.filteredPeopleList = this.peopleList.filter((s) => s.STAFF_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case "ROLE_DETAIL":
                this.filteredRoleList = this.roleList.filter((s) => s.ROLE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }

    }
    public handleValueChange(value, column, index) {
        if (column === 'CUSTOMER') {
            this.addProjectModel.CUSTOMER_CONTACT = value.CUSTOMER_CONTACT;
        } else if (column === 'START_DATE') {
            if (new Date(value) > new Date(this.projectForm.controls['END_DATE'].value)) {
                this.errorStartDate = {isError: true, errorMessage: "Start Date can't after end date"};
            } else {
                this.errorStartDate = {isError: false, errorMessage: ""};
            }
        } else if (column === 'END_DATE') {
            if (new Date(value) < new Date(this.projectForm.controls['START_DATE'].value)) {
                this.errorEndDate = {isError: true, errorMessage: "End Date can't before start date"};
            } else {
                this.errorEndDate = {isError: false, errorMessage: ""};
                this.errorStartDate = {isError: false, errorMessage: ""};
            }
        } else if (column === 'STAFF_DETAIL') {
            let ROLE = this.roleList.find(x => x.ROLE_ID == value.STAFF_ROLE_ID);
            this.assignProjectForm.get('assignProjectData')['controls'][index].get('ROLE_DETAIL').setValue(ROLE);
            this.assignProjectForm.get('assignProjectData')['controls'][index].get('ROLE_DETAIL').markAsUntouched();
        } else if (column === 'ROLE_DETAIL') {
            this.assignProjectForm.get('assignProjectData')['controls'][index].get('ROLE_DETAIL').markAsUntouched();
        } else if (column === 'OFFICE') {
            this.addProjectModel.PROJECT_CATEGORY = value.CATEGORY_NAME;
        }
    }
    public projectAddFormReset(isCancel: any) {
        this.searchFilter = '';
        if (typeof this.projectForm !== 'undefined') {
            this.projectForm.resetForm();
        }
        this.assignProjectForm.reset();
        this.addProjectModel.START_DATE = new Date();
        this.addProjectModel.END_DATE = new Date();
        this.projectId = null;
        this.projectIdForUpdate = null;
        this.assignProjectForm.value.assignProjectData = '';
        this.assignProjectDetail = [];
        this.assignProjectForm.get('assignProjectData')['controls'] = [];
        const control = new FormGroup({
            'STAFF_DETAIL': new FormControl(null),
            'ROLE_DETAIL': new FormControl(null, Validators.required),
            'RESUME_SUBMITTED': new FormControl(true, Validators.required)
        });
        if (this.assignProjectForm.value.assignProjectData == '') {
            (<FormArray> this.assignProjectForm.get('assignProjectData')).push(control);
        }
        if (isCancel) {
            this.router.navigate(['home/project/view']);
        }
    }

    public addSecondListRow() {
        const control = new FormGroup({
            'STAFF_DETAIL': new FormControl(null),
            'ROLE_DETAIL': new FormControl(null, Validators.required),
            'RESUME_SUBMITTED': new FormControl(true)
        });
        if (this.assignProjectForm.value.assignProjectData == '') {
            (<FormArray> this.assignProjectForm.get('assignProjectData')).push(control);
        } else {
            for (let key in this.assignProjectForm.value.assignProjectData) {
                if (null == this.assignProjectForm.value.assignProjectData[key].ROLE_DETAIL) {
                    this.addRowForAssignProject = false;
                    this.assignProjectForm.get('assignProjectData')['controls'][key].get('ROLE_DETAIL').markAsTouched();
                } else {
                    this.addRowForAssignProject = true;
                    this.assignProjectForm.get('assignProjectData')['controls'][key].get('ROLE_DETAIL').markAsUntouched();
                }
            }
            if (this.addRowForAssignProject == true) {
                (<FormArray> this.assignProjectForm.get('assignProjectData')).push(control);
            }
        }

    }
    cancelAssignProjectData(ctrl, index) {
        if (index == 0 && this.assignProjectForm.value.assignProjectData.length == 1) {
            this.assignProjectForm.reset();
            this.assignProjectForm.get('assignProjectData')['controls'][index].get('RESUME_SUBMITTED').setValue(true);
        } else {
            const control = <FormArray> this.assignProjectForm.controls['assignProjectData'];
            control.removeAt(index);
        }
    }
    public saveProjectDetail() {
        this.assignProjectDetail = [];
        let isDuplication = false;
        let duplicateStaffName = [];
        if (this.assignProjectForm.value && this.assignProjectForm.value.assignProjectData && this.assignProjectForm.value.assignProjectData.length > 0) {
            let uniqueStaffIds = [];
            this.assignProjectForm.value.assignProjectData.map(function (instance) {
                if (instance.STAFF_DETAIL && instance.STAFF_DETAIL.STAFF_ID) {
                    if (uniqueStaffIds.indexOf(instance.STAFF_DETAIL.STAFF_ID) < 0) {
                        uniqueStaffIds.push(instance.STAFF_DETAIL.STAFF_ID);
                    } else {
                        isDuplication = true;
                        if (duplicateStaffName.indexOf(instance.STAFF_DETAIL.STAFF_NAME) < 0) {
                            duplicateStaffName.push(instance.STAFF_DETAIL.STAFF_NAME);
                        }
                    }
                }
            });
        }
        if (typeof this.projectForm != 'undefined') {
            this.projectDetail = this.projectForm.value;
        }
        if (typeof this.projectForm != 'undefined' && !this.projectForm.valid) {
            this.projectForm.controls['PROJECT_NAME'].markAsTouched();
            this.projectForm.controls['PROJECT_STATUS'].markAsTouched();
            this.projectForm.controls['START_DATE'].markAsTouched();
            this.projectForm.controls['END_DATE'].markAsTouched();
            this.projectForm.controls['OFFICE'].markAsTouched();
            this.projectForm.controls['PROJECT_CATEGORY'].markAsTouched();
            this.projectForm.controls['PROJECT_TYPE'].markAsTouched();
        } else if (isDuplication) {
            let adjective = duplicateStaffName.length > 1 ? "are" : "is";
            let toastMessage = duplicateStaffName.toString() + "  " + adjective + "  already assigned to Project";
            this.toastr.error(toastMessage, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        } else if (new Date(this.projectDetail.END_DATE) < new Date(this.projectDetail.START_DATE)) {
            this.errorEndDate = {isError: true, errorMessage: "End Date can't before start date"};
        } else {
            let projectData = {
                "PROJECT_NAME": this.projectDetail.PROJECT_NAME,
                "START_DATE": this.datePipe.transform(this.projectDetail.START_DATE, 'yyyy-MM-dd'),
                "END_DATE": this.datePipe.transform(this.projectDetail.END_DATE, 'yyyy-MM-dd'),
                "PROJECT_STATUS": this.projectDetail.PROJECT_STATUS.STATUS_ID,
                "PROJECT_TYPE_ID": this.projectDetail.PROJECT_TYPE.TYPE_ID,
                "OFFICE_ID": this.projectDetail.OFFICE.OFFICE_ID,
            }
            if (typeof this.projectDetail.ROM !== 'undefined' && this.projectDetail.ROM !== null) {
                projectData['PROJECT_ROM'] = this.projectDetail.ROM;
            } else {
                projectData['PROJECT_ROM'] = null;
            }
            if (typeof this.projectDetail.CUSTOMER !== 'undefined' && this.projectDetail.CUSTOMER !== null) {
                projectData['CUSTOMER_ID'] = this.projectDetail.CUSTOMER.CUSTOMER_ID;
            } else {
                projectData['CUSTOMER_ID'] = null;
            }
            if (typeof this.projectDetail.PROJECT_DESCRIPTION !== 'undefined' && this.projectDetail.PROJECT_DESCRIPTION !== null) {
                projectData['PROJECT_DESCRIPTION'] = this.projectDetail.PROJECT_DESCRIPTION;
            } else {
                projectData['PROJECT_DESCRIPTION'] = null;
            }
            if (this.projectId == null && this.projectIdForUpdate == null) {
                this.apiService.addProjectDetail(projectData).subscribe((response: any) => {
                    if (response) {
                        if (response.error == true) {
                            this.projectId = null;
                            this.toastr.error(response.message, ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS);
                        } else {
                            this.projectId = response.PROJECT_ID;
                            this.assignProjectToStaff();
                        }
                    }
                }, error => {
                    this.showLoader = false;
                    this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                });
            } else if (this.projectIdForUpdate != null) {
                this.apiService.updateProjectDetail(projectData, this.projectIdForUpdate).subscribe((response: any) => {
                    if (response) {
                        if (response.error == true) {
                            this.toastr.error(response.message, ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS);
                        } else {
                            this.projectAddFormReset(undefined);
                            this.router.navigate(['home/project/view']);
                            this.toastr.success(response.message);
                        }
                    }
                }, error => {
                    this.showLoader = false;
                    this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                });
            } else {
                this.assignProjectToStaff();
            }
        }
    }
    public assignProjectToStaff() {
        if (this.assignProjectForm.value.assignProjectData != '') {
            for (let key in this.assignProjectForm.value.assignProjectData) {
                let data = {
                }
                if (this.assignProjectForm.value.assignProjectData[key]['ROLE_DETAIL'] != null) {
                    if (this.assignProjectForm.value.assignProjectData[key]['STAFF_DETAIL'] != null) {
                        data['STAFF_ID'] = this.assignProjectForm.value.assignProjectData[key]['STAFF_DETAIL']['STAFF_ID'];
                    } else {
                        data['STAFF_ID'] = null;
                    }
                    data['PROJECT_ID'] = this.projectId;
                    data['PROJECT_ROLE_ID'] = this.assignProjectForm.value.assignProjectData[key]['ROLE_DETAIL']['ROLE_ID'];
                    data['RESUME_SUBMITTED'] = this.assignProjectForm.value.assignProjectData[key]['RESUME_SUBMITTED'];
                    data['START_DATE'] = this.datePipe.transform(this.projectDetail.START_DATE, 'yyyy-MM-dd');
                    data['END_DATE'] = this.datePipe.transform(this.projectDetail.END_DATE, 'yyyy-MM-dd');
                    data['ALLOCATION'] = 100;
                    data['CONFIRMED'] = true;
                    this.assignProjectDetail.push(data);
                }
            }
        }
        if (this.assignProjectDetail.length > 0) {
            let postDataCreate = {"data": this.assignProjectDetail};
            this.apiService.bulkAddProjectInStaff(postDataCreate).subscribe((response: any) => {
                if (response) {
                    if (response.error) {
                        this.toastr.error(response.message, ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS);
                    } else {
                        this.projectAddFormReset(undefined);
                        this.projectId = null;
                        this.toastr.success(response.message);
                        this.router.navigate(['home/project/view']);
                    }
                }
            }, error => {
                this.showLoader = false;
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        } else {
            this.projectAddFormReset(undefined);
            this.toastr.success('Project added successfully');
            this.router.navigate(['home/project/view']);
        }
    }
    private step = 1;
    private projectDetail: any;
    projectDetailForm() {
        this.step = 1;
    }
    projectTeamForm() {
        if (!this.projectForm.valid) {
            this.projectForm.controls['PROJECT_NAME'].markAsTouched();
            this.projectForm.controls['PROJECT_STATUS'].markAsTouched();
            this.projectForm.controls['START_DATE'].markAsTouched();
            this.projectForm.controls['END_DATE'].markAsTouched();
            this.projectForm.controls['OFFICE'].markAsTouched();
            this.projectForm.controls['PROJECT_CATEGORY'].markAsTouched();
            this.projectForm.controls['PROJECT_TYPE'].markAsTouched();
        } else {
            this.projectDetail = this.projectForm.value;
            this.step = 2;
        }
    }
}
