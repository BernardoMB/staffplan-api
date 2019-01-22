import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {
    getColumnsList,
    HIDDEN_OPEN_ROLL_COLUMNS,
    DATE_FORMAT,
    ERROR_MESSAGE,
} from '../../global/settings';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../api.service';
import {process, State, GroupDescriptor, groupBy} from '@progress/kendo-data-query';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProjectViewStaffDetailPopoverComponent} from '../project-view-staff-detail-popover/project-view-staff-detail-popover.component';

@Component({
    selector: 'app-open-role',
    templateUrl: './open-role.component.html',
    styleUrls: ['./open-role.component.css']
})
export class OpenRoleComponent implements OnInit {
    @ViewChild(ProjectViewStaffDetailPopoverComponent) child: ProjectViewStaffDetailPopoverComponent;
    private modalRef: NgbModalRef;
    private customColumnsName = {
        'ROLE_NAME': 'Project Role',
        'STATUS_NAME': 'Project Status',
        'STAFF_ASSIGNMENT': 'Assignment Status'
    };
    private columnOrdering = {
        'PROJECT_NAME': 0,
        'ROLE_NAME': 1,
        'STATUS_NAME': 2
    };
    private allData = [];
    private date_format = DATE_FORMAT;
    private staffIdForClass;
    private projectIdForClass;
    private selectedStaff = null;
    private projectName;
    private selectedProject = null;
    public typeAheadSuggestions = [];
    public showLoader = true;
    public allColumns = [];
    public columnListGrouping: Array<string> = ['Clear', 'Project Name', 'Start Date', 'Project Status'];
    public openRoleData: any;
    public filterValue: string = '';
    public gridHeight: any;
    public renderTable = false;
    public showInternalLoader = false;
    public groups: GroupDescriptor[] = [{field: 'PROJECT_NAME'}];
    public config: State = {
        group: [{field: 'PROJECT_NAME'}]
    };

    constructor(private chRef: ChangeDetectorRef, private toastr: ToastrService, private apiService: ApiService, private modalService: NgbModal) {
    }

    ngOnInit() {
        const $that = this;
        $that.gridHeight = window.innerHeight - 120;
        $that.getAllPlannedProjectDetail();
    }

    getAllPlannedProjectDetail() {
        let filterValue = {
            'ADVANCE_SEARCH': this.filterValue
        };
        this.apiService.getPlannedProjectPeople(filterValue).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                this.allColumns = getColumnsList(response.data[0], HIDDEN_OPEN_ROLL_COLUMNS, this.customColumnsName, this.columnOrdering);
            }
            this.allData = [];
            for (let index in response.data) {
                response.data[index]['END_DATE'] = new Date(response.data[index]['END_DATE']);
                response.data[index]['START_DATE'] = new Date(response.data[index]['START_DATE']);
            }
            this.allData = response.data;
            this.openRoleData = process(this.allData, this.config);
            this.showLoader = false;
            this.chRef.detectChanges();
        }, error => {
            this.showLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    onGroupByColumnSelect(columnName) {
        let column = [];
        if (columnName == 'Start Date') {
            column.push({field: 'START_DATE'});
        } else if (columnName == 'Project Name') {
            column.push({field: 'PROJECT_NAME'});
        } else if (columnName == 'Project Status') {
            column.push({field: 'STATUS_NAME'});
        } else {
            column = [];
        }
        this.groups = column;
        this.config.group = this.groups;
        this.openRoleData = process(this.allData, this.config);
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
        if (columnId == 'END_DATE' || columnId == 'START_DATE') {
            return 'date';
        } else if (columnId == 'ALLOCATION') {
            return 'numeric';
        }
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.config = state;
        this.config.group = this.groups;
        this.openRoleData = process(this.allData, this.config);
    }

    public getListByFilterChange(keyword): void {
        if ('' != keyword && null != keyword) {
            this.filterValue = keyword;
            this.apiService.getPlannedProjectDataByFilter(keyword).subscribe((response: any) => {
                if (response.error) {
                    this.showLoader = false;
                    this.toastr.error(response.message);
                } else {
                    this.chRef.detectChanges();
                    this.typeAheadSuggestions = [];
                    for (var data in response.data.searchResult) {
                        this.typeAheadSuggestions.push(String(response.data.searchResult[data]));
                    }
                }
            }, error => {
                this.showLoader = false;
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        }
    }


    public async getListByValueChange(value) {
        this.filterValue = value;
        this.getAllPlannedProjectDetail();
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
            this.getAllPlannedProjectDetail();
        }
    }

}
