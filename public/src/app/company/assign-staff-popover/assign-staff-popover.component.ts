import {Component, EventEmitter, OnInit, Output, Input, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../api.service';
import {ToastrService} from 'ngx-toastr';
import {
    ERROR_MESSAGE,
    DATE_FORMAT,
    STATIC_IMAGE,
    dateValidation,
    IMAGE_PATH,
} from '../../global/settings';
import {DatePipe} from '@angular/common';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
    selector: 'app-assign-staff-popover',
    templateUrl: './assign-staff-popover.component.html',
    styleUrls: ['./assign-staff-popover.component.css']
})
export class AssignStaffPopoverComponent implements OnInit {
    @Output() assignStaffChildCloseEvent = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() openAssignStaffDialog: any;
    @Input() model: any;
    @ViewChild(NgForm) editForm: NgForm;
    @Input() addForm: any;
    @Input() staffIdForEditStaff;
    // @ViewChild('ROLE_START_DATE') role_start_date;
    // @ViewChild('ROLE_END_DATE') role_end_date;
    public STATIC_IMAGE = STATIC_IMAGE;
    private childDeletePopupMessage = [];
    private projectList = [];
    private endDateMatch = false;
    private staffList = [];
    private rolesList = [];
    private showPopover = false;
    public selectedProject = null;
    public autoCorrect = true;
    public date_format = DATE_FORMAT;
    public fieldNotEditable = false;
    public selectedStaff = null;
    public assignStaffModel = {
        STAFF_DETAIL: null,
        PROJECT_DETAIL: null,
        ROLE_DETAIL: null,
        START_DATE: new Date(),
        END_DATE: new Date(),
        ALLOCATION: 100
    };
    private todayDate = new Date();
    public active = true;
    public columnEditable = 1;
    public filteredProjectsList = [];
    public filteredRolesList: Array<string> = [];
    public filteredStaffList: Array<string> = [];
    public dateValidationMsg = '';
    public imagePath = IMAGE_PATH;
    public showDetailsLoader = true;
    public availableStaff = [];
    public availableAllStaff = [];
    public availableProject = [];
    public availableAllProject = [];
    public searchValueForAvailableStaff = null;
    public searchValueForAvailableProject = null;
    public staffNotEditable = false;
    private plannedProjectId = null;

    constructor(private toastr: ToastrService, private apiService: ApiService, private datePipe: DatePipe) {
    }

    ngOnInit() {
        const $that = this;
        const promises = [
            new Promise((resolve, reject) => {
                $that.getProjectList(resolve, reject);
            }),
            new Promise((resolve, reject) => {
                $that.getRoleList(resolve, reject);
            }),
            new Promise((resolve, reject) => {
                $that.getStaffList(resolve, reject);
            }),

        ];
        Promise.all(promises)
            .then(data => {
                this.staffAssignFormEdit();
            });
        if (this.addForm == 1) {
            this.showDetailsLoader = false;
            this.getAvailableStaff({
                'EMPTY': 1
            });
        }
    }

    private staffAssignFormEdit() {
        if (this.model != null) {
            this.assignStaffModel.START_DATE = this.model.START_DATE;
            this.assignStaffModel.END_DATE = this.model.END_DATE;
            this.assignStaffModel.ALLOCATION = toInteger(this.model.ALLOCATION);
            this.assignStaffModel.ROLE_DETAIL = this.rolesList.find(x => x.ROLE_ID == this.model.PROJECT_ROLE_ID);
            if (!('STAFF_ID' in this.model)) {
                this.assignStaffModel.STAFF_DETAIL = null;
            } else {
                this.assignStaffModel.STAFF_DETAIL = this.staffList.find(x => x.STAFF_ID == this.model.STAFF_ID);
            }

            if (this.model.PROJECT_STATUS_ID == 2 || this.model.PROJECT_STATUS_ID == 3) {
                if (this.model.START_DATE <= this.todayDate) {
                    this.columnEditable = 2;
                } else {
                    this.columnEditable = 1;
                }
            } else {
                this.columnEditable = 1;
            }
            this.assignStaffModel.PROJECT_DETAIL = this.filteredProjectsList.find(x => x.PROJECT_ID == this.model.PROJECT_ID);

            this.fieldNotEditable = true;
            if (this.model.STAFF_ID) {
                this.getDependentList(this.model, 'STAFF_ID');
            }
            this.getDependentList(this.model, 'PROJECT_ID');
            if (this.model.ID) {
                this.getAvailableStaff({
                    'ROLE_ID': this.model.PROJECT_ROLE_ID,
                    'START_DATE': this.model.START_DATE,
                    'END_DATE': this.model.END_DATE
                });
            }
            this.getAvailableProject({
                'PROJECT_ROLE_ID': this.model.PROJECT_ROLE_ID,

            });
        }
        if (this.staffIdForEditStaff) {
            this.assignStaffModel.STAFF_DETAIL = this.staffList.find(x => x.STAFF_ID == this.staffIdForEditStaff);
            this.assignStaffModel.ROLE_DETAIL = this.rolesList.find(x => x.ROLE_ID == this.assignStaffModel.STAFF_DETAIL.STAFF_ROLE_ID);
            const obj = {
                STAFF_ID: this.staffIdForEditStaff
            };
            this.getDependentList(obj, 'STAFF_ID');
            this.getAvailableProject({
                'PROJECT_ROLE_ID': this.assignStaffModel.STAFF_DETAIL.STAFF_ROLE_ID,

            });
        }
    }

