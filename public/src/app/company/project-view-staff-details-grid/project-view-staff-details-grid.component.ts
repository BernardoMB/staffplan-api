import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import {ERROR_MESSAGE, getColumnsList, HIDDEN_PROJECT_DETAILS_COLUMNS, DATE_FORMAT} from '../../global/settings';
import {ApiService} from '../../api.service';
import {ToastrService} from 'ngx-toastr';
import {SortDescriptor, orderBy} from '@progress/kendo-data-query';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-project-view-staff-details-grid',
    templateUrl: './project-view-staff-details-grid.component.html',
    styleUrls: ['./project-view-staff-details-grid.component.css']
})
export class ProjectDetailsGridComponent implements OnInit {

    @Input() projectInstance: any;
    private modalRef: NgbModalRef;
    public gridView: GridDataResult;
    private projectDetailsData = [];


    public projectDetailColumns = [];
    private customColumnsName = {
        'ROLE': 'Project Role',
        'ALLOCATION': '% Allocation',
        'STAFF_ASSIGNMENT': 'Assignment Status'
    };
    private selectedStaff = null;
    private columnOrdering = {
        STAFF_NAME: 0,
        ROLE: 1,
        STATUS: 4
    };
    public renderTable = false;
    public showInternalLoader = false;
    public sort: SortDescriptor[] = [{
        field: 'END_DATE',
        dir: 'desc'
    }];
    public showDetailsLoader = true;
    public date_format = DATE_FORMAT;
    constructor(private modalService: NgbModal,
        private chRef: ChangeDetectorRef,
        private apiService: ApiService,
        private toastr: ToastrService) {
    }

    async ngOnInit() {
        const $that = this;
        await this.getProjectDetails();
    }

    public getProjectDetails() {
        const $that = this;
        this.apiService.getStaffForProject(this.projectInstance.PROJECT_ID).subscribe((response: any) => {
            if (response && response.data && response.data.length > 0) {
                $that.projectDetailColumns = getColumnsList(
                    response.data[0],
                    HIDDEN_PROJECT_DETAILS_COLUMNS,
                    $that.customColumnsName,
                    $that.columnOrdering);
            }
            const column = $that.projectDetailColumns.find(x => x.columnId === 'STAFF_NAME');
            if (typeof column === 'undefined') {
                $that.projectDetailColumns.splice(0, 1, {columnId: 'STAFF_NAME', columnLabel: 'Staff Name'});
            }
            $that.projectDetailsData = response.data;
            $that.showDetailsLoader = false;
            $that.chRef.detectChanges();
            $that.loadProjectStaff();
        }, error => {
            this.showDetailsLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getStaffDetails(callback, staffId) {
        this.apiService.getStaffDetails(staffId).subscribe((response) => {
            callback(response);
        }, error => {
            this.showDetailsLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadProjectStaff();
    }

    private loadProjectStaff(): void {
        this.gridView = {
            data: orderBy(this.projectDetailsData, this.sort),
            total: this.projectDetailsData.length
        };
    }

    public openVerticallyCentered(content, dataItem) {
        this.showInternalLoader = true;
        this.renderTable = false;
        const $that = this;
        this.getStaffDetails(function (response) {
            if (response && response.data) {
                $that.showInternalLoader = false;
                $that.selectedStaff = response.data;
                $that.renderTable = true;
            }
        }, dataItem.STAFF_ID);
        this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
    }

    public childStaffCloseEvent(cancel) {
        this.modalRef.close();
    }
}
