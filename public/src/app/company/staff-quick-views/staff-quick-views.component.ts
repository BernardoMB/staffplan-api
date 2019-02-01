import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {
    getColumnsList,
    DATE_FORMAT,
    ERROR_MESSAGE,
    STAFF_ALL_PROJECT_DETAILS_COLUMNS,
    HIDDEN_ALL_PROJECT_IN_STAFF_COLUMNS,
    customFieldNames,
    HIDDEN_STAFF_COLUMNS,
    HIDDEN_NEW_STAFF_COLUMNS,
    HIDDEN_STAFF_ASSIGNMENT_COLUMNS,
    STAFF_ASSIGNMENT_ALL_COLUMNS,
} from '../../global/settings';
import {ApiService} from '../../api.service';
import {process, State} from '@progress/kendo-data-query';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ProjectViewStaffDetailPopoverComponent} from '../project-view-staff-detail-popover/project-view-staff-detail-popover.component';
import {ExcelExportData} from '@progress/kendo-angular-excel-export';
import * as moment from 'moment';

@Component({
    selector: 'app-staff-quick-views',
    templateUrl: './staff-quick-views.component.html',
    styleUrls: ['./staff-quick-views.component.css']
})
export class StaffQuickViewsComponent implements OnInit, OnDestroy {
    @ViewChild(ProjectViewStaffDetailPopoverComponent) child: ProjectViewStaffDetailPopoverComponent;
    private customColumnsName = {
        'ROLE_NAME': 'Project Role',
        'STAFF_STATUS_NAME': 'Staff Status',
        'GROUP_NAME': 'Staff Group'
    };
    private columnOrdering = {
        'STAFF_NAME': 0,
        'PROJECT_NAME': 1,
        'ROLE_NAME': 2,
        'STAFF_STATUS_NAME': 4
    };
    private customNewStaffColumnsName = {
        'STATUS_NAME': 'Status',
        'ROLE_NAME': 'Staff Role',
        'CATEGORY_NAME': 'Category',
        'OFFICE_NAME': 'Office',
        'GROUP_NAME': 'Staff Group',
        'PREFFERED_NAME': 'Name'
    };
    private columnNewStaffOrdering = {
        'STAFF_NAME': 0,
        'STATUS_NAME': 1,
        'ROLE_NAME': 2,
        'GROUP_NAME': 3,
        'OFFICE_NAME': 4
    };
    private customAssignColumnsName = {
        'ROLE_NAME': 'Project Role',
        'STATUS_NAME': 'Project Status',
        'ALLOCATION': '%Allocation',
        'STAFF_ASSIGNMENT': 'Assignment Status'
    };
    private columnAssignOrdering = {
        'STAFF_NAME': 0,
        'PROJECT_NAME': 1,
        'STATUS_NAME': 2,
        'STAFF_STATUS_NAME': 3,
        'ROLE_NAME': 4,
    };
    private allStaffRelatedDetail = [];
    public date_format = DATE_FORMAT;
    private groupby = [{field: 'Future Days'}];
    public futureColumnListGrouping: Array<string> = [];
    private customLabel;
    private staffStatusList = [];
    private staffGroupList = [];
    private officeList = [];
    private subscription;
    private modalRef: NgbModalRef;
    public typeAheadSuggestions = [];
    public assignStaffData: any;
    public newStaffData: any;
    public upComingRollOff: any;
    public staffAssignData: any;
    public filterValue = '';
    public viewPortHeight = 450;
    public renderTable = false;
    public showInternalLoader = false;
    public allColumns = [];
    public showLoader = true;
    public config: State = {
        group: this.groupby
    };
    public listQuickViews = [
        {text: 'Next 90 Days - Staff Available', value: 'NEXT_90_DAY'},
        // {text: 'New Staff', value: 'NEW_STAFF'},
        {text: 'Staffing Gaps', value: 'STAFF_GAP'},
        {text: 'Overallocation', value: 'OVER_ALLOC'},
        {text: 'Upcoming Project Roll Off', value: 'UPCOM_ROLL_OFF'}
    ];
    public selectedQuickView = this.listQuickViews[0];
    public tabStatus: number;
    public selectedProject = null;
    public projectIdForClass;
    public popupClassQuickView = 'staff-quick-dropdown-list';
    public popupClass = 'custom-dropdown-list';
    public model = {
        status: null,
        group: null,
        office: null
    };
    public viewDataByFilter = {status: null, group: null, office: null};
    public filterMenuOpen = false;
    public filteredOfficeList = [];
    public filteredStaffGroupList = [];
    public filteredStaffStatusList = [];
    public staffIdForEditStaff;
    public editDataItem: any;
    public selectedOfficeId;

