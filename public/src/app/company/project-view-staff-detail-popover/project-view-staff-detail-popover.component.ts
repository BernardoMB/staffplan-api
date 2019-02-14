import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {
  ERROR_MESSAGE,
  DATE_FORMAT,
  getColumnsList,
  HIDDEN_PROJECT_DETAILS_COLUMNS,
  TIMELINE_TYPE,
  HIDDEN_PROJECT_UNASSIGNED_COLUMNS,
  PROJECT_LOG_PROJECT_TEAM,
  PROJECT_LOG_PROJECT_ROLE,
  dateValidation,
  customFieldNames,
  PROJECT_LOG_CREATE,
  customFieldLabels,
  convertToUTC,
  convertDateToUTC
} from '../../global/settings';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { TabStripComponent } from '@progress/kendo-angular-layout';
import * as moment from 'moment';

@Component({
  selector: 'app-project-view-staff-detail-popover',
  templateUrl: './project-view-staff-detail-popover.component.html',
  styleUrls: ['./project-view-staff-detail-popover.component.css']
})
export class ProjectViewStaffDetailPopoverComponent
  implements OnInit, OnChanges {
  @ViewChild(TabStripComponent) private tab: TabStripComponent;
  @Input() projectInstance: any;
  @Input() renderTable: any;
  @Input() addForm: any;
  @Output() childDeleteEvent = new EventEmitter();
  @ViewChild(NgForm) projectForm: NgForm;
  @ViewChild(NgForm) assignRoleForm: NgForm;
  @ViewChild('STAFF_START_DATE') staff_start_date;
  @ViewChild('STAFF_END_DATE') staff_end_date;
  @ViewChild('ROLE_START_DATE') role_start_date;
  @ViewChild('ROLE_END_DATE') role_end_date;
  @ViewChild('PROJECT_STATUS') project_status;
  @ViewChild('OFFICE') office;
  @ViewChild('PROJECT_CATEGORY') project_category;
  @ViewChild('PROJECT_TYPE') project_type;
  @ViewChild('CUSTOMER') customer;
  @ViewChild('PROJECT_GROUP') project_group;
  public editProjectOverview = false;
  public editProjectClient = false;
  public editProjectAddress = false;
  public editProjectSummary = false;
  public editProjectTimeline = false;
  public projectDetailsData = [];
  public unAssignedProjectData = [];
  public showDetailsLoader = true;
  private customColumnsName = {
    ROLE_NAME: 'Project Role',
    ALLOCATION: '% Allocation',
    STATUS_NAME: 'Staff Status',
    RESUME_SUBMITTED: 'Proposal',
    STAFF_ASSIGNMENT: 'Assignment Status'
  };
  private unAssignedColumnName = {
    ROLE_NAME: 'Project Role',
    ALLOCATION: '% Allocation',
    RESUME_SUBMITTED: 'Proposal'
  };
  private columnOrdering = {
    STAFF_NAME: 0,
    ROLE: 1,
    STATUS: 4
  };
  private unAssginColumnOrdering = {
    START_DATE: 0
  };
  private promises = [];
  private projectStatusId: number = null;
  private projectIdForUpdate = null;
  public autoCorrect = true;
  public timeLine = null;
  private projectStatusList = [];
  private officeList = [];
  private projectTypeList = [];
  private groupList = [];
  private customerList = [];
  private peopleList = [];
  private categoryList = [];
  private roleList = [];
  private todayDate = new Date();
  public date_format = DATE_FORMAT;
  public timelineType = TIMELINE_TYPE;
  public projectStaffRoleTabDisabled = true;
  public filteredProjectStatusList: Array<string> = [];
  public filteredOfficeList: Array<string> = [];
  public filteredProjectTypeList: Array<string> = [];
  public filteredCustomerList: Array<string> = [];
  public filteredPeopleList: Array<string> = [];
  public filteredCategoryList: Array<string> = [];
  public filteredRoleList: Array<string> = [];
  public filteredGroupList: Array<string> = [];
  public errorStartDate: any = { isError: false, errorMessage: '' };
  public errorEndDate: any = { isError: false, errorMessage: '' };
  public errorWhitespace: any = { isError: false, errorMessage: '' };
  public addProjectModel = {
    START_DATE: new Date(),
    END_DATE: new Date(),
    CUSTOMER_CONTACT: '',
    PROJECT_NAME: '',
    PROJECT_STATUS: { STATUS_ID: '', STATUS_NAME: 'Select' },
    OFFICE: { OFFICE_ID: '', OFFICE_NAME: 'Select' },
    ROM: null,
    PROJECT_CATEGORY: { CATEGORY_ID: '', CATEGORY_NAME: 'Select' },
    PROJECT_TYPE: { TYPE_ID: '', TYPE_NAME: 'Select' },
    CUSTOMER: { CUSTOMER_ID: '', CUSTOMER_NAME: 'Select' },
    PROJECT_DESCRIPTION: '',
    TIMELINE_TYPE: '1',
    PROJECT_CITY: null,
    PROJECT_STATE: null,
    PROJECT_ADDRESS: null,
    PROJECT_ZIP: null,
    PROJECT_NO: '',
    PROJECT_GROUP: { GROUP_ID: '', GROUP_NAME: 'Select' }
  };
  public assignRoleModel = {
    START_DATE: new Date(),
    END_DATE: new Date(),
    ALLOCATION: 100,
    ROLE_DETAIL: { ROLE_ID: '', ROLE_NAME: 'Select' },
    RESUME_SUBMITTED: 0,
    ID: null
  };
  public assignStaffModel = {
    START_DATE: new Date(),
    END_DATE: new Date(),
    ALLOCATION: 100,
    ROLE_DETAIL: { ROLE_ID: '', ROLE_NAME: 'Select' },
    RESUME_SUBMITTED: 0,
    STAFF_DETAIL: { STAFF_ID: '', STAFF_NAME: 'Select' },
    ID: null
  };
  public sort: SortDescriptor[] = [
    {
      field: 'END_DATE',
      dir: 'desc'
    }
  ];
  public dataPopulate = true;
  public gridView: GridDataResult;
  public unAssignedProjectGridView: GridDataResult;
  public projectDetailColumns = [];
  public unAssignedProjectColumns = [];
  public activeRolePanel = 'role-list';
  public activeStaffPanel = 'staff-list';
  public columnEditable = 1;
  public assignRoleUpdate = 0;
  public assignStaffUpdate = 0;
  public dateValidationMsg = '';
  public defaultValues: Array<string> = [];
  public addFormLabels;
  public isSaveProjectDetail = false;
  public customLabel;

  constructor(
    private chRef: ChangeDetectorRef,
    private apiService: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.dataPopulate = false;
    if (this.addForm && this.addForm === 1) {
      this.dataPopulate = true;
      this.editProjectOverview = true;
      this.editProjectClient = true;
      this.editProjectAddress = true;
      this.editProjectSummary = true;
      this.editProjectTimeline = true;
    }
    const $that = this;
    $that.promises = [
      new Promise((resolve, reject) => {
        $that.getProjectStatusList(resolve, reject);
      }),
      new Promise((resolve, reject) => {
        $that.getOfficeNameList(resolve, reject);
      }),
      new Promise((resolve, reject) => {
        $that.getProjectTypeList(resolve, reject);
      }),
      new Promise((resolve, reject) => {
        $that.getCustomerList(resolve, reject);
      }),
      new Promise((resolve, reject) => {
        $that.getPeopleList(resolve, reject);
      }),
      new Promise((resolve, reject) => {
        $that.getCategoryList(resolve, reject);
      }),
      new Promise((resolve, reject) => {
        $that.getRoleList(resolve, reject);
      }),
      new Promise((resolve, reject) => {
        $that.getGroupList(resolve, reject);
      })
    ];
    this.columnForDataTable();
    this.customLabel = JSON.parse(localStorage.getItem('customFieldNames'));
    this.addFormLabels = customFieldLabels(PROJECT_LOG_CREATE, this.customLabel);
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.unAssignedProjectData = [];
    this.projectDetailsData = [];
    for (const change in changes) {
      if (change === 'renderTable' && changes[change].currentValue) {
        this.projectStaffRoleTabDisabled = false;
        if (
          this.projectInstance &&
          this.projectInstance['STAFF_DATA'] &&
          this.projectInstance['STAFF_DATA'].length > 0
        ) {
          for (const key in this.projectInstance['STAFF_DATA']) {
            if ('ID' in this.projectInstance['STAFF_DATA'][key]) {
              this.unAssignedProjectData.push(
                this.projectInstance['STAFF_DATA'][key]
              );
            }
          }
        }
        this.timeLine = TIMELINE_TYPE.find(
          x => x.TIMELINE_TYPE_KEY === this.projectInstance.TIMELINE_TYPE
        );

        this.projectDetailsData = this.projectInstance['STAFF_DATA'];
        this.showDetailsLoader = false;
        this.columnForDataTable();
        this.loadProjectStaff();
        this.loadUnAssignedProject();
        this.chRef.detectChanges();

        Promise.all(this.promises).then(data => {
          this.projectFormEdit();
        });
      }
    }
  }

  private columnForDataTable() {
    if (this.projectDetailsData.length > 0) {
      this.projectDetailColumns = getColumnsList(
        this.projectDetailsData[0],
        HIDDEN_PROJECT_DETAILS_COLUMNS,
        this.customColumnsName,
        this.columnOrdering
      );
    } else {
      this.projectDetailColumns = PROJECT_LOG_PROJECT_TEAM;
    }
    const column = this.projectDetailColumns.find(
      x => x.columnId === 'STAFF_NAME'
    );
    if (typeof column === 'undefined') {
      this.projectDetailColumns.splice(0, 0, {
        columnId: 'STAFF_NAME',
        columnLabel: 'Staff Name'
      });
    }
    this.projectDetailColumns = customFieldNames(this.projectDetailColumns, this.customLabel);
    if (this.unAssignedProjectData.length > 0) {
      this.unAssignedProjectColumns = getColumnsList(
        this.unAssignedProjectData[0],
        HIDDEN_PROJECT_UNASSIGNED_COLUMNS,
        this.unAssignedColumnName,
        this.unAssginColumnOrdering
      );
      this.unAssignedProjectColumns = customFieldNames(this.unAssignedProjectColumns, this.customLabel);
    } else {
      this.unAssignedProjectColumns = PROJECT_LOG_PROJECT_ROLE;
    }
    this.showDetailsLoader = false;
  }

  private async getOfficeNameList(resolve, reject) {
    this.apiService.getOfficeNameListing().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.officeList = response.data;
          this.filteredOfficeList = this.officeList.slice();
          return resolve('done');
        }
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
        return reject('error');
      }
    );
  }

  private async getProjectStatusList(resolve, reject) {
    const $that = this;
    const projectStatus = 'PROJECT_STATUS';
    await $that.apiService.getCommonListForProject(projectStatus).subscribe(
      (response: any) => {
        if (response && response.data) {
          $that.projectStatusList = response.data;
          $that.filteredProjectStatusList = $that.projectStatusList.slice();
          return resolve('done');
        }
      },
      error => {
        $that.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
        return reject('error');
      }
    );
  }

  private async getProjectTypeList(resolve, reject) {
    const projectType = 'PROJECT_TYPE';
    this.apiService.getCommonListForProject(projectType).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.projectTypeList = response.data;
          this.filteredProjectTypeList = this.projectTypeList.slice();
          return resolve('done');
        }
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
        return reject('error');
      }
    );
  }

  private async getCustomerList(resolve, reject) {
    const customer = 'CUSTOMER';
    this.apiService.getCommonListForProject(customer).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.customerList = response.data;
          this.filteredCustomerList = this.customerList.slice();
          return resolve('done');
        }
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
        return reject('error');
      }
    );
  }

  private async getPeopleList(resolve, reject) {
    const people = 'STAFF';
    this.apiService.getCommonListForProject(people).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.peopleList = response.data;
          for (const key in this.peopleList) {
            const dataItem = this.peopleList[key];
            if (dataItem['PREFERRED_NAME'] && dataItem['PREFERRED_NAME'] !== '') {
              dataItem['STAFF_NAME'] = `${dataItem['PREFERRED_NAME']} ${dataItem['LAST_NAME']}`;
            } else {
              dataItem['STAFF_NAME'] = `${dataItem['FIRST_NAME']} ${dataItem['LAST_NAME']}`;
            }
          }
          this.filteredPeopleList = this.peopleList.slice();
          return resolve('done');
        }
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
        return reject('error');
      }
    );
  }

  private async getCategoryList(resolve, reject) {
    const category = 'CATEGORY';
    this.apiService.getCommonListForProject(category).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.categoryList = response.data;
          this.filteredCategoryList = this.categoryList.slice();
          return resolve('done');
        }
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
        return reject('error');
      }
    );
  }

  private async getRoleList(resolve, reject) {
    this.apiService.getRoleList().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.roleList = response.data;
          this.filteredRoleList = this.roleList.slice();
          return resolve('done');
        }
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
        return reject('error');
      }
    );
  }

  private async getGroupList(resolve, reject) {
    const groupType = 'PROJECT_GROUP';
    this.apiService.getCommonListForProject(groupType).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.groupList = response.data;
          this.filteredGroupList = this.groupList.slice();
          return resolve('done');
        }
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
        return reject('error');
      }
    );
  }

  public getProjectDetails(projectId) {
    this.unAssignedProjectData = [];
    this.apiService.getProjectDetails(projectId).subscribe(
      (response: any) => {
        for (const key in response.data['STAFF_DATA']) {
          if ('ID' in response.data['STAFF_DATA'][key]) {
            this.unAssignedProjectData.push(response.data['STAFF_DATA'][key]);
          }
        }
        this.projectDetailsData = response.data['STAFF_DATA'];
        this.showDetailsLoader = false;
        this.columnForDataTable();
        this.loadProjectStaff();
        this.loadUnAssignedProject();
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
      }
    );
  }

  private projectFormEdit() {
    this.dataPopulate = false;
    const $that = this;
    this.projectIdForUpdate = this.projectInstance.PROJECT_ID;
    const startDate = new Date(this.projectInstance.START_DATE);
    const endDate = new Date(this.projectInstance.END_DATE);
    $that.addProjectModel.PROJECT_NO = this.projectInstance.PROJECT_NO;
    $that.addProjectModel.PROJECT_NAME = this.projectInstance.PROJECT_NAME;
    $that.addProjectModel.START_DATE = convertDateToUTC(startDate);
    $that.addProjectModel.END_DATE = convertDateToUTC(endDate);
    $that.addProjectModel.PROJECT_STATUS = $that.projectStatusList.find(
      x => x.STATUS_ID === this.projectInstance.PROJECT_STATUS_ID
    );
    $that.addProjectModel.OFFICE = $that.officeList.find(
      x => x.OFFICE_ID === this.projectInstance.OFFICE_ID
    );
    $that.addProjectModel.PROJECT_CATEGORY = $that.categoryList.find(
      x => x.CATEGORY_ID === this.projectInstance.CATEGORY_ID
    );
    $that.addProjectModel.PROJECT_GROUP = $that.groupList.find(
      x => x.GROUP_ID === this.projectInstance.GROUP_ID
    );
    $that.addProjectModel.TIMELINE_TYPE = this.projectInstance.TIMELINE_TYPE;
    $that.addProjectModel.PROJECT_TYPE = $that.projectTypeList.find(
      x => x.TYPE_ID === this.projectInstance.PROJECT_TYPE_ID
    );
    $that.addProjectModel.ROM = this.projectInstance.PROJECT_ROM;
    $that.addProjectModel.CUSTOMER = $that.customerList.find(
      x => x.CUSTOMER_ID === this.projectInstance.CUSTOMER_ID
    );
    $that.addProjectModel.PROJECT_ADDRESS = this.projectInstance.PROJECT_ADDRESS;
    $that.addProjectModel.PROJECT_CITY = this.projectInstance.PROJECT_CITY;
    $that.addProjectModel.PROJECT_STATE = this.projectInstance.PROJECT_STATE;
    $that.addProjectModel.PROJECT_ZIP = this.projectInstance.PROJECT_ZIP;
    this.assignRoleModel.START_DATE = convertDateToUTC(this.projectInstance.START_DATE);
    this.assignRoleModel.END_DATE = convertDateToUTC(this.projectInstance.END_DATE);
    this.assignStaffModel.START_DATE = convertDateToUTC(startDate);
    this.assignStaffModel.END_DATE = convertDateToUTC(endDate);
    if (typeof $that.addProjectModel.CUSTOMER !== 'undefined') {
      $that.addProjectModel.CUSTOMER_CONTACT =
        $that.addProjectModel.CUSTOMER['CUSTOMER_CONTACT'];
    }
    $that.addProjectModel.PROJECT_DESCRIPTION = this.projectInstance.PROJECT_DESCRIPTION;
    this.dataPopulate = true;
  }

  getProjectsList(callback, postJson) {
    this.apiService.getProjectsList(postJson).subscribe(
      response => {
        callback(response);
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
      }
    );
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

  private loadUnAssignedProject(): void {
    this.unAssignedProjectGridView = {
      data: orderBy(this.unAssignedProjectData, this.sort),
      total: this.unAssignedProjectData.length
    };
  }

  public unAssignedProjectSortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadUnAssignedProject();
  }

  public handleFilterChange(value, column) {
    switch (column) {
      case 'PROJECT_STATUS':
        this.filteredProjectStatusList = this.projectStatusList.filter(
          s => s.STATUS_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        break;
      case 'OFFICE':
        this.filteredOfficeList = this.officeList.filter(
          s => s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        break;
      case 'PROJECT_TYPE':
        this.filteredProjectTypeList = this.projectTypeList.filter(
          s => s.TYPE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        break;
      case 'CUSTOMER':
        this.filteredCustomerList = this.customerList.filter(
          s => s.CUSTOMER_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        break;
      case 'STAFF_DETAIL':
        this.filteredPeopleList = this.peopleList.filter(
          s => s.STAFF_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        break;
      case 'ROLE_ID':
        this.filteredRoleList = this.roleList.filter(
          s => s.ROLE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        break;
      case 'PROJECT_CATEGORY':
        this.filteredCategoryList = this.categoryList.filter(
          s => s.CATEGORY_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        break;
      case 'PROJECT_GROUP':
        this.filteredGroupList = this.groupList.filter(
          s => s.GROUP_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        break;
    }
  }

  public handleValueChange(value, column) {
    if (column === 'CUSTOMER') {
      this.addProjectModel.CUSTOMER_CONTACT = value.CUSTOMER_CONTACT;
    } else if (column === 'START_DATE') {
      if (
        new Date(value) > new Date(this.projectForm.controls['END_DATE'].value)
      ) {
        this.errorStartDate = {
          isError: true,
          errorMessage: 'Start Date cannot be after end date'
        };
      } else {
        this.errorStartDate = { isError: false, errorMessage: '' };
      }
    } else if (column === 'END_DATE') {
      if (
        new Date(value) <
        new Date(this.projectForm.controls['START_DATE'].value)
      ) {
        this.errorEndDate = {
          isError: true,
          errorMessage: 'End Date cannot be before start date'
        };
      } else {
        this.errorEndDate = { isError: false, errorMessage: '' };
        this.errorStartDate = { isError: false, errorMessage: '' };
      }
    }
  }

  private projectAddFormReset(isCancel: any) {
    if (typeof this.projectForm !== 'undefined') {
      this.projectForm.resetForm();
    }
    this.addProjectModel.START_DATE = new Date();
    this.addProjectModel.END_DATE = new Date();
    this.projectIdForUpdate = null;
    this.projectStatusId = null;
    if (isCancel) {
      this.childDeleteEvent.emit(2);
    }
  }

  public saveProjectDetail() {
	if(this.addProjectModel.PROJECT_STATUS.STATUS_ID === ''){
		this.project_status.control.setErrors({
			errorMatch: true
		});
	} 
	if(this.addProjectModel.OFFICE.OFFICE_ID === ''){
		this.office.control.setErrors({
			errorMatch: true
		});
	} 
	if(this.addProjectModel.PROJECT_CATEGORY.CATEGORY_ID === ''){
		this.project_category.control.setErrors({
			errorMatch: true
		});
	} 
	if(this.addProjectModel.PROJECT_GROUP.GROUP_ID === ''){
		this.project_group.control.setErrors({
			errorMatch: true
		});
	}
	if(this.addProjectModel.PROJECT_TYPE.TYPE_ID === ''){
		this.project_type.control.setErrors({
			errorMatch: true
		});
	}
    if (
      new Date(this.projectForm.value.END_DATE) <
      new Date(this.projectForm.value.START_DATE)
    ) {
      this.errorEndDate = {
        isError: true,
        errorMessage: 'End Date cannot be before start date'
      };
	}
	else if (this.projectForm.valid) {
      const projectData = {
        PROJECT_NO: this.projectForm.value.PROJECT_NO,
        PROJECT_NAME: this.projectForm.value.PROJECT_NAME,
        START_DATE: this.projectForm.value.START_DATE,
        END_DATE: this.projectForm.value.END_DATE,
        PROJECT_STATUS: this.projectForm.value.PROJECT_STATUS.STATUS_ID,
        PROJECT_TYPE_ID: this.projectForm.value.PROJECT_TYPE.TYPE_ID,
        OFFICE_ID: this.projectForm.value.OFFICE.OFFICE_ID,
        TIMELINE_TYPE: this.projectForm.value.TIMELINE_TYPE,
        CATEGORY_ID: this.projectForm.value.PROJECT_CATEGORY.CATEGORY_ID,
        GROUP_ID: this.projectForm.value.PROJECT_GROUP.GROUP_ID,
        PROJECT_ADDRESS: this.projectForm.value.PROJECT_ADDRESS,
        PROJECT_CITY: this.projectForm.value.PROJECT_CITY,
        PROJECT_STATE: this.projectForm.value.PROJECT_STATE,
        PROJECT_ZIP: this.projectForm.value.PROJECT_ZIP
      };
      if (
        typeof this.projectForm.value.ROM !== 'undefined' &&
        this.projectForm.value.ROM !== null
      ) {
        projectData['PROJECT_ROM'] = this.projectForm.value.ROM;
      } else {
        projectData['PROJECT_ROM'] = null;
      }
      if (
        typeof this.projectForm.value.CUSTOMER !== 'undefined' &&
        this.projectForm.value.CUSTOMER !== null
      ) {
        projectData[
          'CUSTOMER_ID'
        ] = this.projectForm.value.CUSTOMER.CUSTOMER_ID;
      } else {
        projectData['CUSTOMER_ID'] = null;
      }
      if (
        typeof this.projectForm.value.PROJECT_DESCRIPTION !== 'undefined' &&
        this.projectForm.value.PROJECT_DESCRIPTION !== null
      ) {
        projectData[
          'PROJECT_DESCRIPTION'
        ] = this.projectForm.value.PROJECT_DESCRIPTION;
      } else {
        projectData['PROJECT_DESCRIPTION'] = null;
      }
      if (this.projectIdForUpdate == null) {
        this.isSaveProjectDetail = true;
        projectData['START_DATE'] = convertToUTC(projectData['START_DATE']);
        projectData['END_DATE'] = convertToUTC(projectData['END_DATE']);
        this.apiService.addProjectDetail(projectData).subscribe(
          (response: any) => {
            if (response) {
              if (response.error === true) {
                this.toastr.error(
                  response.message,
                  ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS
                );
                this.isSaveProjectDetail = false;
              } else {
                this.projectIdForUpdate = response.data[0].PROJECT_ID;
                this.projectStatusId = response.data[0].PROJECT_STATUS_ID;
                this.assignRoleModel.START_DATE = new Date(
                  response.data[0].START_DATE
                );
                this.assignRoleModel.END_DATE = new Date(
                  response.data[0].END_DATE
                );
                this.assignStaffModel.START_DATE = new Date(
                  response.data[0].START_DATE
                );
                this.assignStaffModel.END_DATE = new Date(
                  response.data[0].END_DATE
                );
                this.addForm = 2;
                this.projectStaffRoleTabDisabled = false;
                this.childDeleteEvent.emit(3);
                this.toastr.success('Project added successfully');
                if (this.projectIdForUpdate) {
                  this.editProjectOverview = false;
                  this.editProjectClient = false;
                  this.editProjectAddress = false;
                  this.editProjectSummary = false;
                  this.editProjectTimeline = false;
                }
                this.isSaveProjectDetail = false;
              }
            }
          },
          error => {
            this.toastr.error(
              ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
              ERROR_MESSAGE.ERROR_MESSAGE_HEADING
            );
          }
        );
      } else if (this.projectIdForUpdate != null) {
        this.apiService
          .updateProjectDetail(projectData, this.projectIdForUpdate)
          .subscribe(
            (response: any) => {
              if (response) {
                if (response.error === true) {
                  this.toastr.error(
                    response.message,
                    ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS
                  );
                } else {
                  this.projectAddFormReset(undefined);
                  this.toastr.success(response.message);
                  this.childDeleteEvent.emit(1);
                }
              }
            },
            error => {
              this.toastr.error(
                ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
                ERROR_MESSAGE.ERROR_MESSAGE_HEADING
              );
            }
          );
      }
    }
  }

  public submitAssignRole(form) {
    const validation = dateValidation(this.addProjectModel, this.assignRoleModel);
    if (validation.key === 'START_DATE') {
      this.role_start_date.control.setErrors({
        dateMatch: true
      });
      this.dateValidationMsg = validation.validationString;
    } else {
      this.role_start_date.control.setErrors(null);
    }

    if (validation.key === 'END_DATE') {
      this.role_end_date.control.setErrors({
        dateMatch: true
      });
      this.dateValidationMsg = validation.validationString;
    } else {
      this.role_end_date.control.setErrors(null);
    }
    if (form.valid) {
      this.dateValidationMsg = '';
      const postJSON = {
        PROJECT_ID: this.projectIdForUpdate,
        START_DATE: this.datePipe.transform(
          this.assignRoleModel.START_DATE,
          'yyyy-MM-dd'
        ),
        END_DATE: this.datePipe.transform(
          this.assignRoleModel.END_DATE,
          'yyyy-MM-dd'
        ),
        ALLOCATION: this.assignRoleModel.ALLOCATION,
        PROJECT_ROLE_ID: this.assignRoleModel.ROLE_DETAIL.ROLE_ID,
        RESUME_SUBMITTED: this.assignRoleModel.RESUME_SUBMITTED.toString()
      };

      if (this.projectIdForUpdate) {
        if (this.assignRoleModel.ID) {
          postJSON['START_DATE'] = convertToUTC(postJSON['START_DATE']);
          postJSON['END_DATE'] = convertToUTC(postJSON['END_DATE']);
          postJSON['PLANNED_PROJECT_PEOPLE_ID'] = this.assignRoleModel.ID;
          this.apiService.updateProjectInStaff(postJSON).subscribe(
            (response: any) => {
              if (response) {
                if (response.error) {
                  this.toastr.error(
                    response.message,
                    ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS
                  );
                } else {
                  this.toastr.success(response.message);
                  this.getProjectDetails(this.projectIdForUpdate);
                  this.showDetailsLoader = false;
                  this.resetRoleAssignData(form);
                }
              }
            },
            error => {
              this.toastr.error(
                ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
                ERROR_MESSAGE.ERROR_MESSAGE_HEADING
              );
            }
          );
        } else {
          this.apiService.addProjectInStaff(postJSON).subscribe(
            (response: any) => {
              if (response) {
                if (response.error) {
                  this.toastr.error(
                    response.message,
                    ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS
                  );
                } else {
                  this.toastr.success(response.message);
                  this.getProjectDetails(this.projectIdForUpdate);
                  this.showDetailsLoader = false;
                  this.resetRoleAssignData(form);
                }
              }
            },
            error => {
              this.toastr.error(
                ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
                ERROR_MESSAGE.ERROR_MESSAGE_HEADING
              );
            }
          );
        }
      }
    }
  }

  public editRoleAssignment(dataItem) {
    this.assignRoleUpdate = 1;
    this.activeRolePanel = 'role-add';
    this.assignRoleModel.ROLE_DETAIL = this.roleList.find(
      x => x.ROLE_ID === dataItem.PROJECT_ROLE_ID
    );
    this.assignRoleModel.START_DATE = new Date(dataItem.START_DATE);
    this.assignRoleModel.END_DATE = new Date(dataItem.END_DATE);
    this.assignRoleModel.ALLOCATION = dataItem.ALLOCATION;
    this.assignRoleModel.RESUME_SUBMITTED = parseInt(dataItem.RESUME_SUBMITTED);
    this.assignRoleModel.ID = dataItem.ID;
    let statusId: number;
    if (this.projectStatusId) {
      statusId = this.projectStatusId;
    } else {
      statusId = this.projectInstance.PROJECT_STATUS_ID;
    }
    if (statusId === 2 || statusId === 3) {
      if (this.assignRoleModel.START_DATE <= this.todayDate) {
        this.columnEditable = 3;
      } else {
        this.columnEditable = 4;
      }
    } else {
      this.columnEditable = 4;
    }
  }

  public resetRoleAssignData(form) {
    form.resetForm();
    this.assignRoleUpdate = 0;
    this.columnEditable = 4;
    this.activeRolePanel = 'role-list';
    this.assignRoleModel = {
      START_DATE: this.addProjectModel.START_DATE,
      END_DATE: this.addProjectModel.END_DATE,
      ALLOCATION: 100,
      ROLE_DETAIL: null,
      RESUME_SUBMITTED: 0,
      ID: null
    };
  }

  public submitAssignStaff(form) {
    const validation = dateValidation(
      this.addProjectModel,
      this.assignStaffModel
    );
    if (validation.key === 'START_DATE') {
      this.staff_start_date.control.setErrors({
        dateMatch: true
      });
      this.dateValidationMsg = validation.validationString;
    } else {
      this.staff_start_date.control.setErrors(null);
    }
    if (validation.key === 'END_DATE') {
      this.staff_end_date.control.setErrors({
        dateMatch: true
      });
      this.dateValidationMsg = validation.validationString;
    } else {
      this.staff_end_date.control.setErrors(null);
    }
    if (form.valid) {
      this.dateValidationMsg = '';
      const postJSON = {
        STAFF_ID: this.assignStaffModel.STAFF_DETAIL.STAFF_ID,
        PROJECT_ID: this.projectIdForUpdate,
        START_DATE: this.datePipe.transform(
          this.assignStaffModel.START_DATE,
          'yyyy-MM-dd'
        ),
        END_DATE: this.datePipe.transform(
          this.assignStaffModel.END_DATE,
          'yyyy-MM-dd'
        ),
        ALLOCATION: this.assignStaffModel.ALLOCATION,
        PROJECT_ROLE_ID: this.assignStaffModel.ROLE_DETAIL.ROLE_ID,
        RESUME_SUBMITTED: this.assignStaffModel.RESUME_SUBMITTED.toString()
      };
      if (this.projectIdForUpdate) {
        postJSON['START_DATE'] = convertToUTC(postJSON['START_DATE']);
        postJSON['END_DATE'] = convertToUTC(postJSON['END_DATE']);
        if (this.assignStaffUpdate === 1) {
          if (this.assignStaffModel.ID !== null) {
            postJSON['PLANNED_PROJECT_PEOPLE_ID'] = this.assignStaffModel.ID;
          }
          this.apiService.updateProjectInStaff(postJSON).subscribe(
            (response: any) => {
              if (response) {
                if (response.error) {
                  this.toastr.error(
                    response.message,
                    ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS
                  );
                } else {
                  this.toastr.success(response.message);
                  this.getProjectDetails(this.projectIdForUpdate);
                  this.showDetailsLoader = false;
                  this.resetStaffAssignData(form);
                }
              }
            },
            error => {
              this.toastr.error(
                ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
                ERROR_MESSAGE.ERROR_MESSAGE_HEADING
              );
            }
          );
        } else {
          this.apiService.addProjectInStaff(postJSON).subscribe(
            (response: any) => {
              if (response) {
                if (response.error) {
                  this.toastr.error(
                    response.message,
                    ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS
                  );
                } else {
                  this.toastr.success(response.message);
                  this.getProjectDetails(this.projectIdForUpdate);
                  this.showDetailsLoader = false;
                  this.resetStaffAssignData(form);
                }
              }
            },
            error => {
              this.toastr.error(
                ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
                ERROR_MESSAGE.ERROR_MESSAGE_HEADING
              );
            }
          );
        }
      }
    }
  }

  public editStaffAssignment(dataItem) {
    this.assignStaffUpdate = 1;
    this.activeStaffPanel = 'staff-add';
    this.assignStaffModel.ROLE_DETAIL = this.roleList.find(
      x => x.ROLE_ID === dataItem.PROJECT_ROLE_ID
    );
    this.assignStaffModel.START_DATE = new Date(dataItem.START_DATE);
    this.assignStaffModel.END_DATE = new Date(dataItem.END_DATE);
    this.assignStaffModel.ALLOCATION = dataItem.ALLOCATION;
    this.assignStaffModel.RESUME_SUBMITTED = parseInt(dataItem.RESUME_SUBMITTED);
    if (!('STAFF_ID' in dataItem)) {
      this.assignStaffModel.STAFF_DETAIL = null;
      this.assignStaffModel.ID = dataItem.ID;
    } else {
      this.assignStaffModel.STAFF_DETAIL = this.peopleList.find(
        x => x.STAFF_ID === dataItem.STAFF_ID
      );
      this.assignStaffModel.ID = null;
    }
    let statusId: number;
    if (this.projectStatusId) {
      statusId = this.projectStatusId;
    } else {
      statusId = this.projectInstance.PROJECT_STATUS_ID;
    }
    if (statusId === 2 || statusId === 3) {
      if (this.assignStaffModel.START_DATE <= this.todayDate) {
        this.columnEditable = 2;
      } else {
        this.columnEditable = 1;
      }
    } else {
      this.columnEditable = 1;
    }
  }

  public resetStaffAssignData(form) {
    form.resetForm();
    this.assignStaffUpdate = 0;
    this.columnEditable = 1;
    this.activeStaffPanel = 'staff-list';
    this.assignStaffModel = {
      START_DATE: this.addProjectModel.START_DATE,
      END_DATE: this.addProjectModel.END_DATE,
      ALLOCATION: 100,
      ROLE_DETAIL: null,
      RESUME_SUBMITTED: 0,
      STAFF_DETAIL: null,
      ID: null
    };
  }

  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'role-add') {
      this.activeRolePanel = 'role-add';
    } else if ($event.panelId === 'staff-add') {
      this.activeStaffPanel = 'staff-add';
    }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
