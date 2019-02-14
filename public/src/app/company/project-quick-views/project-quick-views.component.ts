import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {
    getColumnsList,
    DATE_FORMAT,
    ERROR_MESSAGE,
    customFieldNames, HIDDEN_OPEN_ROLL_COLUMNS, HIDDEN_PROJECT_COLUMNS, TIMELINE_TYPE,
} from '../../global/settings';
import {ApiService} from '../../api.service';
import {GroupDescriptor, process, State} from '@progress/kendo-data-query';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ProjectViewStaffDetailPopoverComponent} from '../project-view-staff-detail-popover/project-view-staff-detail-popover.component';
import {ExcelExportData} from '@progress/kendo-angular-excel-export';
import * as moment from 'moment';

@Component({
    selector: 'app-project-quick-views',
    templateUrl: './project-quick-views.component.html',
    styleUrls: ['./project-quick-views.component.css']
})
export class ProjectQuickViewsComponent implements OnInit, OnDestroy {


    @ViewChild(ProjectViewStaffDetailPopoverComponent) child: ProjectViewStaffDetailPopoverComponent;
    private modalRef: NgbModalRef;
    private customColumnsName = {
        'PROJECT_NAME': 'Project',
        'ROLE_NAME': 'Project Role',
        'STATUS_NAME': 'Project Status',
        'STAFF_ASSIGNMENT': 'Assignment Status',
        'OFFICE_NAME': 'Office',
        'PROJECT_GROUP': 'Group'
    };
    private columnOrdering = {
        'PROJECT_NAME': 0,
        'ROLE_NAME': 1,
        'STATUS_NAME': 2
    };
    private customProjectColumnsName = {
        'STATUS_NAME': 'Status',
        'PROJECT_ROM': 'ROM ($)',
        'GROUP_NAME': 'Group',
        'OFFICE_NAME': 'Office',
        'DATES': 'Timeline'
    };
    private columnProjectOrdering = {
        PROJECT_NAME: 0,
        STATUS_NAME: 1,
        DATES: 2,
        TIMELINE_TYPE: 3,
        DURATION: 4,
        PROJECT_MANAGER: 5,
        PROJECT_ROM: 6,
        OFFICE_NAME: 7,
        GROUP_NAME: 8
    };
    private allProjectRelatedData = [];
    private date_format = DATE_FORMAT;
    private staffIdForClass;
    private selectedStaff = null;
    private projectName;
    private customLabel: any;
    private projectStatusData = [];
    private projectTypeData = [];
    private officeList = [];
    private subscription;
    public typeAheadSuggestions = [];
    public showLoader = true;
    public allColumns = [];
    public columnListGrouping: Array<string> = ['Clear', 'Project Name', 'Project Role', 'Start Month', 'End Month'];
    // public columnListGrouping: Array<string> = ['Clear', 'Project Name', 'Project Role', 'Start Month'];
    public openRoleData: any;
    public projectDetail: any;
    public filterValue = '';
    public gridHeight: any;
    public renderTable = false;
    public showInternalLoader = false;
    public groups: GroupDescriptor[] = [{field: 'PROJECT_NAME'}];
    public config: State = {
        group: [{field: 'PROJECT_NAME'}]
    };
    public listQuickViews = [
        {text: 'Unassigned Roles', value: 'UNASSIGNED'},
        // {text: 'New Projects Awarded', value: 'NEW_PRO'},
        {text: 'Upcoming Projects', value: 'PRO_START'},
        {text: 'Projects Ending', value: 'PRO_END'}
    ];
    public selectedQuickView = this.listQuickViews[0];
    public tabStatus: number;
    public selectedProject = null;
    public projectIdForClass;
    public viewPortHeight = 450;
    public popupClass = 'custom-dropdown-list';
    public popupClassProject = 'project-dropdown-list';
    public model = {
        status: null,
        type: null,
        office: null
    };
    public viewDataByFilter = {status: null, type: null, office: null};
    public filterMenuOpen = false;
    public filteredProjectStatusList = [];
    public filteredOfficeList = [];
    public filteredProjectTypeList = [];
    public editDataItem: any;
    public selectedOfficeId;
    public formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

