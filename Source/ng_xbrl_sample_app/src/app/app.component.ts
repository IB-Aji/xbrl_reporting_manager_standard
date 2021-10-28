import { Component, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from './service';
import { User } from './model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fujitsu-core-web';
  currentUser: User;
  constructor(
    private authenticationService: AuthenticationService,
    public translate: TranslateService
  ) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    translate.addLangs(['en', 'in']);
    translate.setDefaultLang('en');

    translate.use('en');
  }

}
