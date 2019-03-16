import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../api.service';
import {ERROR_MESSAGE} from '../../global/settings';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    public dashboardData;
    public filteredOfficeList = [{
        OFFICE_ID: 'all',
        OFFICE_NAME: 'All locations'
    }];
    public selectedOffice;
    public showLoader = true;
    public selectedOfficeId: string;

    constructor(private apiService: ApiService, private toastr: ToastrService) {
    }

    ngOnInit() {
        const userLocalData = JSON.parse(localStorage.getItem('user'));
        for (const arrVal of userLocalData.OFFICE_LIST) {
            this.filteredOfficeList.push(arrVal);
        }
        this.callOfficeChange();
    }

    public callOfficeChange() {
        if (localStorage.getItem('officeId')) {
            this.selectedOfficeId = localStorage.getItem('officeId');
            this.getDashboardDetails(this.selectedOfficeId);
            this.selectedOffice = this.filteredOfficeList.find(o => o.OFFICE_ID === this.selectedOfficeId);
        } else {
            this.getDashboardDetails('all');
            this.selectedOffice = this.filteredOfficeList[0];
        }
    }

    public handleFilterChange(value, column) {
        switch (column) {
            case 'OFFICE':
                this.filteredOfficeList = this.filteredOfficeList.filter(s =>
                    s.OFFICE_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                break;
        }
    }

    getDashboardDetails(value) {
        this.apiService.getDashboardDetails(value).subscribe((response: any) => {
            this.dashboardData = response;
            // if (response && response.data) {
            //     this.dashboardData = response.data;
            // }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    public projectQuickView(value) {
        const data = { status: value, officeId: this.selectedOfficeId };
        this.apiService.redirectToQuickProjectPage(data);
    }

    public projectView(value) {
        const data = { status: value, officeId: this.selectedOfficeId };
        this.apiService.redirectToProjectPage(data);
    }

    public staffView(value) {
        const data = { status: value, officeId: this.selectedOfficeId };
        this.apiService.redirectToStaffPage(data);
    }

    public assStaffView(value) {
        this.apiService.redirectToAssStaffPage(value);
    }

    public staffQuickView(value) {
        const data = { status: value, officeId: this.selectedOfficeId };
        this.apiService.redirectToQuickStaffPage(data);
    }

    public handleValueChange(value) {
        const $that = this;
        $that.showLoader = true;
        $that.apiService.getDashboardDetails(value.OFFICE_ID).subscribe((response: any) => {
            $that.dashboardData = response.data;
            this.callOfficeChange();
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
        localStorage.setItem('officeId', value.OFFICE_ID);
    }

}
