import {Component, OnInit, ChangeDetectorRef, ViewChild, Input, OnDestroy} from '@angular/core';
import {DataStateChangeEvent, GridComponent, GridDataResult} from '@progress/kendo-angular-grid';
import {
    getColumnsList,
    HIDDEN_STAFF_ASSIGNMENT_COLUMNS,
    DATE_FORMAT,
    ERROR_MESSAGE,
    STAFF_ASSIGNMENT_ALL_COLUMNS,
    customFieldNames,
    convertToUTC,
    convertDateToUTC
} from '../../global/settings';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../api.service';
import {process, State, GroupDescriptor, groupBy} from '@progress/kendo-data-query';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ProjectViewStaffDetailPopoverComponent} from '../project-view-staff-detail-popover/project-view-staff-detail-popover.component';
import {ExcelExportData} from '@progress/kendo-angular-excel-export';

@Component({
    selector: 'app-staff-assignment',
    templateUrl: './staff-assignment.component.html',
    styleUrls: ['./staff-assignment.component.css']
})
export class StaffAssignmentComponent implements OnInit, OnDestroy {
    @ViewChild(GridComponent) private grid: GridComponent;
    @ViewChild(ProjectViewStaffDetailPopoverComponent) child: ProjectViewStaffDetailPopoverComponent;

    private modalRef: NgbModalRef;
    private allAssignStaffData = [];
    public date_format = DATE_FORMAT;
    public staffIdForEditStaff;
    public selectedProject = null;
    private autoCorrect = true;
    private assignedData = [];
    private unAssignedData = [];
    private customColumnsName = {
        'ROLE_NAME': 'Project Role',
        'STATUS_NAME': 'Project Status',
        'ALLOCATION': '%Allocation',
        'STAFF_ASSIGNMENT': 'Assignment Status',
        'STAFF_NAME': 'Staff',
        'PROJECT_NAME': 'Project'
    };
    private columnOrdering = {
        'STAFF_NAME': 0,
        'PROJECT_NAME': 1,
        'ROLE_NAME': 2,
        'STATUS_NAME': 3,
        'START_DATE': 4,
        'END_DATE': 5,
        'STAFF_STATUS_NAME': 6
    };
    private subscription;
    public groups: GroupDescriptor[] = [{field: 'STAFF_NAME'}];
    public columnListGrouping: Array<string> = ['Clear', 'Staff Name', 'Project Name'];
    public renderTable = false;
    public showInternalLoader = false;
    public editDataItem: any;
    public showLoader = true;
    public allColumns = [];
    public config: State = {
        group: [{field: 'STAFF_NAME'}]
    };
    public assignStaffData: GridDataResult = process([], this.config);
    public filterValue = '';
    public gridHeight: any;
    public typeAheadSuggestions = [];
    public openAssignStaffDialog = false;
    public showColumnPopup = false;
    public showFilterPopup = false;
    public tabStatus: number;
    public model = {
        status: null,
        role: null,
        office: null
    };
    public viewDataByFilter = {status: null, role: null, office: null};
    public filterMenuOpen = false;
    public projectStatusData = [];
    public filterProjectStatusData = [];
    public projectRoleData = [];
    public officeData = [];
    public filterProjectRoleData = [];
    public popupClass = 'custom-dropdown-list';
    public displayProjectType = null;
    public viewPortHeight = 450;
    public customColumnNames;
    public filteredOfficeList = [];

    constructor(private chRef: ChangeDetectorRef,
        private toastr: ToastrService,
        private apiService: ApiService,
        private modalService: NgbModal,
        private datePipe: DatePipe) {
        this.subscription = this.apiService.assStaffUrlStatus.subscribe(res => {
            if (res != null) {
                this.onProjectTeamFilterSubmit(undefined);
                this.filterValue = res;
            }
        });
    }

