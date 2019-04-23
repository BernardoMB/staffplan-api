import {Component} from '@angular/core';
import {ERROR_MESSAGE, STAFF_PLAN_LOGO} from '../../global/settings';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDetail: any = {};
  public staffPlanLogo = STAFF_PLAN_LOGO;
  constructor(private auth: AuthService, private router: Router, private apiService: ApiService, private toastr: ToastrService) {
  }
  login() {
    this.loginDetail.hostname = window.location.hostname;
    this.apiService.checkLoginDetail(this.loginDetail).subscribe((response: any) => {
      if (response) {
        this.auth.sendToken(response.token);
        this.auth.setUser(response.user);
        this.router.navigateByUrl('/home');
      }
    }, error => {
      this.toastr.error(ERROR_MESSAGE.ERROR_MESSAGE_TEXT, ERROR_MESSAGE.ERROR_MESSAGE_HEADING);
    });
  }
}
