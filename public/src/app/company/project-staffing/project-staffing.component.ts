import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {DataStateChangeEvent, GridDataResult} from '@progress/kendo-angular-grid';
import {
    getColumnsList,
    HIDDEN_STAFF_ASSIGNMENT_COLUMNS,
    DATE_FORMAT,
    ERROR_MESSAGE,
    STAFF_ASSIGNMENT_ALL_COLUMNS,
    customFieldNames
} from '../../global/settings';
import {ToastrService} from 'ngx-toastr';
import {process, State, GroupDescriptor} from '@progress/kendo-data-query';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProjectViewStaffDetailPopoverComponent} from '../project-view-staff-detail-popover/project-view-staff-detail-popover.component';
import {ApiService} from '../../api.service';
import {ExcelExportData} from '@progress/kendo-angular-excel-export';

@Component({
    selector: 'app-project-staffing',
    templateUrl: './project-staffing.component.html',
    styleUrls: ['./project-staffing.component.css']
})
export class ProjectStaffingComponent implements OnInit {
    @ViewChild(ProjectViewStaffDetailPopoverComponent) child: ProjectViewStaffDetailPopoverComponent;
    private modalRef: NgbModalRef;
    private customColumnsName = {
        'PROJECT_NAME': 'Project',
        'ROLE_NAME': 'Project Role',
        'STATUS_NAME': 'Status',
        'ALLOCATION': '%Allocation',
        'STAFF_ASSIGNMENT': 'Assignment Status',
        'OFFICE_NAME': 'Office',
        'GROUP_NAME': 'Group',
        'DATES': 'Timeline'
    };
    private columnOrdering = {
        'STAFF_NAME': 0,
        'PROJECT_NAME': 1,
        'STATUS_NAME': 2,
        'STAFF_STATUS_NAME': 3,
        'ROLE_NAME': 4
    };
    private allAssignStaffData = [];
    private date_format = DATE_FORMAT;
    public staffIdForEditStaff;

    // private projectIdForClass;
    // private projectName;
    public selectedStaff = null;
    public selectedProject = null;
    private columnForAddRemove = [];
    private columnForHideAndShow = [];
    private forHiddenColumn = [];
    private groups: GroupDescriptor[] = [{field: 'PROJECT_NAME'}];
    public config: State = {
        group: [{field: 'PROJECT_NAME'}]
    };
    public showColumnPopup: boolean = false;
    public typeAheadSuggestions = [];
    public renderTable = false;
    public showInternalLoader = false;
    public allColumns = [];
    public columnListGrouping: Array<string> = ['Clear', 'Staff Name', 'Project Name'];
    public assignStaffData: GridDataResult = process([], this.config);
    public filterValue = '';
    public gridHeight: any;
    public showLoader = true;
    public tabStatus: number;
    public editDataItem: any;
    public model = {
        status: null,
        office: null,
        role: null
    };
    public viewDataByFilter = {status: null, role: null, office: null};
    public filterMenuOpen = false;
    public projectStatusData = [];
    public filterProjectStatusData = [];
    public projectRoleData = [];
    public officeData = [];
    public filterProjectRoleData = [];
    public popupClass = 'custom-dropdown-list';
    public viewPortHeight = 450;
    public customColumnNames;
    public filteredOfficeList = [];

    constructor(private chRef: ChangeDetectorRef, private toastr: ToastrService, private apiService: ApiService, private modalService: NgbModal) {
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

    getAllStaffAssignDetails() {
        const $that = this;
        var filterValue = {
            'ADVANCE_SEARCH': $that.filterValue
        };
        $that.apiService.getProjectPeopleAndPlannedProject(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                $that.allColumns = getColumnsList(response.data[0], HIDDEN_STAFF_ASSIGNMENT_COLUMNS, this.customColumnsName, this.columnOrdering);
            } else {
                $that.allColumns = STAFF_ASSIGNMENT_ALL_COLUMNS;
            }
            $that.allColumns = customFieldNames($that.allColumns, $that.customColumnNames);
            for (let index in response.data) {
                response.data[index]['END_DATE'] = new Date(response.data[index]['END_DATE']);
                response.data[index]['START_DATE'] = new Date(response.data[index]['START_DATE']);
                response.data[index]['RESUME_SUBMITTED'] = (response.data[index]['RESUME_SUBMITTED'] == '0') ? 'No' : 'Yes';
            }
            $that.allAssignStaffData = response.data;

            $that.assignStaffData = process(this.allAssignStaffData, this.config);
            $that.showLoader = false;
            $that.chRef.detectChanges();
        }, error => {
            $that.showLoader = false;
            $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getCommonList() {
        let projectStatus = 'PROJECT_STATUS';
        this.apiService.getCommonListForProject(projectStatus).subscribe((response: any) => {
            if (response && response.data) {
                this.projectStatusData = response.data;
                this.filterProjectStatusData = response.data;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        let staffRoleKey = 'STAFF_ROLE';
        this.apiService.getCommonListForProject(staffRoleKey).subscribe((response: any) => {
            if (response && response.data) {
                this.projectRoleData = response.data;
                this.filterProjectRoleData = response.data;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        let office = 'OFFICE';
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

    public dateFilter(columnId) {
        if (columnId == 'END_DATE' || columnId == 'START_DATE') {
            return 'date';
        }
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
            this.filterValue = keyword;
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

    getProjectDetails(callback, projectId) {
        this.apiService.getProjectDetails(projectId).subscribe((response) => {
            callback(response);
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public async getListByValueChange(value) {
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
        this.staffIdForEditStaff = dataItem.STAFF_ID;
        this.selectedProject = null;
        this.showInternalLoader = true;
        this.renderTable = false;
        let $that = this;
        this.getProjectDetails(function (response) {
            if (response && response.data) {
                $that.showInternalLoader = false;
                $that.selectedProject = response.data;
                $that.renderTable = true;
            }
        }, dataItem.PROJECT_ID);
        this.modalRef = this.modalService.open(contentForProject, {centered: true, size: 'lg'});
    }

    onGroupByColumnSelect(columnName) {
        let column = [];
        if (columnName == 'Staff Name') {
            column.push({field: 'STAFF_NAME'});
        } else if (columnName == 'Project Name') {
            column.push({field: 'PROJECT_NAME'});
        } else {
            column = [];
        }
        this.groups = column;
        this.config.group = this.groups;
        this.assignStaffData = process(this.allAssignStaffData, this.config);
    }

    public childStaffCloseEvent(cancel) {
        this.modalRef.close();
        if (cancel == 1) {
            this.getAllStaffAssignDetails();
        }
    }

    public onProjectTeamFilterSubmit(type) {
        if (type == 'removeSearch' && this.filterValue != '') {
            this.filterValue = '';
            this.getAllStaffAssignDetails();
        }
        let filter = {};
        if (this.model.status) {
            filter['STATUS_NAME'] = this.model.status.STATUS_NAME;
        }
        if (this.model.role) {
            filter['ROLE_NAME'] = this.model.role.ROLE_NAME;
        }
        if (this.model.office != null) {
            filter['OFFICE_NAME'] = this.model.office['OFFICE_NAME'];
        }
        let assignStaff = this.allAssignStaffData.filter(function (item) {
            for (let key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
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
            office: null,
            role: null
        };
        this.onProjectTeamFilterSubmit(undefined);
    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'STATUS':
                this.filterProjectStatusData = this.projectStatusData.filter(s => s.STATUS_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'ROLE':
                this.filterProjectRoleData = this.projectRoleData.filter(s => s.ROLE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
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