    ngOnInit() {
        const $that = this;
        $that.gridHeight = window.innerHeight - 120;
        $that.getAllStaffAssignDetails();
        $that.getCommonList();
        this.customColumnNames = JSON.parse(localStorage.getItem('customFieldNames'));
        this.viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 330;
        this.allData = this.allData.bind(this);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.apiService.redirectAssStaff.next(null);
    }

    getAllStaffAssignDetails() {
        const $that = this;
        let filterValue = {};
        if ($that.filterValue === 'staffGap') {
            $that.filterValue = '';
            this.displayProjectType = 'Staffing Gap';
            filterValue = {
                'STAFFGAP': '1'
            };
        } else if ($that.filterValue === 'overUnder') {
            $that.filterValue = '';
            this.displayProjectType = 'Over/Under Allocation';
            filterValue = {
                'STAFFGAP': 'OVERUNDER'
            };
        } else if ($that.filterValue === 'assignEnd') {
            $that.filterValue = '';
            this.displayProjectType = 'Assignment Ending';
            filterValue = {
                'STAFFGAP': 'ASSIGNMENTENDING'
            };
        } else {
            filterValue = {
                'ADVANCE_SEARCH': $that.filterValue
            };
        }

        $that.apiService.getProjectPeopleAndPlannedProject(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                $that.allColumns =
                getColumnsList(response.data[0], HIDDEN_STAFF_ASSIGNMENT_COLUMNS, this.customColumnsName, this.columnOrdering);
            } else {
                $that.allColumns = STAFF_ASSIGNMENT_ALL_COLUMNS;
            }
            $that.allColumns = customFieldNames($that.allColumns, $that.customColumnNames);
            this.assignedData = [];
            this.unAssignedData = [];
            for (const index in response.data) {
                response.data[index]['END_DATE'] = convertToUTC(response.data[index]['END_DATE']);
                response.data[index]['START_DATE'] = convertToUTC(response.data[index]['START_DATE']);
                response.data[index]['RESUME_SUBMITTED'] = (response.data[index]['RESUME_SUBMITTED'] == '0') ? 'No' : 'Yes';
                if ('STAFF_ID' in response.data[index]) {
                    this.assignedData.push(response.data[index]);
                } else {
                    this.unAssignedData.push(response.data[index]);
                }
            }
            $that.allAssignStaffData = this.assignedData.concat(this.unAssignedData);
            $that.assignStaffData = process($that.allAssignStaffData, this.config);
            $that.showLoader = false;
            $that.onProjectTeamFilterSubmit('redirectUrl');
            $that.chRef.detectChanges();
        }, error => {
            $that.showLoader = false;
            $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getCommonList() {
        const projectStatus = 'PROJECT_STATUS';
        this.apiService.getCommonListForProject(projectStatus).subscribe((response: any) => {
            if (response && response.data) {
                this.projectStatusData = response.data;
                this.filterProjectStatusData = response.data;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        const staffRoleKey = 'STAFF_ROLE';
        this.apiService.getCommonListForProject(staffRoleKey).subscribe((response: any) => {
            if (response && response.data) {
                this.projectRoleData = response.data;
                this.filterProjectRoleData = response.data;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        const office = 'OFFICE';
        this.apiService.getCommonListForProject(office).subscribe((response: any) => {
            if (response && response.data) {
                this.officeData = response.data;
                this.filteredOfficeList = response.data;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.config = state;
        this.config.group = this.groups;
        this.assignStaffData = process(this.allAssignStaffData, this.config);
    }

    public getListByFilterChange(keyword): void {
        this.filterValue = keyword;
        this.filterValue = this.filterValue.trim();
        if (this.filterValue.length > 0 && keyword !== '' && keyword != null) {
            this.apiService.getProjectPeopleAndPlannedTypehead(keyword).subscribe((response: any) => {
                if (response.error) {
                    this.showLoader = false;
                    this.toastr.error(response.message);
                } else {
                    this.chRef.detectChanges();
                    this.typeAheadSuggestions = response.data.searchResult;
                }
            }, error => {
                this.showLoader = false;
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        }
    }

    getStaffDetails(callback, staffId) {
        this.apiService.getStaffDetails(staffId).subscribe((response) => {
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

    public async getListByValueChange(value) {
        this.displayProjectType = null;
        this.filterValue = value;
        this.getAllStaffAssignDetails();
        this.onClearProjectTeamFilter();
    }

    public openVerticallyCenteredStaff(staffContent, dataItem) {
        this.staffIdForEditStaff = dataItem.STAFF_ID;
        this.modalRef = this.modalService.open(staffContent, {centered: true, size: 'lg'});
    }

    public openVerticallyCenteredAssignProject(assignContent, dataItem) {
        this.editDataItem = dataItem;
        this.modalRef = this.modalService.open(assignContent, {centered: true, size: 'lg'});
    }


    public openVerticallyCenteredProject(contentForProject, dataItem, tabStatus) {
        this.tabStatus = tabStatus;
        this.selectedProject = null;
        this.showInternalLoader = true;
        this.renderTable = false;
        const $that = this;
        this.getProjectDetails(function (response) {
            if (response && response.data) {
                $that.showInternalLoader = false;
                $that.selectedProject = response.data;
                $that.renderTable = true;
            }
        }, dataItem.PROJECT_ID);
        this.modalRef = this.modalService.open(contentForProject, {centered: true, size: 'lg'});
    }

    public openAssignStaffModal(assignStaff) {
        this.modalRef = this.modalService.open(assignStaff, {centered: true, size: 'lg'});
    }

    onGroupByColumnSelect(columnName) {
        let column = [];
        if (columnName === 'Staff Name') {
            column.push({field: 'STAFF_NAME'});
        } else if (columnName === 'Project Name') {
            column.push({field: 'PROJECT_NAME'});
        } else {
            column = [];
        }
        this.groups = column;
        this.config.group = this.groups;
        this.assignStaffData = process(this.allAssignStaffData, this.config);
    }

    public editAssignDetail(dataItem) {
        this.editDataItem = dataItem;
        this.openAssignStaffDialog = true;
    }

    public childStaffCloseEvent(cancel) {
        this.modalRef.close();
        if (cancel === 1) {
            this.displayProjectType = null;
            this.getAllStaffAssignDetails();
        }

    }

    public onProjectTeamFilterSubmit(type) {
        if (type !== 'redirectUrl' && this.displayProjectType) {
            this.displayProjectType = null;
            this.getAllStaffAssignDetails();
        } else if (type === 'removeSearch' && this.filterValue !== '') {
            this.filterValue = '';
            this.getAllStaffAssignDetails();
        }

        const filter = {};
        if (this.model.status) {
            filter['STATUS_NAME'] = this.model.status.STATUS_NAME;
        }
        if (this.model.role) {
            filter['ROLE_NAME'] = this.model.role.ROLE_NAME;
        }
        if (this.model.office != null) {
            filter['OFFICE_NAME'] = this.model.office['OFFICE_NAME'];
        }
        const assignStaff = this.allAssignStaffData.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] !== filter[key]) {
                    return false;
                }
            }
            return true;
        });
        this.assignStaffData = process(assignStaff, this.config);
        this.viewDataByFilter = {...this.model};
        this.filterMenuOpen = false;
    }

    public onClearProjectTeamFilter() {
        this.model = {
            status: null,
            role: null,
            office: null
        };
        this.onProjectTeamFilterSubmit(undefined);
    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'STATUS':
                this.filterProjectStatusData = this.projectStatusData.filter(s =>
                    s.STATUS_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'ROLE':
                this.filterProjectRoleData = this.projectRoleData.filter(s =>
                    s.ROLE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'OFFICE':
                this.filteredOfficeList = this.officeData.filter((s) => s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }
    }

    public allData(): ExcelExportData {
        const result: ExcelExportData = {
            data: process(this.allAssignStaffData, {}).data,
        };
        return result;
    }
}
