import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {
    getColumnsList,
    DATE_FORMAT,
    ERROR_MESSAGE,
    STAFF_ALL_PROJECT_DETAILS_COLUMNS,
    HIDDEN_ALL_PROJECT_IN_STAFF_COLUMNS,
} from '../../global/settings';
import {ApiService} from '../../api.service';
import {process, State} from '@progress/kendo-data-query';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ProjectViewStaffDetailPopoverComponent} from '../project-view-staff-detail-popover/project-view-staff-detail-popover.component';

@Component({
    selector: 'app-future-days',
    templateUrl: './future-days.component.html',
    styleUrls: ['./future-days.component.css']
})
export class FutureDaysComponent implements OnInit {
    @ViewChild(ProjectViewStaffDetailPopoverComponent) child: ProjectViewStaffDetailPopoverComponent;
    private customColumnsName = {
        'ROLE_NAME': 'Project Role',
        'STAFF_STATUS_NAME': 'Staff Status',
    };
    private columnOrdering = {
        'STAFF_NAME': 0,
        'PROJECT_NAME': 1,
        'ROLE_NAME': 2,
        'STAFF_STATUS_NAME': 4
    };
    private allAssignStaffData = [];
    private date_format = DATE_FORMAT;
    private groupby = [{field: 'Future Days'}];
    private modalRef: NgbModalRef;
    private staffIdForClass;
    private projectIdForClass;
    private projectName;
    private selectedStaff = null;
    private selectedProject = null;
    public typeAheadSuggestions = [];
    public assignStaffData: any;
    public filterValue = '';
    public gridHeight: any;
    public renderTable = false;
    public showInternalLoader = false;
    public allColumns = [];
    public showLoader = true;
    public config: State = {
        group: this.groupby
    };

    constructor(private chRef: ChangeDetectorRef, private toastr: ToastrService, private apiService: ApiService, private modalService: NgbModal) {
    }

    ngOnInit() {
        const $that = this;
        $that.gridHeight = window.innerHeight - 120;
        $that.getAllProjectDetails();
    }

    getAllProjectDetails() {
        let filterValue = {
            'ADVANCE_SEARCH': this.filterValue
        };
        this.apiService.getProjectPeoplesListFuture(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.ASSIGNEDSTAFF.length > 0) {
                this.allColumns = getColumnsList(response.data.ASSIGNEDSTAFF[0], HIDDEN_ALL_PROJECT_IN_STAFF_COLUMNS, this.customColumnsName, this.columnOrdering);
            } else {
                this.allColumns = STAFF_ALL_PROJECT_DETAILS_COLUMNS;
            }
            this.allAssignStaffData = [];
            if (response.data.ASSIGNEDSTAFF.length > 0) {
                let asssignStaff = response.data.ASSIGNEDSTAFF;
                for (let index in asssignStaff) {
                    asssignStaff[index]['END_DATE'] = new Date(asssignStaff[index]['END_DATE']);
                    asssignStaff[index]['NEXT_AVAILABLE'] = new Date(asssignStaff[index]['NEXT_AVAILABLE']);
                    if (asssignStaff[index]['FUTURE_DAYS'] != null) {
                        asssignStaff[index]['Future Days'] = asssignStaff[index]['FUTURE_DAYS'];
                        this.allAssignStaffData.push(asssignStaff[index]);
                    }
                }
            }
            if (response.data.FREESTAFF.length > 0) {
                for (const index in response.data.FREESTAFF) {
                    response.data.FREESTAFF[index]['FUTURE_DAYS'] = 'Next 30 Days';
                    response.data.FREESTAFF[index]['Future Days'] = 'Next 30 Days';
                    response.data.FREESTAFF[index]['NEXT_AVAILABLE'] = new Date(response.data.FREESTAFF[index]['NEXT_AVAILABLE']);
                    this.allAssignStaffData.push(response.data.FREESTAFF[index]);
                }

            }
            this.assignStaffData = process(this.allAssignStaffData, this.config);
            this.showLoader = false;
            this.chRef.detectChanges();
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
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

    public dateFilter(columnId) {
        if (columnId == 'END_DATE') {
            return 'date';
        }
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.config = state;
        this.config.group = this.groupby;
        this.assignStaffData = process(this.allAssignStaffData, this.config);
    }

    public getListByFilterChange(keyword): void {
        if ('' != keyword && null != keyword) {
            this.filterValue = keyword;
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
        }
    }


    public async getListByValueChange(value) {
        this.filterValue = value;
        this.getAllProjectDetails();
    }

    public openVerticallyCentered(content, dataItem) {
        this.staffIdForClass = dataItem.STAFF_ID;
        this.projectIdForClass = dataItem.PROJECT_ID;
        this.selectedStaff = null;
        this.showInternalLoader = true;
        this.renderTable = false;
        let $that = this;
        this.getStaffDetails(function (response) {
            if (response && response.data) {
                $that.showInternalLoader = false;
                $that.selectedStaff = response.data;
                $that.renderTable = true;
            }
        }, dataItem.STAFF_ID);
        this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
    }

    public openVerticallyCenteredProject(contentForProject, dataItem) {
        this.staffIdForClass = dataItem.STAFF_ID;
        this.projectIdForClass = dataItem.PROJECT_ID;
        this.projectName = dataItem.PROJECT_NAME;
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

    public childDeleteEvent(cancel) {
        this.modalRef.close();
        if (cancel != 1) {
            this.getAllProjectDetails();
        }
    }

    public childStaffCloseEvent(cancel) {
        this.modalRef.close();
    }
}
