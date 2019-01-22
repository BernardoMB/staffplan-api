import {Component} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    public openRoleForm = 0;
    public openCombinationForm = 0;
    public combinationUpdated = 0;

    constructor(public auth: AuthService) {
    }

    public roleFormOpenEvent(flag) {
        this.openRoleForm = flag;
    }

    public combinationFormOpenEvent(flag) {
        this.openCombinationForm = flag;
    }

    public combinationUpdatedEvent(flag) {
        this.combinationUpdated = flag;
    }

}
