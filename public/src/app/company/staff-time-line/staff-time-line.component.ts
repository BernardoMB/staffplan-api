import {Component, OnInit, ChangeDetectorRef, ViewChild, Renderer2} from '@angular/core';
import {process, State} from '@progress/kendo-data-query';
import {
    getColumnsList,
    HIDDEN_STAFF_COLUMNS,
    getMergedColumnsDataset,
    ERROR_MESSAGE,
} from '../../global/settings';
import {GridDataResult, DataStateChangeEvent, GridComponent} from '@progress/kendo-angular-grid';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../api.service';
import * as $ from 'jquery';
import {DatePipe} from '@angular/common';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {StaffViewProjectDetailsGridComponent} from '../staff-view-project-details-grid/staff-view-project-details-grid.component';

@Component({
    selector: 'app-staff-time-line',
    templateUrl: './staff-time-line.component.html',
    styleUrls: ['./staff-time-line.component.css']
})
export class StaffTimeLineComponent implements OnInit {
    @ViewChild(GridComponent) private grid: GridComponent;
    @ViewChild(StaffViewProjectDetailsGridComponent) child: StaffViewProjectDetailsGridComponent;
    private modalRef: NgbModalRef;
    private profileImageUrl = '../assets/images/avatar.png';
    private columnForAddRemove = [];
    private totalData;
    private childModelDataInstance: any;
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
        'GROUP_NAME': 'Staff Group'
    };
    private columnOrdering = {
        'STAFF_NAME': 0,
        'PHONE_1': 3,
        'PHONE_2': 4
    };

    private allStaffData = [];
    private columnsToMerge = {
        'STAFF_NAME': {
            columns: ['FIRST_NAME', 'MIDDLE_INITIAL', 'LAST_NAME'],
            separator: '',
            isDuplicate: false
        },
        'PHONE_1': {
            columns: ['PHONE_1_TYPE', 'PHONE_1'],
            separator: ' - ',
            isDuplicate: false
        },
        'PHONE_2': {
            columns: ['PHONE_2_TYPE', 'PHONE_2'],
            separator: ' - ',
            isDuplicate: false
        }
    };
    private forHiddenColumn = [];
    private columnForHideAndShow = [];
    private sparklineData = {};
    private isSparklineColsComputed = false;
    public gridHeight: any;
    public showColumnPopup: boolean = false;
    public staffColumns = [];
    public showLoader = true;
    public typeAheadSuggestions = [];
    public filterValue = '';
    public renderTable = false;
    public selectedStaff = null;
    public showInternalLoader = false;
    public staffIdForClass;
    public projectIdForClass;
    public childDialogOpened = false;
    public childDeletePopupMessage = '';
    public configs: State = {
        filter: {
            logic: 'and',
            filters: []
        }
    };
    public staffData: GridDataResult = process([], this.configs);
    public sparklineConfigs = {
        colors: ['#5a964a'],
        categoryAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        valueAxis: {
            type: 'numeric',
            plotBands: [{
                from: 100,
                to: 101,
                color: '#000'
            }]
        }
    };

    constructor(private chRef: ChangeDetectorRef, private toastr: ToastrService, private apiService: ApiService, private datePipe: DatePipe, private renderer: Renderer2, private modalService: NgbModal) {
    }

    async ngOnInit() {
        const $that = this;
        await this.initiateStaffList(function () {
            $that.generateSparkline();
        });
        $that.gridHeight = window.innerHeight - 180;
        if (this.isSparklineColsComputed) {
            let column: any;
            for (column in this.staffColumns) {
                if (this.staffColumns[column].columnId.startsWith('year_')) {
                    this.staffColumns.splice(column);
                    this.isSparklineColsComputed = false;
                }
            }
        }
    }

    async initiateStaffList(callback) {
        const $that = this;
        await this.getStaffList(function (response) {
            if (response && response.data && response.data.length > 0) {
                response.data = getMergedColumnsDataset(response.data, $that.columnsToMerge);
                $that.staffColumns = getColumnsList(response.data[0], HIDDEN_STAFF_COLUMNS, $that.customColumnsName, $that.columnOrdering);
                $that.columnForAddRemove = $that.staffColumns;
                for (let idx = 0; idx < $that.columnForAddRemove.length; idx++) {
                    if ($that.columnForAddRemove[idx].columnId == 'STAFF_NAME' || $that.columnForAddRemove[idx].columnId == 'GROUP_NAME' || $that.columnForAddRemove[idx].columnId == 'HOME_CITY' || $that.columnForAddRemove[idx].columnId == 'OFFICE_NAME') {
                        $that.columnForAddRemove[idx]['checked'] = true;
                        $that.columnForAddRemove[idx]['static'] = 1;
                        $that.columnForHideAndShow.push($that.columnForAddRemove[idx].columnId);
                        $that.forHiddenColumn.push($that.columnForAddRemove[idx].columnId);
                    }
                }
            }
            $that.totalData = response.data.length;
            $that.allStaffData = response.data;
            $that.staffData = process(response.data, $that.configs);
            $that.showLoader = false;
            if (typeof callback !== 'undefined') {
                callback();
            }
            $that.chRef.detectChanges();
        }, {
            'ADVANCE_SEARCH': $that.filterValue
        });
    }

    getStaffList(callback, postJson) {
        this.apiService.getStaffList(postJson).subscribe((response) => {
            callback(response);
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

    public dataStateChange(state: DataStateChangeEvent): void {
        this.configs = state;
        this.staffData = process(this.allStaffData, this.configs);
    }

    public async getStaffListBySearch(searchValue) {
        this.filterValue = searchValue;
        if (this.isSparklineColsComputed) {
            let column: any;
            for (column in this.staffColumns) {
                if (this.staffColumns[column].columnId.startsWith('year_')) {
                    this.staffColumns.splice(column);
                    this.isSparklineColsComputed = false;
                }
            }
        }
        this.columnForHideAndShow = [];
        let $that = this;
        this.initiateStaffList(function () {
            $that.generateSparkline();
        });
    }

    public getStaffDataByFilter(keyword): void {
        if ('' != keyword && null != keyword) {
            this.filterValue = keyword;
            this.apiService.getStaffDataByFilter(keyword).subscribe((response: any) => {
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

    public hiddenColumn(columnId) {
        if (this.forHiddenColumn.indexOf(columnId) > -1) {
            return false;
        } else {
            return true;
        }
    }

    public generateSparkline() {
        let $that = this;
        if (!$that.isSparklineColsComputed) {
            $that.apiService.getSparklinesForAllStaffs().subscribe((response: any) => {
                if (response && response.data) {
                    $that.sparklineData = response.data;
                    this.staffData.data.map((instance) => {
                        for (let key in response.data) {
                            let staffInstance = response.data[key];
                            for (let subKey in staffInstance) {
                                if (typeof instance['year_' + subKey] === 'undefined') {
                                    instance['year_' + subKey] = this.getSparklineDataset(instance, subKey);
                                }
                                if (!$that.isSparklineColsComputed) {
                                    $that.staffColumns.push({
                                        columnId: 'year_' + subKey,
                                        columnLabel: subKey
                                    });
                                }
                            }
                            $that.isSparklineColsComputed = true;
                        }
                    });
                    $that.columnForAddRemove = $that.staffColumns;
                    $that.columnForHideAndShow = [];
                    $that.forHiddenColumn = [];

                    for (let idx = 0; idx < $that.columnForAddRemove.length; idx++) {
                        if ($that.columnForAddRemove[idx].columnId == 'STAFF_NAME' || $that.columnForAddRemove[idx].columnId == 'GROUP_NAME' || $that.columnForAddRemove[idx].columnId == 'HOME_CITY' || $that.columnForAddRemove[idx].columnId == 'OFFICE_NAME' || $that.columnForAddRemove[idx]['columnId'].startsWith('year_')) {
                            $that.columnForAddRemove[idx]['checked'] = true;
                            $that.columnForAddRemove[idx]['static'] = 1;
                            $that.columnForHideAndShow.push($that.columnForAddRemove[idx].columnId);
                            $that.forHiddenColumn.push($that.columnForAddRemove[idx].columnId);
                        }
                    }
                }
            }, error => {
                $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        }

    }

    public getSparklineDataset(dataItem, yearColumn) {
        let sparklineArray = [];
        if (typeof this.sparklineData[dataItem.STAFF_ID] !== 'undefined') {
            let yearData = this.sparklineData[dataItem.STAFF_ID][yearColumn];
            for (let month in yearData) {
                sparklineArray.push(yearData[month].total);
            }
        } else {
            for (let i = 0; i < 12; i++) {
                sparklineArray.push(0);
            }
        }
        return sparklineArray;
    }

    public getSparklineTooltip(dataItem, yearColumn, value, category) {
        let tooltipString = '';
        let monthId = this.sparklineConfigs.categoryAxis.categories.indexOf(category);
        if (typeof this.sparklineData[dataItem.STAFF_ID] !== 'undefined') {
            let monthData = this.sparklineData[dataItem.STAFF_ID][yearColumn][monthId];
            for (let key in monthData.projects) {
                let project = monthData.projects[key];
                tooltipString += project.PROJECT_NAME + ' : ' + project.ALLOCATION + ' <br>';
            }
            tooltipString += 'Total : ' + monthData.total + ' <br>';
        } else {
            tooltipString += 'Total : 0';
        }
        return tooltipString;
    }


    public filterApplayFunction() {
        this.forHiddenColumn = this.columnForHideAndShow;
        this.columnForHideAndShow = [];
        let defaultProjectRole = this.columnForAddRemove.filter(x => x.checked == true);
        defaultProjectRole.forEach(element => {
            this.columnForHideAndShow.push(element.columnId);
        });
        this.showColumnPopup = false;
    }

    public onToggle(): void {
        this.showColumnPopup = !this.showColumnPopup;
    }

    private changeCheckbox(column, indexNumber) {
        var index = this.columnForHideAndShow.indexOf(column);
        if (index > -1) {
            this.columnForHideAndShow.splice(index, 1);
            for (let idx = 0; idx < this.columnForAddRemove.length; idx++) {
                if (this.columnForAddRemove[idx].columnId == column) {
                    this.columnForAddRemove[idx]['checked'] = false;
                }
            }
        } else {
            this.columnForHideAndShow.push(column);
            for (let idx = 0; idx < this.columnForAddRemove.length; idx++) {
                if (this.columnForAddRemove[idx].columnId == column) {
                    this.columnForAddRemove[idx]['checked'] = true;
                }
            }
        }
    }

    closeColumnPopup() {
        this.showColumnPopup = false;
    }

    resetColumn() {
        this.columnForHideAndShow = [];
        for (let column in this.columnForAddRemove) {
            if (this.columnForAddRemove[column].hasOwnProperty('static')) {
                if (this.columnForAddRemove[column].static == 2 || this.columnForAddRemove[column].static == 1) {
                    this.columnForAddRemove[column]['checked'] = true;
                }
                this.columnForHideAndShow.push(this.columnForAddRemove[column].columnId);
            } else {
                this.columnForAddRemove[column]['checked'] = false;
            }
        }
        this.filterApplayFunction();
        this.showColumnPopup = false;
    }

    public selectionChange(event) {
        $('.k-state-selected').removeClass('k-state-selected');
    }

    public rowExpand({dataItem}) {
        for (let key in this.staffData.data) {
            if (this.staffData.data[key].STAFF_ID !== dataItem.STAFF_ID) {
                this.grid.collapseRow(+key);
            }
        }
    }

    public childDeleteEvent(dataItem) {
        this.childDialogOpened = true;
        this.childModelDataInstance = dataItem;
        if (dataItem.PROJECT_STATUS_ID !== 1 && !dataItem.hasOwnProperty('ADD_RECORD')) {
            this.childDeletePopupMessage = 'Selected Project is Initiated/Ongoing and cannot be deleted, End Date for the particular Assignment will be changed with Today\'s Date. Are you sure you want to perform this action?';
        } else if (!dataItem.hasOwnProperty('STAFF_ID')) {
            this.childDeletePopupMessage = 'Are you sure you want to delete the assignment?';
        } else {
            this.childDeletePopupMessage = 'Are you sure you want to delete the assignment?';
        }
    }

    public childDeleteDialogAction(value) {
        if (value == 0) {
            this.childDialogOpened = false;
        } else {
            this.child.removeHandler(this.childModelDataInstance);
            this.childDialogOpened = false;
        }
    }

    public childStaffCloseEvent(cancel) {
        this.modalRef.close();
    }
}
