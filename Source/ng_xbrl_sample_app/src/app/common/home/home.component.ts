import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { AuthenticationService } from '../../service/authentication.service'
import { UserService } from '../../service/user.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthenticationService, UserService]
})

export class HomeComponent implements OnInit {

  private updateSubscription: Subscription;

  constructor(
    private readonly sidebarService: NbSidebarService,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    public userService: UserService,
    private router: Router
  ) {
    translate.addLangs(['en', 'in']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
  items: NbMenuItem[] = [];

  ngOnInit(): void {
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('tokenDate');
    // localStorage.removeItem('userData');

    this.authenticationService
      .login('user@bcm.id', 'aaa')
      .subscribe(
        (data) => {
          this.router.navigate(['/home/instance/static-report-setup']);
        },
        (error) => {
          throw error;
        }
      );

    this.getUserInfo();
    if (localStorage.getItem("userData") == null) {
      this.updateSubscription = interval(1000).subscribe(
        (val) => { window.location.reload() }
      );
    }
  }

  getUserInfo() {
    const userStr = localStorage.getItem("userData");
    if (userStr == null) {
      this.userService.findInfo().subscribe(
        user => {
          localStorage.setItem("userData", JSON.stringify(user));
        },
        err => {
          console.log(err);
        }

      );
    }
  }

}