    constructor(private chRef: ChangeDetectorRef,
        private toastr: ToastrService,
        private apiService: ApiService,
        private modalService: NgbModal) {
        this.subscription = this.apiService.quickStaffUrlStatus.subscribe(res => {
            if (res != null) {
                if (res.status === 'onBench') {
                    this.selectedQuickView = this.listQuickViews.find(x => x.value === 'NEW_STAFF');
                } else if (res.status === 'staffGap') {
                    this.selectedQuickView = this.listQuickViews.find(x => x.value === 'STAFF_GAP');
                } else if (res.status === 'overUnder') {
                    this.selectedQuickView = this.listQuickViews.find(x => x.value === 'OVER_ALLOC');
                } else if (res.status === 'assignEnd') {
                    this.selectedQuickView = this.listQuickViews.find(x => x.value === 'UPCOM_ROLL_OFF');
                }
                this.handleValueChange(this.selectedQuickView, 'QUICK-VIEW');
                this.selectedOfficeId = res.officeId;
            }
            if (res == null) {
                this.getProjectPeoplesListFuture();
            }
        });
    }

    ngOnInit() {
        const $that = this;
        this.customLabel = JSON.parse(localStorage.getItem('customFieldNames'));
        this.viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 330;
        this.getCommonList();
        this.futureColumnListGrouping = ['Clear', 'Future Days', 'Next Available Month'];
        this.allData = this.allData.bind(this);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.apiService.redirectQuickStaff.next(null);
    }

