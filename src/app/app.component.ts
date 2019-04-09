import {Component, Inject, OnInit} from '@angular/core';
import {IUserAuthService, USER_AUTH_SERVICE} from '@app-library/user/auth';

@Component({
  selector: 'app-root',
  template: `
      <menu-main></menu-main>
      <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'trans';

  constructor(@Inject(USER_AUTH_SERVICE) private auth: IUserAuthService) {

  }

  ngOnInit() {
    this.auth.restoreFromStorage();
  }
}



