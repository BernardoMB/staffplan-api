import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ToastrModule} from 'ngx-toastr';
import 'hammerjs';
import {AppComponent} from './app.component';
import {HandlePopoverCloseDirective} from './handle-popover-close.directive';
import {BreadcrumbsModule} from 'ng6-breadcrumbs';
import {CookieService} from 'ngx-cookie-service';
import {JwtInterceptor} from './jwt.interceptor';
import {HttpErrorInterceptor} from './http-error.interceptor';
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        HandlePopoverCloseDirective,
        MainComponent,
        NavbarComponent,
        FooterComponent

    ],
    imports: [
        ToastrModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        BreadcrumbsModule,
        AppRoutingModule,
    ],
    providers: [CookieService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
