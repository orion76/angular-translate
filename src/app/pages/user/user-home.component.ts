import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { IMenuMainService, MENU_MAIN_SERVICE } from '@app-library/menu-main/menu-main.service';
import { IUser, IUserService, USER_SERVICE } from '@app-library/user';
import { UserModule } from '@app-library/user/user.module';



@Component({
  selector: 'app-user-home',
  template: `
<h1>User profile</h1>
<user-cabinet></user-cabinet>
  `
})
export class UserHomeComponent implements OnInit {



  constructor(
    @Inject(MENU_MAIN_SERVICE) private menu: IMenuMainService,
    @Inject(USER_SERVICE) private service: IUserService,
  ) { }

  ngOnInit() {
    this.service.onLogout().subscribe((user: IUser) => {

    })
  }


}

@NgModule({
  declarations: [UserHomeComponent],
  imports: [
    CommonModule,
    UserModule
  ],
  exports: [UserHomeComponent],
  providers: [
  ]
})
export class UserHomeModule { }
