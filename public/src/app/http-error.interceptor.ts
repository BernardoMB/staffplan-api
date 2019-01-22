import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import 'rxjs-compat/add/operator/do';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).map(event => {
            if (event instanceof HttpResponse) {
                if (event.body.status == 401) {
                    this.authService.logout();
                    return;
                }
            }
            return event;
        });
    }
}