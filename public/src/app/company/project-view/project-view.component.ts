import {Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy} from '@angular/core';
import {process, State} from '@progress/kendo-data-query';
import {
    DATE_FORMAT,
    getColumnsList,
    HIDDEN_PROJECT_COLUMNS,
    TIMELINE_TYPE,
    ERROR_MESSAGE,
    customFieldNames, convert,
} from '../../global/settings';
import {GridDataResult, DataStateChangeEvent, GridComponent} from '@progress/kendo-angular-grid';
import {ApiService} from '../../api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ProjectViewStaffDetailPopoverComponent} from '../project-view-staff-detail-popover/project-view-staff-detail-popover.component';
import * as moment from 'moment';
import _ from 'lodash';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-project-view',
    templateUrl: './project-view.component.html',
    styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit, OnDestroy {
    @ViewChild(GridComponent) private grid: GridComponent;
    @ViewChild(ProjectViewStaffDetailPopoverComponent) child: ProjectViewStaffDetailPopoverComponent;
    private showLoader = true;
    private timelineType = TIMELINE_TYPE;
    public date_format = DATE_FORMAT;
    // private showInternalLoader = false;
    public projectColumns = [];
    private customColumnsName = {
        'PROJECT_ADDRESS': 'Address',
        'PROJECT_ZIP': 'Zip',
        // 'STATUS_NAME': 'Project Status',
        'PROJECT_ROM': 'ROM ($)',
        'GROUP_NAME': 'Project Group',
        'OFFICE_NAME': 'Office',
        'DATES': 'Start & End Date'
    };
    private columnOrdering = {
        PROJECT_NAME: 0,
        STATUS_NAME: 1,
        DATES: 2,
        TIMELINE_TYPE: 3,
        PROJECT_MANAGER: 4,
        PROJECT_ROM: 5,
        OFFICE_NAME: 6,
        GROUP_NAME: 7,
        DURATION: 8
    };
    private configs: State = {
        filter: {
            logic: 'and',
            filters: []
        }
    };
    public projectData: GridDataResult = process([], this.configs);
    private allProjectsData = [];
    // private gridHeight: any;
    private modalRef: NgbModalRef;
    public tabStatus: number;
    private timeLineDataByMonth = [];
    private timeLineDataByWeek = [];
    private timeLineDataByYear = [];
    private timeLineHeaderMonth = [];
    private timeLineHeaderWeek = [];
    private timeLineHeaderYear = [];
    private subscription;
    public searchFilter: any = '';
    public selectedProject = null;
    public renderTable = false;
    // public tabularView = 1;
    public forHiddenColumn = [];
    public projectIdForClass;
    public typeAheadSuggestions = [];
    public projectStatusData = [];
    public officeData = [];
    public filteredOfficeList = [];
    public filterProjectStatusData = [];
    public projectGroupData = [];
    public filterProjectGroupData = [];
    public model = {
        status: { STATUS_ID: 3, STATUS_NAME: 'In Progress' },
        office: null,
        group: null
    };
    public viewDataByFilter = {status: { STATUS_ID: 3, STATUS_NAME: 'In Progress' }, office: null, group: null};
    public filterMenuOpen = false;
    public tableView = 1;
    public projectsForTimeline = [];
    public timeLineData = [];
    public timeLineHeader = [];
    public timelineStatus = 'month';
    // public timelineByType = ['month', 'year', 'week'];
    public timelineByType = ['month', 'year'];
    public customFields;
    public displayProjectType = null;
    public viewPortHeight = 450;
    public selectedOfficeId;

    constructor(private route: ActivatedRoute,
        private chRef: ChangeDetectorRef,
        private apiService: ApiService,
        private toastr: ToastrService,
        private modalService: NgbModal,
        private datePipe: DatePipe) {
        this.subscription = this.apiService.urlStatus.subscribe(res => {
            if (res != null) {
                this.onClearProjectFilter();
                this.searchFilter = res.status;
                this.selectedOfficeId = res.officeId;
            }
        });
    }

    async ngOnInit() {
        await this.initiateProjectList();
        this.getCommonList();
        this.getProjectGroupList();
        // this.gridHeight = window.innerHeight - 180;
        this.customFields = JSON.parse(localStorage.getItem('customFieldNames'));
        this.viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 330;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.apiService.redirect.next(null);
    }

    async initiateProjectList() {
        const $that = this;
        await this.getProjectsList(function (response) {
            if (response && response.data && response.data.length > 0) {
                response.data[0]['DATES'] = null;
                $that.projectColumns = getColumnsList(response.data[0],
                    HIDDEN_PROJECT_COLUMNS, $that.customColumnsName, $that.columnOrdering);
            }
            $that.projectColumns = customFieldNames($that.projectColumns, $that.customFields);
            for (let key in response.data) {
                response.data[key].TIMELINE_TYPE = TIMELINE_TYPE.find(x => x.TIMELINE_TYPE_KEY == response.data[key].TIMELINE_TYPE).TIMELINE_TYPE_VALUE;
                if (response.data[key].START_DATE <= moment().format('YYYY-MM-DD') && response.data[key].END_DATE >= moment().format('YYYY-MM-DD') && response.data[key].DURATION != '') {
                    let totalDays = moment(new Date(response.data[key].END_DATE)).diff(moment(new Date(response.data[key].START_DATE)), 'days');
                    let completedDays = moment(new Date()).diff(moment(new Date(response.data[key].START_DATE)), 'days');
                    response.data[key]['PROGRESS_DAYS'] = Math.floor((completedDays * 100) / totalDays) + '%';
                } else {
                    response.data[key]['PROGRESS_DAYS'] = null;
                }
            }
            $that.allProjectsData = response.data;
            $that.timeLineDataByWeek = _.cloneDeep(response.data);
            $that.timeLineDataByMonth = _.cloneDeep(response.data);
            if ($that.tableView === 2) {
                $that.viewTimeLine();
            }
            $that.onProjectFilterSubmit('redirectUrl');
            // $that.projectData = process(response.data, $that.configs);
            $that.showLoader = false;
            $that.chRef.detectChanges();
        }, this.applySearchValue());
    }

    public applySearchValue() {
        if (this.searchFilter === 'projectStartThisYear') {
            this.searchFilter = '';
            this.displayProjectType = 'Project Started this Year';
            return {
                'START_DATE': moment().format('YYYY')
            };

        } else if (this.searchFilter === 'projectEndThisYear') {
            this.searchFilter = '';
            this.displayProjectType = 'Project End this Year';
            return {
                'END_DATE': moment().format('YYYY')
            };
        } else if (this.searchFilter === 'projectStart') {
            this.searchFilter = '';
            this.displayProjectType = 'Project Starting';
            return {
                'PROJECT': 'START'
            };
        } else if (this.searchFilter === 'projectEnd') {
            this.searchFilter = '';
            this.displayProjectType = 'Project Ending';
            return {
                'PROJECT': 'END'
            };
        } else if (this.searchFilter === 'projectInProgress') {
            this.searchFilter = '';
            this.displayProjectType = 'Project In Progress';
            return {
                'PROJECT_STATUS_GET': 'INPROGRESS'
            };

        } else if (this.searchFilter === 'projectRequest') {
            this.searchFilter = '';
            this.displayProjectType = 'Project Request';
            return {
                'PROJECT_STATUS_GET': 'PROPOSAL'
            };
        } else {
            return {
                'ADVANCE_SEARCH': this.searchFilter
            };
        }
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
        const office = 'OFFICE';
        this.apiService.getCommonListForProject(office).subscribe((response: any) => {
            if (response && response.data) {
                this.officeData = response.data;
                this.filteredOfficeList = response.data;
                if (this.selectedOfficeId && this.selectedOfficeId !== 'all') {
                    const selectedOfficeVal = this.filteredOfficeList.find(o => o.OFFICE_ID === this.selectedOfficeId);
                    this.model.office = {
                        'OFFICE_ID': selectedOfficeVal.OFFICE_ID,
                        'OFFICE_NAME': selectedOfficeVal.OFFICE_NAME
                    };
                    this.onProjectFilterSubmit(undefined);
                }
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
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

    getProjectGroupList() {
        this.apiService.getCommonListForProject('PROJECT_GROUP').subscribe((response: any) => {
            this.projectGroupData = response.data;
            this.filterProjectGroupData = response.data;
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.configs = state;
        this.projectData = process(this.allProjectsData, this.configs);
    }

    public openVerticallyCentered(content, dataItem, tabStatus) {
        this.tabStatus = tabStatus;
        this.projectIdForClass = dataItem.PROJECT_ID;
        this.selectedProject = null;
        // this.showInternalLoader = true;
        this.renderTable = false;
        const $that = this;
        this.getProjectDetails(function (response) {
            if (response && response.data) {
                // $that.showInternalLoader = false;
                $that.renderTable = true;
                $that.selectedProject = response.data;
            }
        }, dataItem.PROJECT_ID);
        // this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
    }

    public openAddProjectModal(addContent) {
        this.modalRef = this.modalService.open(addContent, {centered: true, size: 'lg', windowClass: 'close-status-color'});
    }

    public async valueChange(value) {
        this.displayProjectType = null;
        this.onClearProjectFilter();
        this.searchFilter = value;
        await this.initiateProjectList();
    }

    public projectListByfilterChange(filter) {
        this.searchFilter = filter;
        this.searchFilter = this.searchFilter.trim();
        if (this.searchFilter.length > 0 && filter !== '' && filter != null) {
            this.apiService.projectListByfilterChange(filter).subscribe((response: any) => {
                if (response && response.data && response.data.searchResult) {
                    this.typeAheadSuggestions = response.data.searchResult;
                    this.chRef.detectChanges();
                }
            }, error => {
                this.showLoader = false;
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        }
    }

    public hiddenColumn(columnId) {
        if (this.forHiddenColumn.indexOf(columnId) > -1) {
            return false;
        } else {
            return true;
        }
    }

    public rowExpand({dataItem}) {
        for (const key in this.projectData.data) {
            if (this.projectData.data[key].PROJECT_ID !== dataItem.PROJECT_ID) {
                this.grid.collapseRow(+key);
            }
        }
    }

    public childDeleteEvent(cancel) {
        if (cancel !== 3) {
            this.modalRef.close();
        }
        if (cancel === 1) {
            this.displayProjectType = null;
            this.initiateProjectList();
        }
    }

    public onProjectFilterSubmit(type) {
        if (type !== 'redirectUrl' && this.displayProjectType && !this.selectedOfficeId) {
            this.displayProjectType = null;
            this.initiateProjectList();
        } else if (type === 'removeSearch' && this.searchFilter !== '' && !this.selectedOfficeId) {
            this.searchFilter = '';
            this.initiateProjectList();
        }
        const filter = {};
        if (this.model.status != null) {
            filter['STATUS_NAME'] = this.model.status.STATUS_NAME;
        }
        if (this.model.group) {
            filter['GROUP_NAME'] = this.model.group.GROUP_NAME;
        }
        if (this.model.office != null) {
            filter['OFFICE_NAME'] = this.model.office['OFFICE_NAME'];
        }
        const projects = this.allProjectsData.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] !== filter[key]) {
                    return false;
                }
            }
            return true;
        });
        if (this.tableView === 2) {
            this.timeLineDataByWeek = _.cloneDeep(projects);
            this.timeLineDataByMonth = _.cloneDeep(projects);
            this.timeLineDataByYear = _.cloneDeep(projects);
            this.viewTimeLine();
        } else {
            this.projectData = process(projects, this.configs);
        }
        this.viewDataByFilter = {...this.model};
        this.filterMenuOpen = false;
    }

    public onClearProjectFilter() {
        this.model = {
            status: null,
            office: null,
            group: null
        };
        this.onProjectFilterSubmit(undefined);
    }

    private diffFinder(minDate, maxDate, method) {
        if (method === 'month') {
            let totalMonths = 0;
            if (minDate.year() === maxDate.year()) {
                totalMonths = maxDate.month() - minDate.month() + 1;
            } else if (minDate.year() === maxDate.year() + 1) {
                totalMonths = (12 - minDate.month()) + (maxDate.month() + 1);
            } else {
                totalMonths = (12 - minDate.month()) + (maxDate.month() + 1);
                const yearDiff = (maxDate.year() - minDate.year()) - 1;
                for (let iterator = 0; iterator < yearDiff; iterator++) {
                    totalMonths += 12;
                }
            }
            return totalMonths;
        } else if (method === 'year') {
            return ((maxDate.year() - minDate.year()) + 1);
        }
    }

    async viewTimeLine() {
        this.timeLineHeaderWeek = [];
        this.timeLineHeaderYear = [];
        this.timeLineHeaderMonth = [];
        const minDate = moment(new Date(Math.min.apply(null, this.timeLineDataByWeek.map(function (e) {
            return new Date(e.START_DATE);
        }))));
        const maxDate = moment(new Date(Math.max.apply(null, this.timeLineDataByWeek.map(function (e) {
            return new Date(e.END_DATE);
        }))));
        // week calculate //
        if (this.timeLineDataByWeek.length > 0 && this.timeLineData.indexOf('week') !== -1) {
            const totalWeeks = maxDate.diff(minDate, 'week', true);
            this.timeLineData['week'] = Array.from(Array(Math.ceil(totalWeeks)).keys());
            for (let iterator = 0; iterator < totalWeeks; iterator++) {
                const newMinDate = moment(JSON.parse(JSON.stringify(minDate)));
                const weekName = newMinDate.add(iterator, 'week');
                const header = {};
                header['week'] = 'week ' + Math.ceil(moment(weekName).date() / 7);
                header['month'] = moment(weekName).format('MMM');
                header['year'] = moment(weekName).format('YY');
                this.timeLineHeaderWeek.push(header);
            }
            this.timeLineDataByWeek.map((instanceWeek) => {
                const momentStartDate = moment(new Date(instanceWeek.START_DATE));
                const momentEndDate = moment(new Date(instanceWeek.END_DATE));
                const projectDurationByWeek = momentEndDate.diff(momentStartDate, 'week', true);
                const initialOffsetWeek = momentStartDate.diff(minDate, 'week', true);
                for (let iteratorWeek = Math.ceil(initialOffsetWeek);
                    iteratorWeek <= (Math.ceil(initialOffsetWeek) + Math.ceil(projectDurationByWeek)); 
                    iteratorWeek++) {
                    instanceWeek['week' + iteratorWeek] = true;
                }
            });

        }

        // month calculate //
        if (this.timeLineDataByMonth.length > 0) {
            const totalMonths = this.diffFinder(minDate, maxDate, 'month');
            this.timeLineData['month'] = Array.from(Array(Math.ceil(totalMonths)).keys());
            for (let iterator = 0; iterator < totalMonths; iterator++) {
                const newMinDate = moment(JSON.parse(JSON.stringify(minDate)));
                const weekName = newMinDate.add(iterator, 'month');
                const headerMonth = {};
                headerMonth['timelineByMonth'] = moment(weekName).format('MMM');
                headerMonth['timelineByYear'] = moment(weekName).format('YY');
                this.timeLineHeaderMonth.push(headerMonth);
            }
            this.timeLineDataByMonth.map((instance) => {
                const momentStartDate = moment(new Date(instance.START_DATE));
                const momentEndDate = moment(new Date(instance.END_DATE));
                const projectDurationByMonth = this.diffFinder(momentStartDate, momentEndDate, 'month');
                const initialOffsetMonth = this.diffFinder(minDate, momentStartDate, 'month');
                for (let iteratorMonth = Math.ceil(initialOffsetMonth) - 1;
                    iteratorMonth <= (Math.ceil(initialOffsetMonth) + Math.ceil(projectDurationByMonth)) - 2;
                    iteratorMonth++) {
                    instance['month' + iteratorMonth] = true;
                }
            });
        }

        // year calculate //
        if (this.timeLineDataByYear.length > 0) {
            const totalYears = this.diffFinder(minDate, maxDate, 'year');
            this.timeLineData['year'] = Array.from(Array(Math.ceil(totalYears)).keys());
            for (let iterator = 0; iterator < totalYears; iterator++) {
                const newMinDate = moment(JSON.parse(JSON.stringify(minDate)));
                const weekName = newMinDate.add(iterator, 'year');
                const headerYear = {};
                headerYear['timelineByOnlyYear'] = moment(weekName).format('YYYY');
                this.timeLineHeaderYear.push(headerYear);
            }
            this.timeLineDataByYear.map((instanceYear) => {
                const momentStartDate = moment(new Date(instanceYear.START_DATE));
                const momentEndDate = moment(new Date(instanceYear.END_DATE));
                const projectDurationByYear = this.diffFinder(momentStartDate, momentEndDate, 'year');
                const initialOffsetYear = this.diffFinder(minDate, momentStartDate, 'year');
                for (let iteratorYear = Math.ceil(initialOffsetYear) - 1;
                    iteratorYear <= (Math.ceil(initialOffsetYear) + Math.ceil(projectDurationByYear)) - 2;
                    iteratorYear++) {
                    instanceYear['year' + iteratorYear] = true;
                }
            });
        }
        this.timelineStatus = 'month';
        this.timeLineTypeChange('month');
    }

    public timeLineTypeChange(type) {
        this.projectsForTimeline = [];
        this.timeLineHeader = [];
        if (type === 'month') {
            this.projectsForTimeline = this.timeLineDataByMonth;
            this.timeLineHeader = this.timeLineHeaderMonth;
        } else if (type === 'year') {
            this.projectsForTimeline = this.timeLineDataByYear;
            this.timeLineHeader = this.timeLineHeaderYear;
        } else {
            this.projectsForTimeline = this.timeLineDataByWeek;
            this.timeLineHeader = this.timeLineHeaderWeek;
        }
     }

    async renderViews(type) {
        this.searchFilter = '';
        this.tableView = type;
        await this.initiateProjectList();
        await this.onClearProjectFilter();
    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'OFFICE':
                this.filteredOfficeList = this.officeData.filter((s) => s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'STATUS':
                this.filterProjectStatusData = this.projectStatusData.filter(s =>
                    s.STATUS_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'GROUP':
                this.filterProjectGroupData = this.projectGroupData.filter(s =>
                    s.GROUP_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;

        }
    }

}
