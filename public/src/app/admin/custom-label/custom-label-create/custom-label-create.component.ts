import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AdminServices} from '../../admin.services';
import {ERROR_MESSAGE} from '../../../global/settings';
import {ApiService} from '../../../api.service';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'app-custom-label-create',
    templateUrl: './custom-label-create.component.html',
    styleUrls: ['./custom-label-create.component.css']
})
export class CustomLabelCreateComponent implements OnInit, OnChanges {
    model: any = {
        'FIELD_NAME': ''
    };
    private subscriberList = [];
    private fieldList = [];
    private tableList = [];
    public filteredFieldList: Array<string> = [];
    public filteredSubscriberList: Array<string> = [];
    public filteredTableList: Array<string> = [];

    constructor(private toastr: ToastrService, private adminService: AdminServices, private apiService: ApiService, private appService: AppService) {
    }

    ngOnInit() {
        this.getTableList();
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    getTableList() {
        this.adminService.getTableList().subscribe((response: any) => {
            if (response && response.data) {
                this.tableList = response.data;
                this.filteredTableList = response.data;
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getFieldList(key) {
        this.fieldList = [];
        this.filteredFieldList = [];
        this.adminService.getFieldList(key).subscribe((response: any) => {
            if (response && response.data) {
                this.fieldList = response.data;
                this.filteredFieldList = response.data;
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'TABLE':
                this.filteredTableList = this.tableList.filter((s) => s.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
            case 'FIELD':
                this.filteredFieldList = this.fieldList.filter((s) => s.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }
    }

    public handleValueChange(value, column) {
        if (column === 'TABLE') {
            this.model.FIELD_NAME = '';
            this.getFieldList(value);
        }
    }

    onSubmit(form) {
        this.adminService.addCustomLabel(this.model).subscribe((response: any) => {
            if (response) {
                if (response.status === 'success') {
                    this.toastr.success('Custom label created successfully');
                    form.resetForm();
                    this.appService.getCustomList().subscribe(
                        (response1: any) => {
                            if (response1) {
                                if (response1.error === false) {
                                    localStorage.setItem(
                                        "customFieldNames",
                                        JSON.stringify(response1.data)
                                    );
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
                    this.toastr.error(response.message);
                }
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

}
