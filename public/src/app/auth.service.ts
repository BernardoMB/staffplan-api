import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public loggedIn: BehaviorSubject<boolean>;

    constructor(private router: Router, private cookieService: CookieService) {
        this.loggedIn = new BehaviorSubject<boolean>(false);
    }

    sendToken(token: string) {
        localStorage.setItem('SessionId', token);
        // this.cookieService.set('SessionId', token);
        this.loggedIn.next(true);
    }

    getToken() {
        // return this.cookieService.get('SessionId');
        return localStorage.getItem('SessionId');
    }

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUserData() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isLoggednIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['authenticate/login']);
        this.loggedIn.next(false);
    }
}
