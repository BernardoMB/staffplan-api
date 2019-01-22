import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {USER_ROLE} from './global/settings';
import 'rxjs-compat/add/operator/filter';
import {Location} from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private userData = this.auth.getUserData();

    constructor(private auth: AuthService,
                private router: Router, private location: Location) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (this.auth.getToken()) {
            if (state.url === '/admin' && this.userData.ROLE_NAME !== USER_ROLE[0]) {
                this.location.back();
                return false;
            }
            if (state.url === '/') {
                this.router.navigate(['home']);
            }
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['authenticate/login']);
        return false;
    }
}