    constructor(private chRef: ChangeDetectorRef,
        private toastr: ToastrService,
        private apiService: ApiService,
        private modalService: NgbModal) {
        this.subscription = this.apiService.quickProUrlStatus.subscribe(res => {
            if (res != null) {
                if (res.status === 'projectStart') {
                    this.selectedQuickView = this.listQuickViews.find(x => x.value === 'PRO_START');
                } else if (res.status === 'projectEnd') {
                    this.selectedQuickView = this.listQuickViews.find(x => x.value === 'PRO_END');
                } else if (res.status === 'unassignedRole') {
                    this.selectedQuickView = this.listQuickViews.find(x => x.value === 'UNASSIGNED');
                }
                this.handleValueChange(this.selectedQuickView, 'QUICK-VIEW');
                this.selectedOfficeId = res.officeId;
            }
            // if (res == null) {
            //     this.getAllPlannedProjectDetail();
            // }
        });
        this.handleValueChange(this.selectedQuickView, 'QUICK-VIEW');
    }

    ngOnInit() {
        const $that = this;
        this.customLabel = JSON.parse(localStorage.getItem('customFieldNames'));
        this.viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 330;
        $that.getCommonList();
        this.allData = this.allData.bind(this);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.apiService.redirectQuickPro.next(null);
    }

