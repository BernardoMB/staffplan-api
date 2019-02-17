import {Component, Input, OnInit, ChangeDetectorRef, EventEmitter, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    ERROR_MESSAGE,
    BASE_URL,
    getColumnsList,
    HIDDEN_STAFF_DETAILS_COLUMNS,
    STAFF_PROJECT_DETAILS_COLUMNS,
    ERROR_MESSAGE_REQUIRED,
    DATE_FORMAT,
    convertToUTC,
    convertDateToUTC
} from '../../global/settings';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../api.service';
import {SortDescriptor, orderBy} from '@progress/kendo-data-query';

@Component({
    selector: 'app-staff-view-project-details-grid',
    templateUrl: './staff-view-project-details-grid.component.html',
    styleUrls: ['./staff-view-project-details-grid.component.css']
})
export class StaffViewProjectDetailsGridComponent implements OnInit {

    @Input() staffInstance: any;
    public gridView: GridDataResult;
    private projectList = [];
    private rolesList = [];
    private allProjects = [];
    private allRoles = [];
    @Output() childDeleteEvent = new EventEmitter();
    private staffDetailsData = [];
    private showLoader = true;
    private editableData;
    private customColumnsName = {
        'ROLE_NAME': 'Project Role',
        'ALLOCATION': '% Allocation'
    };
    private columnOrdering = {
        'PROJECT_NAME': 0,
        'ROLE_NAME': 1
    };
    private todayDate = new Date();
    private editedRowIndex: number;
    private autoCorrect: boolean = true;
    private maxDate = new Date(2100, 0, 1, 0, 0, 0);
    private minDate = new Date(2000, 0, 1, 0, 0, 0);
    private modalDataInstance: any;
    public model: any = {};
    public formGroup: FormGroup;
    public addNewRecord = false;
    public filteredProjectsList: Array<string> = [];
    public filteredRolesList: Array<string> = [];
    public sort: SortDescriptor[] = [{
        field: 'END_DATE',
        dir: 'desc'
    }];
    public staffDetailColumns = [];
    public date_format = DATE_FORMAT;
    public showDetailsLoader = true;

    constructor(private http: HttpClient, private chRef: ChangeDetectorRef, private datePipe: DatePipe, private toastr: ToastrService, private apiService: ApiService,) {
    }

    async ngOnInit() {
        const $that = this;
        $that.getProjectList();
        $that.getRoleList();
        await this.getStaffDetails();
    }