    getRoleList(resolve, reject) {
        this.apiService.getRoleList().subscribe((response: any) => {
            if (response && response.data) {
                this.rolesList = response.data;
                this.filteredRolesList = this.rolesList.slice();
                return resolve('done');
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return resolve('error');
        });
    }

    getStaffList(resolve, reject) {
        this.apiService.getStaffList({}).subscribe((response: any) => {
            if (response && response.data) {
                this.staffList = response.data;
                for (const key in this.staffList) {
                    this.staffList[key]['STAFF_NAME'] = this.staffList[key]['FIRST_NAME'] + this.staffList[key]['MIDDLE_INITIAL'] + this.staffList[key]['LAST_NAME'];
                }
                this.filteredStaffList = this.staffList.slice();
                return resolve('done');
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return resolve('error');
        });
    }

    getProjectList(resolve, reject) {
        this.apiService.getProjectsList({}).subscribe((response: any) => {
            if (response && response.data) {
                this.projectList = response.data.filter((s) => s.PROJECT_STATUS_ID == 1 || s.PROJECT_STATUS_ID == 2 || s.PROJECT_STATUS_ID == 3);
                this.filteredProjectsList = response.data.slice();
                return resolve('done');
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return resolve('error');
        });
    }

    getAvailableStaff(postJson) {
        // this.showDetailsLoader = true;
        this.apiService.getAvailableStaff(postJson).subscribe((response: any) => {
            if (response && response.data) {
                // const staff = response.data.filter(x => x.STAFF_ID !== this.assignStaffModel.STAFF_DETAIL.STAFF_ID);
                this.availableStaff = response.data;
                this.availableAllStaff = response.data;
                // this.showDetailsLoader = false;
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getAvailableProject(postJson) {
        this.apiService.getAvailableProject(postJson).subscribe((response: any) => {
            if (response && response.data) {
                for (let key in response.data) {
                    response.data[key]['START_DATE'] = new Date(response.data[key]['PLANNED_START_DATE']);
                    response.data[key]['END_DATE'] = new Date(response.data[key]['PLANNED_END_DATE']);
                }
                this.availableProject = response.data;
                this.availableAllProject = response.data;
                // for (let item, i = 0; item = items[i++];) {
                //     let id = item.PROJECT_ID;
                //     if (!(id in lookup)) {
                //         lookup[id] = 1;
                //         this.availableProject.push(item);
                //         this.availableAllProject.push(item);
                //     }
                // }
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'PROJECT_ID':
                this.filteredProjectsList = this.projectList.filter((s) => s.PROJECT_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'ROLE_ID':
                this.filteredRolesList = this.rolesList.filter((s) => s.ROLE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'STAFF_ID':
                this.filteredStaffList = this.staffList.filter((s) => s.STAFF_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }
    }

    public getDependentList(value, column) {
        const $that = this;
        if (column === 'STAFF_ID') {
            $that.apiService.getStaffDetails(value.STAFF_ID).subscribe((response: any) => {
                $that.selectedStaff = response.data;
            }, error => {
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        } else if (column === 'PROJECT_ID') {
            $that.apiService.getProjectDetails(value.PROJECT_ID).subscribe((response: any) => {
                $that.selectedProject = response.data;
            }, error => {
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        }
        $that.showDetailsLoader = false;
    }

    public handleValueChange(value, column) {
        const $that = this;
        if (column === 'STAFF_ID') {
            if (this.model == null) {
                $that.assignStaffModel.ROLE_DETAIL = this.rolesList.find(x => x.ROLE_ID == value.STAFF_ROLE_ID);
            }
            $that.getDependentList(value, column);
        } else if (column == 'PROJECT_ID') {
            $that.showDetailsLoader = true;
            $that.getDependentList(value, column);
            console.log(value);
            $that.assignStaffModel.START_DATE = new Date(value.START_DATE);
            $that.assignStaffModel.END_DATE = new Date(value.END_DATE);
        }
        if (this.staffIdForEditStaff || this.addForm == 1 || this.model && this.model.ID) {
            if ($that.assignStaffModel.ROLE_DETAIL != null && $that.assignStaffModel.PROJECT_DETAIL != null) {
                $that.getAvailableStaff({
                    'ROLE_ID': $that.assignStaffModel.ROLE_DETAIL.ROLE_ID,
                    'START_DATE': $that.assignStaffModel.PROJECT_DETAIL.START_DATE,
                    'END_DATE': $that.assignStaffModel.PROJECT_DETAIL.END_DATE
                });
            } else if ($that.assignStaffModel.ROLE_DETAIL != null) {
                $that.getAvailableStaff({
                    'ROLE_ID': $that.assignStaffModel.ROLE_DETAIL.ROLE_ID,
                });
            } else if ($that.assignStaffModel.PROJECT_DETAIL != null) {
                $that.getAvailableStaff({
                    'START_DATE': $that.assignStaffModel.PROJECT_DETAIL.START_DATE,
                    'END_DATE': $that.assignStaffModel.PROJECT_DETAIL.END_DATE
                });
            }
        }
    }

    public onSave(e): void {
        if (this.selectedProject != null) {
            const obj = {
                'START_DATE': new Date(this.selectedProject.START_DATE),
                'END_DATE': new Date(this.selectedProject.END_DATE),
            };
            const validation = dateValidation(obj, this.assignStaffModel);
            if (validation.key == 'START_DATE') {
                this.editForm.controls['START_DATE'].setErrors({
                    'dateMatch': true
                });
                this.dateValidationMsg = validation.validationString;
            } else {
                this.editForm.controls['START_DATE'].setErrors(null);
            }
            if (validation.key == 'END_DATE') {
                this.editForm.controls['END_DATE'].setErrors({
                    'dateMatch': true
                });
                this.dateValidationMsg = validation.validationString;
            } else {
                this.editForm.controls['END_DATE'].setErrors(null);
            }
        }
        if (this.editForm.valid) {
            const postJSON = {
                'PROJECT_ID': this.editForm.value.PROJECT_DETAIL.PROJECT_ID,
                'START_DATE': this.datePipe.transform(this.editForm.value.START_DATE, 'yyyy-MM-dd'),
                'END_DATE': this.datePipe.transform(this.editForm.value.END_DATE, 'yyyy-MM-dd'),
                'ALLOCATION': this.editForm.value.ALLOCATION,
                'PROJECT_ROLE_ID': this.editForm.value.ROLE_DETAIL.ROLE_ID,
                'EXPERIENCE_ID': ''
            };
            if (this.editForm.value.STAFF_DETAIL != null) {
                postJSON['STAFF_ID'] = this.editForm.value.STAFF_DETAIL.STAFF_ID;
            }
            if (typeof this.model != 'undefined' && this.model != null) {
                if (this.model != null && ('ID' in this.model)) {
                    postJSON['PLANNED_PROJECT_PEOPLE_ID'] = this.model.ID;
                } else if (this.plannedProjectId) {
                    postJSON['PLANNED_PROJECT_PEOPLE_ID'] = this.plannedProjectId;
                }
                if (this.editForm.value.STAFF_DETAIL != null && 'STAFF_ID' in this.model && this.model.STAFF_ID != this.editForm.value.STAFF_DETAIL.STAFF_ID || this.model.PROJECT_ID != this.editForm.value.PROJECT_DETAIL.PROJECT_ID) {
                    this.apiService.addProjectInStaff(postJSON).subscribe((response: any) => {
                        if (response) {
                            if (response.error) {
                                this.toastr.error(response.message);
                            } else {
                                this.toastr.success('Successfully add action is performed.', 'Success');
                                this.assignStaffChildCloseEvent.emit(1);
                                this.active = false;
                            }
                        }
                    }, error => {
                        this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                    });
                } else {
                    this.apiService.updateProjectInStaff(postJSON).subscribe((response: any) => {
                        if (response) {
                            if (response.error) {
                                this.toastr.error(response.message);
                            } else {
                                this.toastr.success('Successfully update action is performed.', 'Success');
                                this.assignStaffChildCloseEvent.emit(1);
                                this.active = false;
                            }
                        }
                    }, error => {
                        this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                    });
                }

            } else {
                if (this.plannedProjectId) {
                    postJSON['PLANNED_PROJECT_PEOPLE_ID'] = this.plannedProjectId;
                }
                this.apiService.addProjectInStaff(postJSON).subscribe((response: any) => {
                    if (response) {
                        if (response.error) {
                            this.toastr.error(response.message);
                        } else {
                            this.toastr.success('Successfully add action is performed.', 'Success');
                            this.assignStaffChildCloseEvent.emit(1);
                            this.active = false;
                        }
                    }
                }, error => {
                    this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                });
            }

        }
    }

    public deleteEvent(dataItem) {
        this.childDeletePopupMessage = [];
        if (dataItem.PROJECT_STATUS_ID !== 1 && !dataItem.hasOwnProperty('ADD_RECORD')) {
            this.childDeletePopupMessage = ['Selected Project is Initiated/Ongoing and cannot be deleted,', 'End Date for the particular Assignment will be changed with Today\'s Date.', 'Are you sure you want to perform this action?'];
        } else if (!dataItem.hasOwnProperty('STAFF_ID')) {
            this.childDeletePopupMessage = ['Are you sure you want to delete the assignment?'];
        } else {
            this.childDeletePopupMessage = ['Are you sure you want to delete the assignment?'];
        }
        this.showPopover = true;
    }

    public deleteDialogAction(dataItem) {
        const postJSON = {
            'PROJECT_ID': dataItem.PROJECT_ID,
            'PROJECT_STATUS_ID': dataItem.PROJECT_STATUS_ID
        };
        if ('ID' in dataItem) {
            postJSON['PLANNED_EMPLOYEE_ID'] = dataItem.ID;
        } else {
            postJSON['STAFF_ID'] = dataItem.STAFF_ID;
        }
        this.apiService.deleteProjectInStaff(postJSON).subscribe((response: any) => {
            if (response) {
                if (response.error) {
                    this.toastr.error(response.message);
                } else {
                    this.toastr.success('Successfully delete action is performed.', 'Success');
                    this.assignStaffChildCloseEvent.emit(1);
                    this.active = false;
                }
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });

    }

    public onCancel() {
        this.active = false;
        this.assignStaffChildCloseEvent.emit(2);
    }

    public closeDialog() {
        this.showPopover = false;
    }

    public errorHandler(event) {
        event.target.src = STATIC_IMAGE;
    }

    public searchAvailableStaff() {
        this.availableStaff = this.availableAllStaff.filter((s) => s.STAFF_NAME.toLowerCase().indexOf(this.searchValueForAvailableStaff.toLowerCase()) !== -1);
    }

    public searchAvailableStaffCancel() {
        this.searchValueForAvailableStaff = null;
        this.availableStaff = this.availableAllStaff;
    }

    public searchAvailableProject() {
        this.availableProject = this.availableAllProject.filter((p) => p.PROJECT_NAME.toLowerCase().indexOf(this.searchValueForAvailableProject.toLowerCase()) !== -1);
    }

    public searchAvailableProjectRemove() {
        this.searchValueForAvailableProject = null;
        this.availableProject = this.availableAllProject;
    }

    public assignNewStaff(data) {

        this.fieldNotEditable = false;
        const projectDetail = {...this.assignStaffModel.PROJECT_DETAIL};
        this.assignStaffModel.STAFF_DETAIL = this.staffList.find(x => x.STAFF_ID == data.STAFF_ID);
        this.assignStaffModel.PROJECT_DETAIL = projectDetail;
        if (this.addForm == 1 || this.staffIdForEditStaff) {
            this.assignStaffModel.ROLE_DETAIL = this.rolesList.find(x => x.ROLE_ID == this.assignStaffModel.STAFF_DETAIL.STAFF_ROLE_ID);
        }
        this.staffNotEditable = true;
        this.columnEditable = 1;

        const obj = {
            STAFF_ID: data.STAFF_ID
        };
        this.getDependentList(obj, 'STAFF_ID');
    }

    public assignNewProject(data) {
        this.staffNotEditable = true;
        const staffDetail = {...this.assignStaffModel.STAFF_DETAIL};
        this.assignStaffModel.PROJECT_DETAIL = this.projectList.find(x => x.PROJECT_ID == data.PROJECT_ID);
        this.assignStaffModel.STAFF_DETAIL = staffDetail;
        this.assignStaffModel.START_DATE = new Date(data.PLANNED_START_DATE);
        this.assignStaffModel.ALLOCATION = data.ALLOCATION;
        this.columnEditable = 1;
        this.assignStaffModel.END_DATE = new Date(data.PLANNED_END_DATE);
        this.plannedProjectId = data.ID;
        const obj = {
            PROJECT_ID: data.PROJECT_ID
        };
        this.getDependentList(obj, 'PROJECT_ID');
    }
}
