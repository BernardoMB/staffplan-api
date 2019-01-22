import {Component, OnInit, ChangeDetectorRef, ViewChild, Renderer2, Input, Output, EventEmitter} from '@angular/core';
import {DATE_FORMAT, ERROR_MESSAGE, STATIC_IMAGE, customFieldLabels, STAFF_LOG_CREATE} from '../../global/settings';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../api.service';
import {NgForm} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
    selector: 'app-staff-add',
    templateUrl: './staff-add.component.html',
    styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {
    @ViewChild(NgForm) staffForm: NgForm;
    @Input() addForm: any;
    @Output() childStaffCloseEvent = new EventEmitter();
    private staffStatusList = [];
    private officeList = [];
    private rolesList = [];
    private groupList = [];
    public showLoader = true;
    public allRoles = [];
    public addStaffModel = {
        FIRST_NAME: null,
        MIDDLE_INITIAL: null,
        LAST_NAME: null,
        STAFF_STATUS: null,
        ROLE_DETAIL: null,
        OFFICE: null,
        STAFF_GROUP: null,
        CITY_OF_RESIDENCE: null,
        STATE_OF_RESIDENCE: null,
        ZIP_OF_RESIDENCE: null,
        CELL_NUMBER: null,
        HOME_NUMBER: null,
        WORK_EMAIL: null,
        RELOCATE: false,
        GEOGRAPHICAL_PREFERENCE: null,
        EXPERIENCE: null,
        RESUME: null,
        PROFILE_PIC: null,
        PREFERRED_NAME: null,
        EMPLOYMENT_START_DATE: new Date()
    };
    public profileImageUrl = STATIC_IMAGE;
    public filteredStaffStatusList: Array<string> = [];
    public filteredOfficeList: Array<string> = [];
    public filteredStaffRoleList: Array<string> = [];
    public filteredStaffGroupList: Array<string> = [];
    public addFormLabels;
    public customLabel;

    constructor(private router: Router,
        private chRef: ChangeDetectorRef,
        private toastr: ToastrService,
        private apiService: ApiService,
        private datePipe: DatePipe,
        private renderer: Renderer2,
        private modalService: NgbModal) {}

    ngOnInit() {
        const $that = this;
        const promises = [
            new Promise((resolve, reject) => {
                $that.getStaffStatusList(resolve, reject);
            }),
            new Promise((resolve, reject) => {
                $that.getOfficeNameList(resolve, reject);
            }),
            new Promise((resolve, reject) => {
                $that.getRoleList(resolve, reject);
            }),
            new Promise((resolve, reject) => {
                $that.getGroupList(resolve, reject);
            })
        ];
        this.customLabel = JSON.parse(localStorage.getItem('customFieldNames'));
        this.addFormLabels = customFieldLabels(STAFF_LOG_CREATE, this.customLabel);
    }

    private async getOfficeNameList(resolve, reject) {
        this.apiService.getOfficeNameListing().subscribe((response: any) => {
            if (response && response.data) {
                this.officeList = response.data;
                this.filteredOfficeList = this.officeList.slice();
                return resolve('done');
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return reject('error');
        });
    }

    private async getStaffStatusList(resolve, reject) {
        const $that = this;
        const projectStatus = 'STAFF_STATUS';
        await $that.apiService.getCommonListForProject(projectStatus).subscribe((response: any) => {
            if (response && response.data) {
                $that.staffStatusList = response.data;
                this.addStaffModel.STAFF_STATUS = $that.staffStatusList[0];
                $that.filteredStaffStatusList = $that.staffStatusList.slice();
                return resolve('done');
            }
        }, error => {
            $that.showLoader = false;
            $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return reject('error');
        });
    }


    private async getRoleList(resolve, reject) {
        this.apiService.getRoleList().subscribe((response: any) => {
            if (response && response.data) {
                this.rolesList = response.data;
                this.filteredStaffRoleList = this.rolesList.slice();
                return resolve('done');
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return reject('error');
        });
    }

    private async getGroupList(resolve, reject) {
        const groupType = 'STAFF_GROUP';
        this.apiService.getCommonListForProject(groupType).subscribe((response: any) => {
            if (response && response.data) {
                this.groupList = response.data;
                this.filteredStaffGroupList = this.groupList.slice();
                return resolve('done');
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return reject('error');
        });
    }

    public handleFormFilterChange(value, column) {
        switch (column) {
            case 'STAFF_STATUS':
                this.filteredStaffStatusList = this.staffStatusList.filter((s) =>
                s.STATUS_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'OFFICE':
                this.filteredOfficeList = this.officeList.filter((s) => s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'ROLE_DETAIL':
                this.filteredStaffRoleList = this.rolesList.filter((s) => s.ROLE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'STAFF_GROUP':
                this.filteredStaffGroupList = this.groupList.filter((s) => s.GROUP_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }
    }

    public saveStaffDetail() {
        if (this.staffForm.valid) {
            const staffData = {
                'FIRST_NAME': this.staffForm.value.FIRST_NAME + ' ',
                'MIDDLE_INITIAL': this.staffForm.value.MIDDLE_INITIAL,
                'LAST_NAME': ' ' + this.staffForm.value.LAST_NAME,
                'EMAIL_ID': this.staffForm.value.WORK_EMAIL,
                'PHONE_1': this.staffForm.value.CELL_NUMBER,
                'PHONE_2': this.staffForm.value.HOME_NUMBER,
                'HOME_CITY': this.staffForm.value.CITY_OF_RESIDENCE,
                'HOME_STATE': this.staffForm.value.STATE_OF_RESIDENCE,
                'HOME_ZIP': this.staffForm.value.ZIP_OF_RESIDENCE,
                'OFFICE_ID': this.staffForm.value.OFFICE.OFFICE_ID,
                'STAFF_ROLE_ID': this.staffForm.value.ROLE_DETAIL.ROLE_ID,
                'STAFF_STATUS_ID': this.staffForm.value.STAFF_STATUS.STATUS_ID,
                'STAFF_GROUP_ID': this.staffForm.value.STAFF_GROUP.GROUP_ID,
                'PREFERRED_NAME': this.staffForm.value.PREFERRED_NAME,
                'EMPLOYMENT_START_DATE': this.datePipe.transform(this.staffForm.value.EMPLOYMENT_START_DATE, 'yyyy-MM-dd')
            };
            if (this.staffForm.value.CELL_NUMBER != null) {
                staffData['PHONE_1_TYPE'] = 'Cell';
            }
            if (this.staffForm.value.HOME_NUMBER != null) {
                staffData['PHONE_2_TYPE'] = 'Home';
            }
            this.apiService.addStaffDetail(staffData).subscribe((response: any) => {
                if (response) {
                    if (response.error === true) {
                        this.toastr.error(response.message, ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS);
                    } else {
                        const formData: FormData = new FormData();
                        formData.append('file', this.addStaffModel.PROFILE_PIC);
                        if (this.addStaffModel.PROFILE_PIC != null) {
                            this.apiService.uploadStaffProfilePic(formData, response.STAFF_ID).subscribe((response: any) => {
                                if (response) {
                                    if (response.error === true) {
                                        this.toastr.error(response.message, ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS);
                                    } else {
                                        this.staffFormReset(undefined);
                                        this.toastr.success('Staff detail created successfully.');
                                        this.childStaffCloseEvent.emit(1);
                                    }
                                }
                            }, error => {
                                this.showLoader = false;
                                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                            });
                        } else {
                            this.staffFormReset(undefined);
                            this.childStaffCloseEvent.emit(1);
                            this.toastr.success('Staff detail created successfully.');
                        }
                    }
                }
            }, error => {
                this.showLoader = false;
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        }
    }

    public staffFormReset(isCancel: any) {
        if (typeof this.staffForm !== 'undefined') {
            this.staffForm.resetForm();
        }
        this.addStaffModel.PROFILE_PIC = null;
        if (isCancel) {
            this.childStaffCloseEvent.emit(0);
        }
    }

    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            this.addStaffModel.PROFILE_PIC = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (e: any) => {
                this.profileImageUrl = e.target && e.target.result ? e.target.result : '';
            };
        }
    }
}
