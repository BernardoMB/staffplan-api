import {Component, OnInit} from '@angular/core';
import {STAFF_PLAN_LOGO, USER_ROLE} from '../global/settings';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public userRole = USER_ROLE;
    public userData = this.auth.getUserData();
    public staffPlanLogo = STAFF_PLAN_LOGO;

    constructor(public auth: AuthService) {
    }

    ngOnInit() {
    }

}
