import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AdminServices} from '../../admin.services';
import {ERROR_MESSAGE} from '../../../global/settings';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-role-create',
    templateUrl: './role-create.component.html',
    styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit, OnChanges {
    @Input() combinationListUpdated: number;
    @Output() childOpenCombinationFormEvent = new EventEmitter();
    model: any = {};
    public filteredTypeCombination = [];

    constructor(private adminService: AdminServices, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getAccessTypeList();
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const change in changes) {
           if (change === 'combinationListUpdated' && this.combinationListUpdated === 1) {
                this.getAccessTypeList();
            }
        }
    }

    openCombinationForm() {
        this.childOpenCombinationFormEvent.emit(1);
    }

    onSubmit(form) {
        this.childOpenCombinationFormEvent.emit(1);
        this.model.COMBINATION_ID = this.model.COMBINATION.id;
        delete this.model['COMBINATION'];
        this.adminService.addRole(this.model).subscribe((response: any) => {
            if (response) {
                if (response.status == 'success') {
                    form.resetForm();
                    this.toastr.success(response.message);
                    this.childOpenCombinationFormEvent.emit(2);
                } else {
                    this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
                }
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    getAccessTypeList() {
        this.filteredTypeCombination = [];
        this.adminService.getAllAccessTypeCombination().subscribe((response: any) => {
            if (response && response.data) {
                for (let key in response.data) {
                    this.filteredTypeCombination.push({
                        id: key,
                        type: response.data[key].toString()
                    });
                }
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

}
