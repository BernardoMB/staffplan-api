import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ERROR_MESSAGE} from '../../../global/settings';
import {ToastrService} from 'ngx-toastr';
import {AdminServices} from '../../admin.services';
import {ApiService} from '../../../api.service';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnChanges {
    @Input() roleListUpdated: number;
    @Output() childOpenEvent = new EventEmitter();
    public filteredRoleList: Array<string> = [];
    public officeList = [];
    public regionList = [];
    public divisionList = [];
    public filteredOfficeList: Array<string> = [];
    public filteredDivisionList: Array<string> = [];
    public filteredRegionList: Array<string> = [];
    model: any = {
        'OFFICE': [],
        'REGION': [],
        'DIVISION': []
    };

    constructor(private toastr: ToastrService, private adminService: AdminServices, private apiService: ApiService) {
    }

    ngOnInit() {
        this.getRoleList();
        this.getCommonList();
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const change in changes) {
            if (change === 'roleListUpdated' && this.roleListUpdated === 2) {
                this.getRoleList();
            }
        }
    }

    onSubmit(form) {
        const userObject = {
            'ADDRESS': this.model.ADDRESS,
            'CITY': this.model.CITY,
            'COUNTRY': this.model.COUNTRY,
            'EMAIL': this.model.EMAIL,
            'FIRST_NAME': this.model.FIRST_NAME,
            'LAST_NAME': this.model.LAST_NAME,
            'MIDDLE_NAME': this.model.MIDDLE_NAME,
            'PASSWORD': this.model.PASSWORD,
            'ROLE_ID': this.model.ROLE.ID,
            'VERIFIED': true,
            'ZIP': this.model.ZIP
        };
        this.adminService.addUser(userObject).subscribe((response: any) => {
            if (response) {
                if (response.status == 'success') {
                    this.userAccessCreate(response.data.ID, form);
                } else {
                    this.toastr.error(response.message);
                }
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getRoleList() {
        this.adminService.getRoleList().subscribe((response: any) => {
            if (response && response.data) {
                this.filteredRoleList = response.data.slice();
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getCommonList() {
        this.apiService.getCommonListForProject('OFFICE').subscribe((response: any) => {
            if (response && response.data) {
                this.officeList = response.data;
                this.filteredOfficeList = response.data;
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        this.apiService.getCommonListForProject('REGION').subscribe((response: any) => {
            if (response && response.data) {
                this.regionList = response.data;
                this.filteredRegionList = response.data;
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        this.apiService.getCommonListForProject('DIVISION').subscribe((response: any) => {
            if (response && response.data) {
                this.divisionList = response.data;
                this.filteredDivisionList = response.data;
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    openRoleForm() {
        this.childOpenEvent.emit(1);
    }


    private userAccessCreate(userID, form) {
        const userAccess = [];
        if (null != this.model.REGION && this.model.REGION.length > 0) {
            this.model.REGION.map(regionID => {
                let obj = {};
                obj['REGION_ID'] = regionID;
                obj['USER_ID'] = userID;
                userAccess.push(obj);
            });
        }
        if (null != this.model.OFFICE && this.model.OFFICE.length > 0) {
            this.model.OFFICE.map(officeID => {
                let obj = {};
                obj['OFFICE_ID'] = officeID;
                obj['USER_ID'] = userID;
                userAccess.push(obj);
            });
        }
        if (null != this.model.DIVISION && this.model.DIVISION.length > 0) {
            this.model.DIVISION.map(divisionID => {
                let obj = {};
                obj['DIVISION_ID'] = divisionID;
                obj['USER_ID'] = userID;
                userAccess.push(obj);
            });
        }
        let obj = {
            'data': userAccess
        };
        if (userAccess.length > 0) {
            this.adminService.bulkAddUserAccess(obj).subscribe((response: any) => {
                if (response) {
                    if (response.status == 'success') {
                        this.toastr.success('User added successfully');
                        form.resetForm();
                    } else {
                        this.toastr.error(response.message);
                    }
                }
            }, error => {
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        } else {
            this.toastr.success('User added successfully');
            form.resetForm();
        }

    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'OFFICE':
                this.filteredOfficeList = this.officeList.filter((s) => s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'DIVISION':
                this.filteredDivisionList = this.divisionList.filter((s) => s.DIVISION_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'REGION':
                this.filteredRegionList = this.regionList.filter((s) => s.REGION_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }

    }


    public isItemSelected(itemText: string): boolean {
        return this.officeList.some(item => item === itemText);
    }
}
