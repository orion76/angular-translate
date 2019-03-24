import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { IUserService } from '@app-library/user/types';
import { USER_SERVICE } from '@app-library/user/user.service';




@Component({
  selector: 'user-logout',
  template: `
    <h1>User logOUT</h1>
  `
})
export class UserLogoutComponent implements OnInit {

  constructor(
    @Inject(USER_SERVICE) protected service: IUserService,
  ) { }

  ngOnInit() {
  }
}


@NgModule({
  declarations: [UserLogoutComponent],
  imports: [
    CommonModule,
  ],
  exports: [UserLogoutComponent]
})
export class UserLogoutModule { }