    getAllPlannedProjectDetail() {
        this.allColumns = [];
        this.allProjectRelatedData = [];
        const filterValue = {
            'ADVANCE_SEARCH': this.filterValue
        };
        this.apiService.getPlannedProjectPeople(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                this.allColumns = getColumnsList(response.data[0], HIDDEN_OPEN_ROLL_COLUMNS, this.customColumnsName, this.columnOrdering);
            }
            this.allColumns = customFieldNames(this.allColumns, this.customLabel);
            console.log(JSON.stringify(this.allColumns));
            for (const index in response.data) {
                response.data[index]['END_DATE'] = new Date(response.data[index]['END_DATE']);
                response.data[index]['START_DATE'] = new Date(response.data[index]['START_DATE']);
                response.data[index]['Start Month'] = moment(response.data[index]['START_DATE']).format('MMMM');
                response.data[index]['End Month'] = moment(response.data[index]['END_DATE']).format('MMMM');
                response.data[index]['RESUME_SUBMITTED'] = (response.data[index]['RESUME_SUBMITTED'] == '0')?'No':'Yes';
            }
            this.allProjectRelatedData = response.data;
            this.onFilterSubmit(undefined);
            this.showLoader = false;
            this.chRef.detectChanges();
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getProjectInitiatedList() {
        const filterValue = {
            'ADVANCE_SEARCH': this.filterValue
        };
        this.apiService.getProjectInitiatedList(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                response.data[0]['DATES'] = null;
                this.allColumns = getColumnsList(response.data[0],
                    HIDDEN_PROJECT_COLUMNS, this.customProjectColumnsName,
                    this.columnProjectOrdering);
            }
            this.allColumns = customFieldNames(this.allColumns, this.customLabel);
            for (let index in response.data) {
                response.data[index].TIMELINE_TYPE = TIMELINE_TYPE.find(x => x.TIMELINE_TYPE_KEY == response.data[index].TIMELINE_TYPE).TIMELINE_TYPE_VALUE;
                // response.data[index]['END_DATE'] = new Date(response.data[index]['END_DATE']);
                // response.data[index]['START_DATE'] = new Date(response.data[index]['START_DATE']);
                if (response.data[index].START_DATE <= moment().format('YYYY-MM-DD') && response.data[index].END_DATE >= moment().format('YYYY-MM-DD') && response.data[index].DURATION != '') {
                    let totalDays = moment(new Date(response.data[index].END_DATE)).diff(moment(new Date(response.data[index].START_DATE)), 'days');
                    let completedDays = moment(new Date()).diff(moment(new Date(response.data[index].START_DATE)), 'days');
                    response.data[index]['PROGRESS_DAYS'] = Math.floor((completedDays * 100) / totalDays) + '%';
                } else {
                    response.data[index]['PROGRESS_DAYS'] = null;
                }
                response.data[index]['Start Month'] = moment(response.data[index]['START_DATE']).format('MMMM');
                response.data[index]['End Month'] = moment(response.data[index]['END_DATE']).format('MMMM');
            }
            this.allProjectRelatedData = response.data;
            this.onFilterSubmit(undefined);
            this.showLoader = false;
            this.chRef.detectChanges();
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getProjectStartedList() {
        const filterValue = {
            'ADVANCE_SEARCH': this.filterValue
        };

        this.apiService.getProjectStartingList(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                response.data[0]['DATES'] = null;
                this.allColumns = getColumnsList(response.data[0], HIDDEN_PROJECT_COLUMNS, this.customProjectColumnsName, this.columnProjectOrdering);
            }
            this.allColumns = customFieldNames(this.allColumns, this.customLabel);
            for (let index in response.data) {
                response.data[index].TIMELINE_TYPE = TIMELINE_TYPE.find(x => x.TIMELINE_TYPE_KEY == response.data[index].TIMELINE_TYPE).TIMELINE_TYPE_VALUE;
                response.data[index]['Start Month'] = moment(response.data[index]['START_DATE']).format('MMMM');
                response.data[index]['End Month'] = moment(response.data[index]['END_DATE']).format('MMMM');
                if (response.data[index].START_DATE <= moment().format('YYYY-MM-DD') && response.data[index].END_DATE >= moment().format('YYYY-MM-DD') && response.data[index].DURATION != '') {
                    let totalDays = moment(new Date(response.data[index].END_DATE)).diff(moment(new Date(response.data[index].START_DATE)), 'days');
                    let completedDays = moment(new Date()).diff(moment(new Date(response.data[index].START_DATE)), 'days');
                    response.data[index]['PROGRESS_DAYS'] = Math.floor((completedDays * 100) / totalDays) + '%';
                } else {
                    response.data[index]['PROGRESS_DAYS'] = null;
                }
            }
            this.allProjectRelatedData = response.data;
            this.onFilterSubmit(undefined);
            this.showLoader = false;
            this.chRef.detectChanges();
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getProjectEndedList() {
        const filterValue = {
            'ADVANCE_SEARCH': this.filterValue
        };

        this.apiService.getProjectEndingList(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                response.data[0]['DATES'] = null;
                this.allColumns = getColumnsList(response.data[0], HIDDEN_PROJECT_COLUMNS, this.customProjectColumnsName, this.columnProjectOrdering);
            }
            this.allColumns = customFieldNames(this.allColumns, this.customLabel);
            for (let index in response.data) {
                response.data[index].TIMELINE_TYPE = TIMELINE_TYPE.find(x => x.TIMELINE_TYPE_KEY == response.data[index].TIMELINE_TYPE).TIMELINE_TYPE_VALUE;
                response.data[index]['Start Month'] = moment(response.data[index]['START_DATE']).format('MMMM');
                response.data[index]['End Month'] = moment(response.data[index]['END_DATE']).format('MMMM');
                if (response.data[index].START_DATE <= moment().format('YYYY-MM-DD') && response.data[index].END_DATE >= moment().format('YYYY-MM-DD') && response.data[index].DURATION != '') {
                    let totalDays = moment(new Date(response.data[index].END_DATE)).diff(moment(new Date(response.data[index].START_DATE)), 'days');
                    let completedDays = moment(new Date()).diff(moment(new Date(response.data[index].START_DATE)), 'days');
                    response.data[index]['PROGRESS_DAYS'] = Math.floor((completedDays * 100) / totalDays) + '%';
                } else {
                    response.data[index]['PROGRESS_DAYS'] = null;
                }
            }
            this.allProjectRelatedData = response.data;
            this.onFilterSubmit(undefined);
            this.showLoader = false;
            this.chRef.detectChanges();
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    onGroupByColumnSelect(columnName) {
        let column = [];
        if (columnName === 'Start Month') {
            column.push({field: 'Start Month'});
        } else if (columnName === 'Project Name') {
            column.push({field: 'PROJECT_NAME'});
        } else if (columnName === 'End Month') {
            column.push({field: 'End Month'});
        } else if (columnName === 'Project Role') {
            column.push({field: 'ROLE_NAME'});
        } else {
            column = [];
        }
        this.groups = column;
        this.config.group = this.groups;
        if (this.selectedQuickView.value === 'UNASSIGNED') {
            this.openRoleData = process(this.allProjectRelatedData, this.config);
        } else {
            this.projectDetail = process(this.allProjectRelatedData, this.config);
        }

    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.config = state;
        this.config.group = this.groups;
        this.onClearFilter();
        if (this.selectedQuickView.value === 'UNASSIGNED') {
            this.openRoleData = process(this.allProjectRelatedData, this.config);
        } else {
            this.projectDetail = process(this.allProjectRelatedData, this.config);
        }
    }

    public getListByFilterChange(keyword): void {
        if ('' !== keyword && null != keyword) {
            this.filterValue = keyword.trim();
            if (this.filterValue.length > 0) {
                this.typeAheadSuggestions = [];
                if (this.selectedQuickView.value === 'UNASSIGNED') {
                    this.apiService.getPlannedProjectDataByFilter(keyword).subscribe((response: any) => {
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
                } else {
                    let keyValue = '';
                    if (this.selectedQuickView.value === 'NEW_PRO') {
                        keyValue = 'Initiated/' + keyword;
                    } else if (this.selectedQuickView.value === 'PRO_START') {
                        keyValue = 'StartingDate/' + keyword;
                    } else {
                        keyValue = 'EndingDate/' + keyword;
                    }
                    this.apiService.getProjectInitiatedTypehead(keyValue).subscribe((response: any) => {
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
    }


    public async getListByValueChange(value) {
        this.filterValue = value;
        if (this.selectedQuickView.value === 'UNASSIGNED') {
            this.getAllPlannedProjectDetail();
        } else if (this.selectedQuickView.value === 'NEW_PRO') {
            this.getProjectInitiatedList();
        } else if (this.selectedQuickView.value === 'PRO_START') {
            this.getProjectStartedList();
        } else {
            this.getProjectEndedList();
        }

        this.onClearFilter();
    }


    public handleValueChange(value, column) {
        this.allColumns = [];
        this.allProjectRelatedData = [];
        this.projectDetail = [];
        if (column === 'QUICK-VIEW') {
            // Add End Month if the group doesn't have the value
            if (this.columnListGrouping.indexOf('End Month') === -1) {
                this.columnListGrouping.splice(this.columnListGrouping.length, 0, 'End Month');
            }
            if (this.columnListGrouping.indexOf('Project Name') === -1) {
                this.columnListGrouping.splice(1, 0, 'Project Name');
            }
            if (this.columnListGrouping.indexOf('Project Role') !== -1) {
                this.columnListGrouping.splice(this.columnListGrouping.indexOf('Project Role'), 1);
            }
            if (value.value === 'NEW_PRO') {
                this.filterValue = '';
                this.getProjectInitiatedList();
            } else if (value.value === 'UNASSIGNED') {
                this.columnListGrouping.splice(2, 0, 'Project Role');
                // Remove End Month if the group have the value
                if (this.columnListGrouping.indexOf('End Month') !== -1) {
                    this.columnListGrouping.splice(this.columnListGrouping.indexOf('End Month'), 1);
                }
                this.filterValue = '';
                this.getAllPlannedProjectDetail();
            } else if (value.value === 'PRO_START') {
                this.filterValue = '';
                if (this.columnListGrouping.indexOf('End Month') !== -1) {
                    this.columnListGrouping.splice(this.columnListGrouping.indexOf('End Month'), 1);
                }
                if (this.columnListGrouping.indexOf('Project Name') !== -1) {
                    this.columnListGrouping.splice(this.columnListGrouping.indexOf('Project Name'), 1);
                }
                this.getProjectStartedList();
            } else {
                this.filterValue = '';
                this.getProjectEndedList();
            }
        }
        this.allData = this.allData.bind(this);
        this.onClearFilter();
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

    public openVerticallyCenteredAssignProject(assignContent, dataItem) {
        this.editDataItem = dataItem;
        this.modalRef = this.modalService.open(assignContent, {centered: true, size: 'lg'});
    }

    getProjectDetails(callback, projectId) {
        this.apiService.getProjectDetails(projectId).subscribe((response) => {
            callback(response);
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public childCloseEvent(cancel) {
        if (cancel !== 3) {
            this.modalRef.close();
        }
        if (cancel === 1) {
            if (this.selectedQuickView.value === 'UNASSIGNED') {
                this.getAllPlannedProjectDetail();
            } else if (this.selectedQuickView.value === 'NEW_PRO') {
                this.getProjectInitiatedList();
            } else if (this.selectedQuickView.value === 'PRO_START') {
                this.getProjectStartedList();
            } else {
                this.getProjectEndedList();
            }
        }
    }


    public onFilterSubmit(type) {
        if (type === 'removeSearch' && this.filterValue !== '' && !this.selectedOfficeId) {
            this.filterValue = '';
            if (this.selectedQuickView.value === 'UNASSIGNED') {
                this.getAllPlannedProjectDetail();
            } else if (this.selectedQuickView.value === 'NEW_PRO') {
                this.getProjectInitiatedList();
            } else if (this.selectedQuickView.value === 'PRO_START') {
                this.getProjectStartedList();
            } else {
                this.getProjectEndedList();
            }
        }
        const filter = {};
        if (this.model.status) {
            filter['STATUS_NAME'] = this.model.status.STATUS_NAME;
        }
        if (this.model.type) {
            filter['TYPE_NAME'] = this.model.type.TYPE_NAME;
        }
        if (this.model.office) {
            filter['OFFICE_NAME'] = this.model.office.OFFICE_NAME;
        }
        const project = this.allProjectRelatedData.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] !== filter[key]) {
                    return false;
                }
            }
            return true;
        });
        if (this.selectedQuickView.value === 'UNASSIGNED') {
            this.openRoleData = process(project, this.config);
        } else {
            this.projectDetail = process(project, this.config);
        }

        this.viewDataByFilter = {...this.model};
        this.filterMenuOpen = false;
    }

    public onClearFilter() {
        this.model = {
            status: null,
            type: null,
            office: null
        };
        this.onFilterSubmit(undefined);
    }

    getCommonList() {
        const projectStatus = 'PROJECT_STATUS';
        this.apiService.getCommonListForProject(projectStatus).subscribe((response: any) => {
            if (response && response.data) {
                this.filteredProjectStatusList = response.data;
                this.projectStatusData = response.data;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        const projectTypeKey = 'PROJECT_TYPE';
        this.apiService.getCommonListForProject(projectTypeKey).subscribe((response: any) => {
            if (response && response.data) {
                this.filteredProjectTypeList = response.data;
                this.projectTypeData = response.data;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        const office = 'OFFICE';
        this.apiService.getCommonListForProject(office).subscribe((response: any) => {
            if (response && response.data) {
                this.officeList = response.data;
                this.filteredOfficeList = response.data;
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

    handleFilterChange(value, column) {
        switch (column) {
            case 'PROJECT_STATUS':
                this.filteredProjectStatusList = this.projectStatusData.filter(
                    s => s.STATUS_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
                );
                break;
            case 'OFFICE':
                this.filteredOfficeList = this.officeList.filter(
                    s => s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
                );
                break;
            case 'PROJECT_TYPE':
                this.filteredProjectTypeList = this.projectTypeData.filter(
                    s => s.TYPE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
                );
                break;
        }
    }

    public allData(): ExcelExportData {
        const result: ExcelExportData = {
            data: process(this.allProjectRelatedData, {}).data,
        };
        return result;
    }
}
