import {ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {
    DATE_FORMAT,
    ERROR_MESSAGE,
    getColumnsList,
    getMergedColumnsDataset,
    HIDDEN_STAFF_COLUMNS,
    IMAGE_PATH,
    STATIC_IMAGE,
    customFieldNames
} from '../../global/settings';
import {process, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridComponent, GridDataResult} from '@progress/kendo-angular-grid';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../api.service';
import {DatePipe} from '@angular/common';
import _ from 'lodash';
import * as moment from 'moment';
import { debug } from 'util';

@Component({
    selector: 'app-staff-view',
    templateUrl: './staff-view.component.html',
    styleUrls: ['./staff-view.component.css']
})
export class StaffViewComponent implements OnInit, OnDestroy {
    @ViewChild(GridComponent) private grid: GridComponent;
    private modalRef: NgbModalRef;
    private customColumnsName = {
        'HOME_CITY': 'City of Residence',
        'HOME_STATE': 'State',
        'HOME_ZIP': 'Zip',
        'STAFF_CERTIFICATION': 'Certification',
        'STAFF_TRAINING': 'Training',
        'STATUS_NAME': 'Status',
        'ROLE_NAME': 'Staff Role',
        'CATEGORY_NAME': 'Category',
        'OFFICE_NAME': 'Office',
        'GROUP_NAME': 'Staff Group',
        'PREFFERED_NAME': 'Name'
    };
    private columnOrdering = {
        'STAFF_NAME': 0,
        'STATUS_NAME': 1,
        'ROLE_NAME': 2,
        'GROUP_NAME': 3,
        'OFFICE_NAME': 4
    };

    private allStaffData = [];
    public gridHeight: any;
    public showColumnPopup = false;
    public staffColumns = [];
    public showLoader = true;
    public typeAheadSuggestions = [];
    public filterValue = '';
    public renderTable = false;
    public selectedStaff = null;
    public showInternalLoader = false;
    public staffIdForEditStaff;
    public projectIdForClass;
    public childDialogOpened = false;
    public childDeletePopupMessage = '';
    public configs: State = {};
    public date_format = DATE_FORMAT;
    public tableView = 1;
    public staffData: GridDataResult = process([], this.configs);
    private timeLineDataByMonth = [];
    private timeLineDataByWeek = [];
    private timeLineDataByYear = [];
    private timeLineHeaderMonth = [];
    private timeLineHeaderWeek = [];
    private timeLineHeaderYear = [];
    private subscription;
    public projectsForTimeline = [];
    public timeLineData = [];
    public timeLineHeader = [];
    public timelineStatus = 'month';
    public timelineByType = ['month', 'year', 'week'];
    public Math = Math;
    public imagePath = IMAGE_PATH;
    public STATIC_IMAGE = STATIC_IMAGE;
    public model = {
        status: {STATUS_ID: 1, STATUS_NAME: 'Active' },
        role: null,
        group: null,
        office: null
    };
    public viewDataByFilter = {status: {STATUS_ID: 1, STATUS_NAME: 'Active' }, role: null, group: null, office: null};
    public filterMenuOpen = false;
    public assignModel = {
        staff: null,
        project: null,
    };
    public viewStaffDataByFilter = {staff: '', project: null};
    public projectList = [];
    public filteredProjectsList = [];
    public filterdStaffList = [];
    public staffGroup = [];
    public filterStaffGroup = [];
    public staffStatus = [];
    public filterStaffStatus = [];
    public staffRole = [];
    public filterStaffRole = [];
    public assignStaffData = [];
    public officeData = [];
    public filteredOfficeList = [];
    public customFields;
    public displayProjectType = null;
    public viewPortHeight = 450;
    public selectedOfficeId;

    constructor(private chRef: ChangeDetectorRef,
        private toastr: ToastrService,
        private apiService: ApiService,
        private datePipe: DatePipe,
        private renderer: Renderer2,
        private modalService: NgbModal) {
        this.subscription = this.apiService.staffUrlStatus.subscribe(res => {
            if (res != null) {
                this.onClearStaffFilter();
                this.filterValue = res.status;
                this.selectedOfficeId = res.officeId;
            }
        });
    }

    ngOnInit() {
        this.initiateStaffList();
        this.getAllProjectPeopleList();
        this.getCommonList();
        this.getProjectList();
        this.gridHeight = window.innerHeight - 180;
        this.customFields = JSON.parse(localStorage.getItem('customFieldNames'));
        this.viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 330;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.apiService.redirectStaff.next(null);
    }

    public initiateStaffList() {
        const $that = this;
        this.getStaffList(function (response) {
            if (response && response.data && response.data.length > 0) {
                $that.staffColumns = getColumnsList(response.data[0], HIDDEN_STAFF_COLUMNS, $that.customColumnsName, $that.columnOrdering);
                $that.staffColumns = customFieldNames($that.staffColumns, $that.customFields);
            }
            $that.filterdStaffList = response.data.slice();
            $that.allStaffData = response.data;
            $that.staffData = process(response.data, $that.configs);
            $that.showLoader = false;
            $that.chRef.detectChanges();
            $that.onStaffFilterSubmit('redirectUrl');
        }, this.applySearchValue());
    }

    public applySearchValue() {
        if (this.filterValue === 'onBench') {
            this.filterValue = '';
            this.displayProjectType = 'On Bench';
            return {
                'ONBENCH': '1'
            };

        } else if (this.filterValue === 'adminStaff') {
            this.filterValue = '';
            this.displayProjectType = 'Admin Staff';
            return {
                'STAFF_TYPE': 'ADMIN'
            };
        } else if (this.filterValue === 'opsStaff') {
            this.filterValue = '';
            this.displayProjectType = 'OPS Staff';
            return {
                'STAFF_TYPE': 'OPERATIONAL'
            };
        } else {
            return {
                'ADVANCE_SEARCH': this.filterValue
            };
        }
    }

    public childStaffCloseEvent(value) {
        if (value === 1) {
            this.displayProjectType = null;
            this.initiateStaffList();
        }
        this.modalRef.close();
    }

    public childAssignStaffCloseEvent() {
        this.modalRef.close();
    }

    public openVerticallyCentered(addContent) {
        this.modalRef = this.modalService.open(addContent, {centered: true, size: 'lg'});
    }

    getStaffList(callback, postJson) {
        this.apiService.getStaffList(postJson).subscribe((response) => {
            callback(response);
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getAllProjectPeopleList() {
        const filterValue = {
            'ADVANCE_SEARCH': this.filterValue
        };
        this.apiService.getAllProjectPeopleList(filterValue).subscribe((response: any) => {
            const $that = this;
            $that.assignStaffData = _.cloneDeep(response.data);
            $that.timeLineDataByWeek = _.cloneDeep(response.data);
            $that.timeLineDataByMonth = _.cloneDeep(response.data);
            $that.timeLineDataByYear = _.cloneDeep(response.data);
            $that.viewTimeLine();
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getProjectList() {
        this.apiService.getProjectsList({}).subscribe((response: any) => {
            if (response && response.data) {
                this.projectList = response.data;
                this.filteredProjectsList = response.data.slice();
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getCommonList() {
        const staffStatusKey = 'STAFF_STATUS';
        this.apiService.getCommonListForProject(staffStatusKey).subscribe((response: any) => {
            if (response && response.data) {
                this.staffStatus = response.data;
                this.filterStaffStatus = response.data;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });


        const staffGroupKey = 'STAFF_GROUP';
        this.apiService.getCommonListForProject(staffGroupKey).subscribe((response: any) => {
            if (response && response.data) {
                this.staffGroup = response.data;
                this.filterStaffGroup = response.data;
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        const staffRoleKey = 'STAFF_ROLE';
        this.apiService.getCommonListForProject(staffRoleKey).subscribe((response: any) => {
            if (response && response.data) {
                this.staffRole = response.data;
                this.filterStaffRole = response.data;
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
                    this.onStaffFilterSubmit(undefined);
                }
            }
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.configs = state;
        this.staffData = process(this.allStaffData, this.configs);
    }

    public async getStaffListBySearch(searchValue) {
        this.displayProjectType = null;
        this.filterValue = searchValue.trim();
        if (this.tableView === 2) {
            this.onClearAssignStaffFilter();
            this.getAllProjectPeopleList();
        } else {
            this.initiateStaffList();
            this.onClearStaffFilter();
        }

    }

    public getStaffDataByFilter(keyword): void {
        this.filterValue = keyword.trim();
        if (this.filterValue.length > 0 && keyword !== '' && keyword != null) {
            if (this.tableView === 2) {
                this.apiService
                    .getProjectPeopleAndPlannedTypehead(keyword)
                    .subscribe(
                        (response: any) => {
                            if (response.error) {
                                this.showLoader = false;
                                this.toastr.error(response.message);
                            } else {
                                this.chRef.detectChanges();
                                this.typeAheadSuggestions =
                                    response.data.searchResult;
                            }
                        },
                        error => {
                            this.showLoader = false;
                            this.toastr.error(
                                ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
                                ERROR_MESSAGE.ERROR_MESSAGE_HEADING
                            );
                        }
                    );
            } else {
                this.apiService
                    .getStaffDataByFilter(keyword)
                    .subscribe(
                        (response: any) => {
                            if (response.error) {
                                this.showLoader = false;
                                this.toastr.error(response.message);
                            } else {
                                this.chRef.detectChanges();
                                this.typeAheadSuggestions =
                                    response.data.searchResult;
                            }
                        },
                        error => {
                            this.showLoader = false;
                            this.toastr.error(
                                ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
                                ERROR_MESSAGE.ERROR_MESSAGE_HEADING
                            );
                        }
                    );
            }
        }
    }

    public openVerticallyCenteredEditStaff(editContent, dataItem) {
        this.staffIdForEditStaff = dataItem.STAFF_ID;
        this.modalRef = this.modalService.open(editContent, {centered: true, size: 'lg'});
    }

    public openVerticallyCenteredAssignProject(assignContent, dataItem) {
        this.staffIdForEditStaff = dataItem.STAFF_ID;
        this.modalRef = this.modalService.open(assignContent, {centered: true, size: 'lg'});
    }

    public rowExpand({dataItem}) {
        for (const key in this.staffData.data) {
            if (this.staffData.data[key].STAFF_ID !== dataItem.STAFF_ID) {
                this.grid.collapseRow(+key);
            }
        }
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

    public viewTimeLine() {
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
        if (this.timeLineDataByWeek.length > 0) {
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
        if (this.projectsForTimeline.length > 0) {
            this.projectsForTimeline.sort((a, b) => a.STAFF_ID.localeCompare(b.STAFF_ID));
            this.projectsForTimeline.map((instance) => {
                instance['length'] = this.projectsForTimeline.filter(x => x.STAFF_ID === instance.STAFF_ID).length;
                instance['timelineColor'] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' +
                    (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            });
        }
    }

    public errorHandler(event) {
        event.target.src = STATIC_IMAGE;
    }

    async renderViews(type) {
        this.filterValue = '';
        this.tableView = type;
        this.model = {
            status: null,
            role: null,
            group: null,
            office: null
        };
        this.assignModel = {
            project: null,
            staff: null,
        };
        this.viewStaffDataByFilter = {...this.assignModel};
        this.viewDataByFilter = {...this.model};
        if (this.tableView === 2) {
            this.getAllProjectPeopleList();
        } else {
            await this.initiateStaffList();
        }

    }

    public onStaffFilterSubmit(type) {
        if (type !== 'redirectUrl' && this.displayProjectType && !this.selectedOfficeId) {
            this.displayProjectType = null;
            this.initiateStaffList();
        } else if (type === 'removeSearch' && this.filterValue !== '' && !this.selectedOfficeId) {
            this.filterValue = '';
            this.initiateStaffList();
        }
        const filter = {};
        if (this.model.status) {
            filter['STATUS_NAME'] = this.model.status.STATUS_NAME;
        }
        if (this.model.group) {
            filter['GROUP_NAME'] = this.model.group.GROUP_NAME;
        }
        if (this.model.role) {
            filter['ROLE_NAME'] = this.model.role.ROLE_NAME;
        }
        if (this.model.office != null) {
            filter['OFFICE_NAME'] = this.model.office.OFFICE_NAME;
        }
        const staff = this.allStaffData.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] !== filter[key]) {
                    return false;
                }
            }
            return true;
        });
        if (this.tableView === 2) {
            this.timeLineDataByWeek = _.cloneDeep(staff);
            this.timeLineDataByMonth = _.cloneDeep(staff);
            this.timeLineDataByYear = _.cloneDeep(staff);
            this.viewTimeLine();
        } else {
            this.staffData = process(staff, this.configs);
        }
        this.viewDataByFilter = {...this.model};
        this.filterMenuOpen = false;
    }

    public onClearStaffFilter() {
        this.model = {
            status: null,
            role: null,
            group: null,
            office: null
        };
        this.onStaffFilterSubmit(undefined);
    }

    public onAssignStaffFilterSubmit(type) {
        if (type === 'removeSearch' && this.filterValue !== '') {
            this.filterValue = '';
            this.getAllProjectPeopleList();
        }

        const filter = {};
        if (this.assignModel.staff) {
            filter['STAFF_NAME'] = this.assignModel.staff['STAFF_NAME'];
        }
        if (this.assignModel.project) {
            filter['PROJECT_NAME'] = this.assignModel.project['PROJECT_NAME'];
        }
        const assignStaff = this.assignStaffData.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] !== filter[key]) {
                    return false;
                }
            }
            return true;
        });
        this.timeLineDataByWeek = _.cloneDeep(assignStaff);
        this.timeLineDataByMonth = _.cloneDeep(assignStaff);
        this.timeLineDataByYear = _.cloneDeep(assignStaff);
        this.viewTimeLine();
        this.viewStaffDataByFilter = {...this.assignModel};
        this.filterMenuOpen = false;
    }

    public onClearAssignStaffFilter() {
        this.assignModel = {
            project: null,
            staff: null,
        };
        this.onAssignStaffFilterSubmit(undefined);
    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'PROJECT':
                this.filteredProjectsList = this.projectList.filter((s) =>
                    s.PROJECT_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'STAFF':
                this.filterdStaffList = this.allStaffData.filter((s) => s.STAFF_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'OFFICE':
                this.filteredOfficeList = this.officeData.filter((s) => s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'GROUP':
                this.filterStaffGroup = this.staffGroup.filter(s => s.GROUP_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'STATUS':
                this.filterStaffStatus = this.staffStatus.filter(s => s.STATUS_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'ROLE':
                this.filterStaffRole = this.staffRole.filter(s => s.ROLE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }
    }
}


