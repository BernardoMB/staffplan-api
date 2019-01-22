import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ERROR_MESSAGE} from '../../../global/settings';
import {ToastrService} from 'ngx-toastr';
import {AdminServices} from '../../admin.services';

@Component({
    selector: 'app-combination-create',
    templateUrl: './combination-create.component.html',
    styleUrls: ['./combination-create.component.css']
})
export class CombinationCreateComponent implements OnInit {
    @Output() combinationUpdatedEvent = new EventEmitter();
    public accessTypes = [];

    constructor(private toastr: ToastrService, private adminService: AdminServices) {
    }

    ngOnInit() {
        this.getAccessTypeList();
    }

    private getAccessTypeList() {
        const $that = this;
        $that.adminService.getAccessTypeList().subscribe((response: any) => {
            if (response && response.data) {
                $that.accessTypes = response.data;
            }
        }, error => {
            $that.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });
    }

    submit() {
        let typeData = [];
        this.accessTypes.map((instance) => {
            if (instance.selected) {
                typeData.push(parseInt(instance.ID));
            }
            instance.selected = false;
        });
        let data = {
            'COMBINATION': typeData
        };
        this.combinationUpdatedEvent.emit(0);
        this.adminService.addAccessCombination(data).subscribe((response: any) => {
            if (response) {
                if (response.status == 'success') {
                    this.combinationUpdatedEvent.emit(1);
                    this.toastr.success(response.message);
                } else {
                    this.toastr.error(response.message);
                }
            }
        }, error => {
            this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
        });

    }

    updateSelectedTimeslots(event) {
        this.accessTypes.map((instance) => {
            if (instance.ID == parseInt(event.target.value)) {
                instance.selected = instance.selected ? !instance.selected : true;
            }
        });
    }

    isItemSelected(type) {
        if (type.selected) {
            return true;
        } else {
            return false;
        }
    }
}