    public getStaffDetails() {
        this.apiService.getPeopleProject(this.staffInstance.STAFF_ID).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                this.staffDetailColumns = getColumnsList(response.data[0], HIDDEN_STAFF_DETAILS_COLUMNS, this.customColumnsName, this.columnOrdering);
            } else {
                this.staffDetailColumns = STAFF_PROJECT_DETAILS_COLUMNS;
            }
            for (let index in response.data) {
                response.data[index]['START_DATE'] = convertToUTC(response.data[index]['START_DATE']);
                response.data[index]['END_DATE'] = convertToUTC(response.data[index]['END_DATE']);
                if (response.data[index]['CONFIRMED'] == null || response.data[index]['CONFIRMED'] == 0) {
                    response.data[index]['CONFIRMED'] = false;
                } else if (response.data[index]['CONFIRMED'] == 1) {
                    response.data[index]['CONFIRMED'] = true;
                }
                if (response.data[index]['PROJECT_STATUS_ID'] == 2 || response.data[index]['PROJECT_STATUS_ID'] == 3) {
                    if (response.data[index]['START_DATE'] <= this.todayDate) {
                        response.data[index]['COLUMN_EDITABLE'] = 2;
                    } else {
                        response.data[index]['COLUMN_EDITABLE'] = 1;
                    }
                } else {
                    response.data[index]['COLUMN_EDITABLE'] = 1;
                }
            }
            this.staffDetailsData = response.data;
            this.showDetailsLoader = false;
            this.loadProjectStaff();
            this.chRef.detectChanges();
        }, error => {
            this.showDetailsLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });

    }

    getProjectList() {
        this.apiService.getProjectsList({}).subscribe((response: any) => {
            if (response && response.data) {
                this.projectList = response.data.filter((s) => s.PROJECT_STATUS_ID == 1 || s.PROJECT_STATUS_ID == 2 || s.PROJECT_STATUS_ID == 3);
                this.filteredProjectsList = this.projectList;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getRoleList() {
        this.apiService.getRoleList().subscribe((response: any) => {
            if (response && response.data) {
                this.allRoles = response.data;
                this.rolesList = response.data;
                this.filteredRolesList = this.rolesList.slice();
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        if (!this.editableData) {
            return;
        }
        const originalDataItem = this.staffDetailsData.find(item => item.STAFF_ID === this.editableData.STAFF_ID && item.PROJECT_ID === this.editableData.PROJECT_ID);
        Object.assign(originalDataItem, this.editableData);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
        this.addNewRecord = false;
        this.editableData = undefined;
    }

    private contains = value => s => s.toLowerCase().indexOf(value.toLowerCase()) !== -1;

    public addHandler({sender}) {
        this.model.ROLE = this.allRoles.find(x => x.ROLE_ID == this.staffInstance.STAFF_ROLE_ID);
        this.closeEditor(sender);
        this.addNewRecord = true;
        this.formGroup = new FormGroup({
            'PROJECT_ID': new FormControl('', Validators.required),
            'ROLE_ID': new FormControl(this.staffInstance.STAFF_ROLE_ID, Validators.required),
            'START_DATE': new FormControl(new Date(), Validators.required),
            'END_DATE': new FormControl(new Date(), Validators.required),
            'ALLOCATION': new FormControl(100, Validators.required),
            'CONFIRMED': new FormControl(true, Validators.required)
        });
        sender.addRow(this.formGroup);
    }

    public editHandler({sender, rowIndex, dataItem}) {
        this.addNewRecord = false;
        this.model.ROLE = this.allRoles.find(x => x.ROLE_ID == dataItem.PROJECT_ROLE_ID);
        this.closeEditor(sender);
        this.formGroup = new FormGroup({
            'PROJECT_ID': new FormControl(dataItem.PROJECT_ID, Validators.required),
            'ROLE_ID': new FormControl(dataItem.PROJECT_ROLE_ID, Validators.required),
            'START_DATE': new FormControl(dataItem.START_DATE, Validators.required),
            'END_DATE': new FormControl(dataItem.END_DATE, Validators.required),
            'ALLOCATION': new FormControl(dataItem.ALLOCATION, Validators.required),
            'CONFIRMED': new FormControl(dataItem.CONFIRMED, Validators.required)
        });
        this.editedRowIndex = rowIndex;
        this.editableData = Object.assign({}, dataItem);
        sender.editRow(rowIndex, this.formGroup);
    }

    public cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({sender, rowIndex, formGroup, isNew}) {
        const formValues = formGroup.value;
        let SDate = convertDateToUTC(formValues.START_DATE);
        let EDate = convertDateToUTC(formValues.END_DATE);
        if (SDate > EDate) {
            this.toastr.error('End date must be bigger than start date');
        } else if (formValues.PROJECT_ID == null || formValues.ROLE_ID == null || formValues.ALLOCATION == null) {
            this.toastr.error(ERROR_MESSAGE_REQUIRED.ERROR_MESSAGE_TEXT, ERROR_MESSAGE_REQUIRED.ERROR_MESSAGE_HEADING);
        } else {
            let postJSON = {
                'STAFF_ID': this.staffInstance.STAFF_ID,
                'PROJECT_ID': formValues.PROJECT_ID,
                'START_DATE': this.datePipe.transform(formValues.START_DATE, 'yyyy-MM-dd'),
                'END_DATE': this.datePipe.transform(formValues.END_DATE, 'yyyy-MM-dd'),
                'ALLOCATION': formValues.ALLOCATION,
                'PROJECT_ROLE_ID': formValues.ROLE_ID,
                'CONFIRMED': formValues.CONFIRMED
            };
            if (isNew) {
                this.apiService.addProjectInStaff(postJSON).subscribe((response: any) => {
                    if (response) {
                        if (response.error) {
                            this.toastr.error(response.message);
                        } else {
                            this.toastr.success('Successfully add action is performed.', 'Success');
                            sender.closeRow(rowIndex);
                            this.addNewRecord = false;
                            this.getStaffDetails();
                            this.editedRowIndex = undefined;
                            this.editableData = undefined;
                        }
                    }
                }, error => {
                    this.showDetailsLoader = false;
                    this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                });
            } else {
                this.apiService.updateProjectInStaff(postJSON).subscribe((response: any) => {
                    if (response) {
                        if (response.error) {
                            this.toastr.error(response.message);
                        } else {
                            this.toastr.success('Successfully update action is performed.', 'Success');
                            sender.closeRow(rowIndex);
                            this.addNewRecord = false;
                            this.getStaffDetails();
                            this.editedRowIndex = undefined;
                            this.editableData = undefined;
                        }
                    }
                }, error => {
                    this.showDetailsLoader = false;
                    this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                });
            }

        }
    }

    public removeHandler(dataItem) {
        let postJSON = {
            'STAFF_ID': dataItem.STAFF_ID,
            'PROJECT_ID': dataItem.PROJECT_ID,
            'PROJECT_STATUS_ID': dataItem.PROJECT_STATUS_ID
        };
        this.apiService.deleteProjectInStaff(postJSON).subscribe((response: any) => {
            if (response) {
                if (response.error) {
                    this.toastr.error(response.message);
                } else {
                    this.toastr.success('Successfully delete action is performed.', 'Success');
                    this.getStaffDetails();
                }
            }
        }, error => {
            this.showDetailsLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });

    }

    public handleValueChange(value, column) {
        if (column === 'START_DATE') {
            this.minDate = new Date(value);
        } else if (column === 'END_DATE') {
            this.maxDate = new Date(value);
        } else if (column === 'PROJECT_ID') {
            value = value.PROJECT_ID;
        } else if (column === 'ROLE_ID') {
            value = value.ROLE_ID;
        }
        this.formGroup.get(column).setValue(value);
    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'PROJECT_ID':
                this.filteredProjectsList = this.projectList.filter((s) => s.PROJECT_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'ROLE_ID':
                this.filteredRolesList = this.rolesList.filter((s) => s.ROLE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }
    }

    public openDialogForDelete(dataItem) {
        this.childDeleteEvent.emit(dataItem);
        this.modalDataInstance = dataItem;
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadProjectStaff();
    }

    private loadProjectStaff(): void {
        this.gridView = {
            data: orderBy(this.staffDetailsData, this.sort),
            total: this.staffDetailsData.length
        };
    }
}
