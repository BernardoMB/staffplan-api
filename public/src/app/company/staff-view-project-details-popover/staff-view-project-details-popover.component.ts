import {
    Component,
    Input,
    OnInit,
    OnChanges,
    ChangeDetectorRef,
    SimpleChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import {
    getColumnsList,
    HIDDEN_STAFF_DETAILS_POPOVER_COLUMNS,
    STAFF_PROJECT_DETAILS_COLUMNS,
    DATE_FORMAT,
    TIMELINE_TYPE,
    ERROR_MESSAGE,
    STATIC_IMAGE, IMAGE_PATH
} from '../../global/settings';
import {SortDescriptor, orderBy} from '@progress/kendo-data-query';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from '../../api.service';
import {ToastrService} from 'ngx-toastr';
import * as $ from 'jquery';


@Component({
    selector: 'app-staff-view-project-details-popover',
    templateUrl: './staff-view-project-details-popover.component.html',
    styleUrls: ['./staff-view-project-details-popover.component.css']
})
export class StaffViewProjectDetailsPopoverComponent implements OnInit, OnChanges {
    @Input() staffIdForEditStaff: any;
    @Input() staffInstance: any;
    @Input() renderTable: any;
    public gridView: GridDataResult;
    @Output() childStaffCloseEvent = new EventEmitter();
    private timelineType = TIMELINE_TYPE;
    public profileImageUrl = '';
    private staffDetailsData = [];
    public showDetailsLoader = true;
    private date_format = DATE_FORMAT;
    public staffDetailColumns;
    private certificateList: Array<string> = [];
    public staffExperienceList: Array<string> = [];
    private popClose = 0;
    private customColumnsName = {
        'ROLE_NAME': 'Project Role',
        'CUSTOMER_NAME': 'Client',
        'STAFF_ASSIGNMENT': 'Assignment Status',
        'DURATION': 'Project Duration',
        'PHONE_1_TYPE': 'Cell Phone',
        'PHONE_2_TYPE': 'Alternate Phone'
    };
    private columnOrdering = {
        'PROJECT_NAME': 0,
        'ROLE_NAME': 1,
        'STAFF_ASSIGNMENT': 2,
        'DURATION': 3,
        'RESUME_SUBMITTED': 4,
        'CUSTOMER_NAME': 5
    };
    public certificationData = [];
    private newProfilePic;
    private existCertificationData = [];
    private storeExperienceDetail = [];
    public sort: SortDescriptor[] = [{
        field: 'END_DATE',
        dir: 'desc'
    }];
    public progressBarColors = [`#34738f`, `#122f3d`, `#be3e2b`, `#ed8a45`, `#f6de6c`];

    constructor(private chRef: ChangeDetectorRef, private apiService: ApiService, private toastr: ToastrService) {
    }

    async ngOnInit() {
        const $that = this;
        const promises = [
            new Promise((resolve, reject) => {
                $that.getCertificateList(resolve, reject);
            }),
            new Promise((resolve, reject) => {
                $that.getStaffExperience(resolve, reject);
            })
        ];
    }


    ngOnChanges(changes: SimpleChanges) {
        for (const change in changes) {
            if (change === 'staffIdForEditStaff' && changes[change].currentValue) {
                let $that = this;
                this.getStaffDetails(function (response) {
                    if (response && response.data) {
                        $that.staffInstance = response.data;
                        $that.staffInstance.PHONE_1_TYPE = 'Phone Number';
                        $that.staffInstance.PHONE_2_TYPE = 'Alternate Number';
                        if ($that.staffInstance && $that.staffInstance['PROJECT_DATA'] && $that.staffInstance['PROJECT_DATA'].length > 0) {
                            $that.staffDetailColumns = getColumnsList($that.staffInstance['PROJECT_DATA'][0], HIDDEN_STAFF_DETAILS_POPOVER_COLUMNS, $that.customColumnsName, $that.columnOrdering);
                        } else {
                            $that.staffDetailColumns = STAFF_PROJECT_DETAILS_COLUMNS;
                        }
                        for (let index in $that.staffInstance['PROJECT_DATA']) {
                            $that.staffInstance['PROJECT_DATA'][index]['START_DATE'] = new Date($that.staffInstance['PROJECT_DATA'][index]['START_DATE']);
                            $that.staffInstance['PROJECT_DATA'][index]['END_DATE'] = new Date($that.staffInstance['PROJECT_DATA'][index]['END_DATE']);
                            if ($that.staffInstance['PROJECT_DATA'][index]['CONFIRMED'] == null || $that.staffInstance['PROJECT_DATA'][index]['CONFIRMED'] == 0) {
                                $that.staffInstance['PROJECT_DATA'][index]['CONFIRMED'] = false;
                            } else if ($that.staffInstance['PROJECT_DATA'][index]['CONFIRMED'] == 1) {
                                $that.staffInstance['PROJECT_DATA'][index]['CONFIRMED'] = true;
                            }
                            $that.staffInstance['PROJECT_DATA'][index].TIMELINE_TYPE = TIMELINE_TYPE.find(x => x.TIMELINE_TYPE_KEY == $that.staffInstance['PROJECT_DATA'][index].TIMELINE_TYPE).TIMELINE_TYPE_VALUE;
                        }
                        if ('CURRENT_PROJECT' in $that.staffInstance) {
                            $that.staffInstance.CURRENT_PROJECT.sort((val1, val2): any => {
                                return +new Date(val1.START_DATE) - +new Date(val2.START_DATE);
                            });
                        }

                        if ($that.staffInstance.STAFF_PHOTO == 'None' || $that.staffInstance.STAFF_PHOTO == null) {
                            $that.profileImageUrl = STATIC_IMAGE;
                        } else {
                            $that.profileImageUrl = IMAGE_PATH + $that.staffInstance.IMAGEPATH + $that.staffInstance.STAFF_PHOTO;
                        }
                        $that.staffDetailsData = $that.staffInstance['PROJECT_DATA'];
                        $that.staffDetailsData.map(instance => {

                            if ('EXPERIENCE_ID' in instance) {
                                instance.expertizeList = instance.EXPERIENCE_ID;
                            } else {
                                instance.expertizeList = [];
                            }
                        });
                        $that.certificationData = $that.staffInstance['CERTIFICATION_NAME'];
                        $that.existCertificationData = $that.staffInstance['CERTIFICATION_NAME'];
                        $that.showDetailsLoader = false;
                        $that.loadProjectStaff();
                    }
                }, this.staffIdForEditStaff);
                this.chRef.detectChanges();
            }
        }
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadProjectStaff();
    }

    private loadProjectStaff(): void {
        this.gridView = {
            data: orderBy(this.staffDetailsData, this.sort),
            total: this.staffDetailsData.length
        };
    }

    private async getStaffExperience(resolve, reject) {
        const $that = this;
        let experienceSkill = 'STAFF_EXPERIENCE';
        await $that.apiService.getCommonListForProject(experienceSkill).subscribe((response: any) => {
            if (response && response.data) {
                $that.staffExperienceList = response.data;
                return resolve('done');
            }
        }, error => {
            $that.showDetailsLoader = false;
            $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return reject('error');
        });
    }

    private async getCertificateList(resolve, reject) {
        const $that = this;
        let certificationSkill = 'CERTIFICATION_SKILLS';
        await $that.apiService.getCommonListForProject(certificationSkill).subscribe((response: any) => {
            if (response && response.data) {
                $that.certificateList = response.data;
                return resolve('done');
            }
        }, error => {
            $that.showDetailsLoader = false;
            $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return reject('error');
        });
    }

    public valueNormalizerCertificate = (CERTIFICATION_NAME$: Observable<string>) => CERTIFICATION_NAME$.pipe(map((CERTIFICATION_NAME: string) => {
        //search in values
        const matchingValue: any = this.certificationData.find((item: any) => {
            return item['CERTIFICATION_NAME'].toLowerCase() === CERTIFICATION_NAME.toLowerCase();
        });
        if (matchingValue) {
            return matchingValue; //return the already selected matching value and the component will remove it
        }

        //search in data
        const matchingItem: any = this.certificateList.find((item: any) => {
            return item['CERTIFICATION_NAME'].toLowerCase() === CERTIFICATION_NAME.toLowerCase();
        });

        if (matchingItem) {
            return matchingItem;
        } else {
            return {
                CERTIFICATION_ID: 'new',
                CERTIFICATION_NAME: CERTIFICATION_NAME
            };
        }
    }));
    public valueNormalizerExperience = (EXPERIENCE_LABEL$: Observable<string>) => EXPERIENCE_LABEL$.pipe(map((EXPERIENCE_LABEL: string) => {
        //search in values
        for (let key in this.staffDetailsData) {
            const matchingValue: any = this.staffDetailsData[key].expertizeList.find((item: any) => {
                return item['EXPERIENCE_LABEL'].toLowerCase() === EXPERIENCE_LABEL.toLowerCase();
            });
            if (matchingValue) {
                return matchingValue; //return the already selected matching value and the component will remove it
            }
        }


        //search in data
        const matchingItem: any = this.staffExperienceList.find((item: any) => {
            return item['EXPERIENCE_LABEL'].toLowerCase() === EXPERIENCE_LABEL.toLowerCase();
        });
        if (matchingItem) {
            return matchingItem;
        } else {
            return {
                EXPERIENCE_ID: 'new',
                EXPERIENCE_LABEL: EXPERIENCE_LABEL
            };
        }
    }));

    public onExperienceValueChange(value, i, projectId) {
        let ExperienceDetail = {
            'PROJECT_ID': '',
            'STAFF_ID': '',
            'newExperience': [],
            'oldExperience': []
        };
        ExperienceDetail.PROJECT_ID = projectId;
        ExperienceDetail.STAFF_ID = this.staffInstance.STAFF_ID;
        for (let key in value) {
            if (value[key]['EXPERIENCE_ID'] == 'new') {
                if (ExperienceDetail.newExperience.indexOf(value[key]['EXPERIENCE_LABEL'] < 0)) {
                    ExperienceDetail.newExperience.push(value[key]['EXPERIENCE_LABEL']);
                }
            } else {
                if (ExperienceDetail.oldExperience.indexOf(value[key]['EXPERIENCE_ID'] < 0)) {
                    ExperienceDetail.oldExperience.push(value[key]['EXPERIENCE_ID']);
                }
            }
        }
        if (ExperienceDetail.newExperience.length > 0 || ExperienceDetail.oldExperience.length > 0) {
            this.storeExperienceDetail[i] = ExperienceDetail;
        } else {
            delete this.storeExperienceDetail[i];
            //  this.storeExperienceDetail.splice(index, 1);
        }
    }

    updateDetail() {
        let promises = [];
        let newSkill = [];
        let oldSkill = [];
        let data = [];
        for (let key in this.staffDetailsData) {
            let staffExperience = {};
            let staffNewExp = [];
            let staffOIdExp = [];
            if ('EXPERIENCE_ID' in this.staffDetailsData[key] && this.staffDetailsData[key].EXPERIENCE_ID != null) {
                for (var i = 0; i < this.staffDetailsData[key].EXPERIENCE_ID.length; i++) {
                    if (this.staffDetailsData[key].expertizeList.indexOf(this.staffDetailsData[key].EXPERIENCE_ID[i]) == -1) {
                        data.splice(1, 0, {
                            'STAFF_ID': this.staffInstance.STAFF_ID,
                            'PROJECT_ID': this.staffDetailsData[key]['PROJECT_ID']
                        });
                    }
                }
            }
            if (this.staffDetailsData[key].expertizeList != null && this.staffDetailsData[key].expertizeList.length > 0) {
                for (let list in this.staffDetailsData[key].expertizeList) {
                    if (this.staffDetailsData[key].expertizeList[list]['EXPERIENCE_ID'] == 'new') {
                        staffNewExp.push({'EXPERIENCE_LABEL': this.staffDetailsData[key].expertizeList[list]['EXPERIENCE_LABEL']});
                    } else {
                        staffOIdExp.push(this.staffDetailsData[key].expertizeList[list]['EXPERIENCE_ID']);
                    }
                }
                if (staffNewExp.length > 0) {
                    staffExperience['NEW_EXPERIENCE'] = staffNewExp;
                }
                if (staffOIdExp.length > 0) {
                    staffExperience['OLD_EXPERIENCE'] = staffOIdExp;
                } else {
                    staffExperience['OLD_EXPERIENCE'] = [];
                }
                if (staffNewExp.length > 0 || staffExperience['OLD_EXPERIENCE']) {
                    staffExperience['STAFF_ID'] = this.staffInstance.STAFF_ID;
                    staffExperience['PROJECT_ID'] = this.staffDetailsData[key]['PROJECT_ID'];
                }
                data.push(staffExperience);
            }
        }
        if (data.length > 0) {
            let experience = {
                'data': data
            };
            promises.push(
                new Promise((resolve, reject) => {
                    this.experienceDetailStore(experience, resolve, reject);
                })
            );
        }
        if (this.certificationData.length > 0) {
            for (let key in this.certificationData) {
                if (this.certificationData[key]['CERTIFICATION_ID'] == 'new') {
                    newSkill.push(this.certificationData[key]['CERTIFICATION_NAME']);
                } else {
                    oldSkill.push(this.certificationData[key]['CERTIFICATION_ID']);
                }
            }
            let certiDetail = {};
            if (newSkill.length > 0) {
                certiDetail['newSkill'] = newSkill;
            }
            if (oldSkill.length > 0) {
                certiDetail['oldSkill'] = oldSkill;
            }
            if (newSkill.length > 0 || oldSkill.length > 0) {
                certiDetail['STAFF_ID'] = this.staffInstance.STAFF_ID;
                promises.push(
                    new Promise((resolve, reject) => {
                        this.certificateDetailStore(certiDetail, resolve, reject);
                    })
                );
            }
        }
        let deleteCertificate = [];
        for (var i = 0; i < this.existCertificationData.length; i++) {
            if (this.certificationData.indexOf(this.existCertificationData[i]) == -1) {
                deleteCertificate.push({
                    'STAFF_ID': this.staffInstance.STAFF_ID,
                    'CERTIFICATION_ID': this.existCertificationData[i]['CERTIFICATION_ID']
                });
            }
        }
        if (deleteCertificate.length > 0) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.certificateDetailDelete(deleteCertificate, resolve, reject);
                })
            );
        }
        if (this.newProfilePic) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.updateStaffDetail(resolve, reject);
                })
            );
        }
        Promise.all(promises)
            .then(data => {
                if (this.popClose == 1) {
                    this.toastr.success('Staff detail updated successfully');
                }
                this.childStaffCloseEvent.emit(1);
            });
    }

    resetUpdateForm() {
        this.certificationData = [];
        this.storeExperienceDetail = [];
        this.childStaffCloseEvent.emit(2);
        this.newProfilePic = '';
    }

    private certificateDetailDelete(deleteCertificate, resolve, reject) {
        let certificate = {
            'data': deleteCertificate
        };
        this.apiService.deleteStaffCertification(certificate).subscribe((response: any) => {
            if (!response.error) {
                this.popClose = 1;
                return resolve('done');
            }
        }, error => {
            this.showDetailsLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return reject('error');
        });
    }

    private certificateDetailStore(certiDetail, resolve, reject) {
        this.apiService.addStaffCertification(certiDetail).subscribe((response: any) => {
            if (!response.error) {
                this.popClose = 1;
                return resolve('done');
            }
        }, error => {
            this.showDetailsLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return reject('error');
        });
    }

    private experienceDetailStore(experience, resolve, reject) {
        this.apiService.addStaffExperience(experience).subscribe((response: any) => {
            if (!response.error) {
                this.popClose = 1;
                return resolve('done');
            }
        }, error => {
            this.showDetailsLoader = false;
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            return reject('error');
        });
    }

    private updateStaffDetail(resolve, reject) {
        if (this.newProfilePic && this.newProfilePic != null) {
            let formData: FormData = new FormData();
            formData.append('file', this.newProfilePic);
            this.apiService.uploadStaffProfilePic(formData, this.staffInstance.STAFF_ID).subscribe((response: any) => {
                if (response) {
                    if (response.error) {
                        this.toastr.error(response.message, ERROR_MESSAGE.PARTIAL_UPDATE_SUCESS);
                    } else {
                        this.popClose = 1;
                        return resolve('done');
                    }
                }
            }, error => {
                this.showDetailsLoader = false;
                this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
            });
        }

    }

    getStaffDetails(callback, staffId) {
        this.apiService.getStaffDetails(staffId).subscribe((response) => {
            callback(response);
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            this.newProfilePic = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (e: any) => {
                this.profileImageUrl = e.target && e.target.result ? e.target.result : '';
            };
        }

    }

    public errorHandler(event) {
        event.target.src = STATIC_IMAGE;
    }

}

