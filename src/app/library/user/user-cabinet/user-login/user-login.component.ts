import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { IUserService } from '@app-library/user/types';
import { USER_SERVICE } from '@app-library/user/user.service';




@Component({
  selector: 'user-login',
  template: `
    <h1>User login11</h1>
  `
})
export class UserLoginComponent implements OnInit {

  constructor(
    @Inject(USER_SERVICE) protected service: IUserService,
  ) { }

  ngOnInit() {
  }
}


@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
  ],
  exports: [UserLoginComponent]
})
export class UserLoginModule { }