    getProjectPeoplesListFuture() {
        const filterValue = {
            'ADVANCE_SEARCH': this.filterValue
        };
        this.apiService.getProjectPeoplesListFuture(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.ASSIGNEDSTAFF.length > 0) {
                this.allColumns = getColumnsList(response.data.ASSIGNEDSTAFF[0],
                        HIDDEN_ALL_PROJECT_IN_STAFF_COLUMNS, this.customColumnsName,
                        this.columnOrdering);
            } else {
                this.allColumns = STAFF_ALL_PROJECT_DETAILS_COLUMNS;
            }
            this.allColumns = customFieldNames(this.allColumns, this.customLabel);
            this.allStaffRelatedDetail = [];
            if (response.data.ASSIGNEDSTAFF.length > 0) {
                const asssignStaff = response.data.ASSIGNEDSTAFF;
                for (const index in asssignStaff) {
                    asssignStaff[index]['END_DATE'] = new Date(asssignStaff[index]['END_DATE']);
                    asssignStaff[index]['NEXT_AVAILABLE'] = new Date(asssignStaff[index]['NEXT_AVAILABLE']);
                    if (asssignStaff[index]['FUTURE_DAYS'] != null) {
                        asssignStaff[index]['Future Days'] = asssignStaff[index]['FUTURE_DAYS'];
                        asssignStaff[index]['Next Available Month'] = moment(asssignStaff[index]['NEXT_AVAILABLE']).format('MMMM');
                        asssignStaff[index]['RESUME_SUBMITTED'] = (asssignStaff[index]['RESUME_SUBMITTED'] == '0') ? 'No' : 'Yes';
                        this.allStaffRelatedDetail.push(asssignStaff[index]);
                    }
                }
            }
            if (response.data.FREESTAFF.length > 0) {
                for (const index in response.data.FREESTAFF) {
                    response.data.FREESTAFF[index]['FUTURE_DAYS'] = 'Available in 30 Days';
                    response.data.FREESTAFF[index]['Future Days'] = response.data.FREESTAFF[index]['FUTURE_DAYS'];
                    response.data.FREESTAFF[index]['Next Available Month'] = moment(response.data.FREESTAFF[index]['NEXT_AVAILABLE']).format('MMMM');
                    this.allStaffRelatedDetail.push(response.data.FREESTAFF[index]);
                }
            }
            this.onFilterSubmit(undefined);
            this.showLoader = false;
            this.chRef.detectChanges();
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public getNewStaffList() {
        const $that = this;
        const filterValue = {
            'ADVANCE_SEARCH': this.filterValue
        };
        this.apiService.getNewStaffList(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                $that.allColumns = getColumnsList(response.data[0],
                    HIDDEN_NEW_STAFF_COLUMNS,
                    $that.customNewStaffColumnsName,
                    $that.columnNewStaffOrdering);
                $that.allColumns = customFieldNames($that.allColumns, $that.customLabel);
            }
            $that.allStaffRelatedDetail = response.data;
            $that.showLoader = false;
            $that.chRef.detectChanges();
            $that.onFilterSubmit(undefined);
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public getStaffingGap() {
        const $that = this;
        const filterValue = {
            'ADVANCE_SEARCH': $that.filterValue
        };
        $that.apiService.getStaffingGap(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                $that.allColumns = getColumnsList(response.data[0],
                    HIDDEN_STAFF_ASSIGNMENT_COLUMNS,
                    this.customAssignColumnsName,
                    this.columnAssignOrdering);
            } else {
                $that.allColumns = STAFF_ASSIGNMENT_ALL_COLUMNS;
            }
            $that.allColumns = customFieldNames($that.allColumns, $that.customLabel);
            for (const index in response.data) {
                response.data[index]['END_DATE'] = new Date(response.data[index]['END_DATE']);
                response.data[index]['START_DATE'] = new Date(response.data[index]['START_DATE']);
                response.data[index]['Start Month'] = moment(response.data[index]['START_DATE']).format('MMMM');
                response.data[index]['End Month'] = moment(response.data[index]['END_DATE']).format('MMMM');
                response.data[index]['RESUME_SUBMITTED'] = (response.data[index]['RESUME_SUBMITTED'] == '0') ? 'No' : 'Yes';
            }
            $that.allStaffRelatedDetail = response.data;
            $that.showLoader = false;
            $that.onFilterSubmit(undefined);
            $that.chRef.detectChanges();
        }, error => {
            $that.showLoader = false;
            $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public getOverAllocation() {
        const $that = this;
        const filterValue = {
            'ADVANCE_SEARCH': $that.filterValue
        };
        $that.apiService.getOverAllocation(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                $that.allColumns = getColumnsList(response.data[0],
                    HIDDEN_STAFF_ASSIGNMENT_COLUMNS,
                    this.customAssignColumnsName,
                    this.columnAssignOrdering);
            } else {
                $that.allColumns = STAFF_ASSIGNMENT_ALL_COLUMNS;
            }
            $that.allColumns = customFieldNames($that.allColumns, $that.customLabel);
            for (const index in response.data) {
                response.data[index]['END_DATE'] = new Date(response.data[index]['END_DATE']);
                response.data[index]['START_DATE'] = new Date(response.data[index]['START_DATE']);
                response.data[index]['Start Month'] = moment(response.data[index]['START_DATE']).format('MMMM');
                response.data[index]['End Month'] = moment(response.data[index]['END_DATE']).format('MMMM');
                response.data[index]['RESUME_SUBMITTED'] = (response.data[index]['RESUME_SUBMITTED'] == '0') ? 'No' : 'Yes';
            }
            $that.allStaffRelatedDetail = response.data;
            $that.showLoader = false;
            $that.onFilterSubmit(undefined);
            $that.chRef.detectChanges();
        }, error => {
            $that.showLoader = false;
            $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public getUpComingRollOff() {
        const $that = this;
        const filterValue = {
            'ADVANCE_SEARCH': $that.filterValue
        };
        $that.apiService.getProjectPeoplesListUpcomingRollOff(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                $that.allColumns = getColumnsList(response.data[0],
                    HIDDEN_ALL_PROJECT_IN_STAFF_COLUMNS,
                    this.customAssignColumnsName,
                    this.columnAssignOrdering);
            } else {
                $that.allColumns = STAFF_ALL_PROJECT_DETAILS_COLUMNS;
            }
            $that.allColumns = customFieldNames($that.allColumns, $that.customLabel);
            for (const index in response.data) {
                response.data[index]['END_DATE'] = new Date(response.data[index]['END_DATE']);
                response.data[index]['START_DATE'] = new Date(response.data[index]['START_DATE']);
                response.data[index]['Start Month'] = moment(response.data[index]['START_DATE']).format('MMMM');
                response.data[index]['End Month'] = moment(response.data[index]['END_DATE']).format('MMMM');
                response.data[index]['Next Available Month'] = moment(response.data[index]['NEXT_AVAILABLE']).format('MMMM');
                response.data[index]['RESUME_SUBMITTED'] = (response.data[index]['RESUME_SUBMITTED'] == '0') ? 'No' : 'Yes';
            }
            $that.allStaffRelatedDetail = response.data;
            $that.showLoader = false;
            $that.onFilterSubmit(undefined);
            $that.chRef.detectChanges();
        }, error => {
            $that.showLoader = false;
            $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public getListByFilterChange(keyword): void {
        if ('' !== keyword && null != keyword) {
            this.filterValue = keyword;
            this.typeAheadSuggestions = [];
            if (this.selectedQuickView.value === 'NEXT_90_DAY') {
                this.apiService.getProjectDataByFilter(keyword).subscribe((response: any) => {
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
            } else if (this.selectedQuickView.value === 'STAFF_GAP') {
                this.apiService.getStaffingGapTypehead(keyword).subscribe((response: any) => {
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
            } else if (this.selectedQuickView.value === 'UPCOM_ROLL_OFF') {
                this.apiService.getUpComingRollOffTypehead(keyword).subscribe((response: any) => {
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
            } else {
                let keyValue = '';
                if (this.selectedQuickView.value === 'NEW_STAFF') {
                    keyValue = 'NewStaff/' + keyword;
                } else if (this.selectedQuickView.value === 'OVER_ALLOC') {
                    keyValue = 'OverAllocation/' + keyword;
                }
                this.apiService.getStaffNewTypehead(keyValue).subscribe((response: any) => {
                    if (response.error) {
                        this.showLoader = false;
                        this.toastr.error(response.message);
                    } else {
                        this.chRef.detectChanges();
                        for (let data in response.data.searchResult) {
                            this.typeAheadSuggestions.push(String(response.data.searchResult[data]));
                        }
                    }
                }, error => {
                    this.showLoader = false;
                    this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                });
            }
        }
    }


    public async getListByValueChange(value) {
        this.filterValue = value;
        this.getLatestRecord();
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.config = state;
        this.config.group = this.groupby;
        this.updateDisplayRecord(this.allStaffRelatedDetail);

    }

    public handleValueChange(value, column) {
        this.allColumns = [];
        this.allStaffRelatedDetail = [];
        this.staffAssignData = [];
        this.assignStaffData = [];
        if (column === 'QUICK-VIEW') {
            if (value.value === 'NEXT_90_DAY') {
                this.filterValue = '';
                this.futureColumnListGrouping = ['Clear', 'Future Days', 'Next Available Month'];
                this.groupby = [{field: 'Future Days'}];
            } else if (value.value === 'NEW_STAFF') {
                this.futureColumnListGrouping = ['Clear', 'Staff Role'];
                this.groupby = [{field: 'ROLE_NAME'}];
                this.filterValue = '';
            } else if (value.value === 'UPCOM_ROLL_OFF') {
                this.futureColumnListGrouping = ['Clear', 'Next Available Month', 'End Month', 'Staff Name', 'Project Name'];
                this.groupby = [{field: 'Next Available Month'}];
                this.filterValue = '';
            }  else if (value.value === 'OVER_ALLOC') {
                this.futureColumnListGrouping = ['Clear'];
                this.groupby = [{field: 'STAFF_NAME'}];
                this.filterValue = '';
            } else {
                // this.futureColumnListGrouping = ['Clear', 'Staff Name', 'Project Name', 'Start Month', 'End Month'];
                this.futureColumnListGrouping = ['Clear', 'Staff Name', 'Project Name', 'Start Month'];
                this.groupby = [{field: 'STAFF_NAME'}];
                this.filterValue = '';
            }
            this.getLatestRecord();
            this.config.group = this.groupby;
            this.allData = this.allData.bind(this);
            this.onClearFilter();
        }

    }


    public childCloseEvent(cancel) {
        if (cancel !== 3) {
            this.modalRef.close();
        }
        if (cancel === 1) {
            this.getLatestRecord();
        }
    }

    public onFilterSubmit(type) {
        if (type === 'removeSearch' && this.filterValue !== '') {
            this.filterValue = '';
            this.getLatestRecord();
        }
        const filter = {};
        if (this.model.status) {
            if (this.selectedQuickView.value === 'NEXT_90_DAY' ||
            this.selectedQuickView.value === 'UPCOM_ROLL_OFF' ||
            this.selectedQuickView.value === 'OVER_ALLOC' ||
            this.selectedQuickView.value === 'STAFF_GAP') {
                filter['STAFF_STATUS_NAME'] = this.model.status.STATUS_NAME;
            } else {
                filter['STATUS_NAME'] = this.model.status.STATUS_NAME;
            }
        }
        if (this.model.group) {
            filter['GROUP_NAME'] = this.model.group.GROUP_NAME;
        }
        if (this.model.office != null) {
            filter['OFFICE_NAME'] = this.model.office.OFFICE_NAME;
        }
        const staff = this.allStaffRelatedDetail.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] !== filter[key]) {
                    return false;
                }
            }
            return true;
        });
        this.updateDisplayRecord(staff);
        this.viewDataByFilter = {...this.model};
        this.filterMenuOpen = false;
    }

    public onClearFilter() {
        this.model = {
            status: null,
            group: null,
            office: null
        };
        this.onFilterSubmit(undefined);
    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'STAFF_STATUS':
                this.filteredStaffStatusList = this.staffStatusList.filter((s) =>
                s.STATUS_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'STAFF_GROUP':
                this.filteredStaffGroupList = this.staffGroupList.filter((s) =>
                s.GROUP_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'OFFICE':
                this.filteredOfficeList = this.officeList.filter((s) => s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }
    }

    getCommonList() {
        const staffStatusKey = 'STAFF_STATUS';
        this.apiService.getCommonListForProject(staffStatusKey).subscribe((response: any) => {
            if (response && response.data) {
                this.filteredStaffStatusList = response.data.slice();
                this.staffStatusList = response.data.slice();
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });


        const staffGroupKey = 'STAFF_GROUP';
        this.apiService.getCommonListForProject(staffGroupKey).subscribe((response: any) => {
            if (response && response.data) {
                this.filteredStaffGroupList = response.data.slice();
                this.staffGroupList = response.data.slice();
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        const office = 'OFFICE';
        this.apiService.getCommonListForProject(office).subscribe((response: any) => {
            if (response && response.data) {
                this.filteredOfficeList = response.data.slice();
                this.officeList = response.data.slice();
                if (this.selectedOfficeId && this.selectedOfficeId !== 'all') {
                    const selectedOfficeVal = this.filteredOfficeList.find(o => o.OFFICE_ID === this.selectedOfficeId);
                    this.model.office = {
                        'OFFICE_ID': selectedOfficeVal.OFFICE_ID,
                        'OFFICE_NAME': selectedOfficeVal.OFFICE_NAME
                    };
                    this.onFilterSubmit(undefined);
                }
            }
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

    onGroupByColumnSelect(columnName) {
        let column = [];
        if (this.selectedQuickView.value === 'NEXT_90_DAY') {
            if (columnName === 'Future Days') {
                column.push({field: 'Future Days'});
            } else if (columnName === 'Next Available Month') {
                column.push({field: 'Next Available Month'});
            } else {
                column = [];
            }
        } else if (this.selectedQuickView.value === 'NEW_STAFF') {
            if (columnName === 'Staff Role') {
                column.push({field: 'ROLE_NAME'});
            } else {
                column = [];
            }
        } else if (this.selectedQuickView.value === 'UPCOM_ROLL_OFF') {
            if (columnName === 'Next Available Month') {
                column.push({field: 'Next Available Month'});
            } else if (columnName === 'End Month') {
                column.push({field: 'End Month'});
            } else if (columnName === 'Staff Name') {
                column.push({field: 'STAFF_NAME'});
            } else if (columnName === 'Project Name') {
                column.push({field: 'PROJECT_NAME'});
            } else {
                column = [];
            }

        } else {
            if (columnName === 'Staff Name') {
                column.push({field: 'STAFF_NAME'});
            } else if (columnName === 'Project Name') {
                column.push({field: 'PROJECT_NAME'});
            } else if (columnName === 'Start Month') {
                column.push({field: 'Start Month'});
            } else if (columnName === 'End Month') {
                column.push({field: 'End Month'});
            } else {
                column = [];
            }
        }
        this.groupby = column;
        this.config.group = this.groupby;
        this.updateDisplayRecord(this.allStaffRelatedDetail);
    }

    public updateDisplayRecord(data) {
        if (this.selectedQuickView.value === 'NEXT_90_DAY' || this.selectedQuickView.value === 'UPCOM_ROLL_OFF') {
            this.assignStaffData = process(data, this.config);
        } else if (this.selectedQuickView.value === 'NEW_STAFF') {
            this.newStaffData = process(data, this.config);
        } else {
            this.staffAssignData = process(data, this.config);
        }
    }

    public getLatestRecord() {
        if (this.selectedQuickView.value === 'NEXT_90_DAY') {
            this.getProjectPeoplesListFuture();
        } else if (this.selectedQuickView.value === 'NEW_STAFF') {
            this.getNewStaffList();

        } else if (this.selectedQuickView.value === 'STAFF_GAP') {
            this.getStaffingGap();
        } else if (this.selectedQuickView.value === 'UPCOM_ROLL_OFF') {
            this.getUpComingRollOff();
        } else {
            this.getOverAllocation();
        }

    }

    public allData(): ExcelExportData {
        const result: ExcelExportData = {
            data: process(this.allStaffRelatedDetail, {}).data,
        };
        return result;
    }

    public openVerticallyCenteredEditStaff(editContent, dataItem) {
        this.staffIdForEditStaff = dataItem.STAFF_ID;
        this.modalRef = this.modalService.open(editContent, {centered: true, size: 'lg'});
    }

    public openVerticallyCenteredAssignProject(assignContent, dataItem) {
        this.editDataItem = dataItem;
        this.modalRef = this.modalService.open(assignContent, {centered: true, size: 'lg'});
    }

    public openVerticallyCenteredNewStaffAssignProject(newStaffAssignContent, dataItem) {
        this.staffIdForEditStaff = dataItem.STAFF_ID;
        this.modalRef = this.modalService.open(newStaffAssignContent, {centered: true, size: 'lg'});
    }

    public openVerticallyCentered(content, dataItem, tabStatus) {
        this.tabStatus = tabStatus;
        this.projectIdForClass = dataItem.PROJECT_ID;
        this.selectedProject = null;
        this.showInternalLoader = true;
        this.renderTable = false;
        const $that = this;
        this.getProjectDetails(function (response) {
            if (response && response.data) {
                $that.showInternalLoader = false;
                $that.renderTable = true;
                $that.selectedProject = response.data;
            }
        }, dataItem.PROJECT_ID);
        this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
    }
}
