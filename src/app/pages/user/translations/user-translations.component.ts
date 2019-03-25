import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { IMenuMainService, MENU_MAIN_SERVICE } from '@app-library/menu-main/menu-main.service';
import { EUserRole, IMenuUpdate, IUserService, USER_SERVICE } from '@app-library/user';
import { UserModule } from '@app-library/user/user.module';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-translations',
  template: `
<h1>Translations</h1>

  `
})
export class UserTranslationsComponent implements OnInit {



  constructor(

    @Inject(USER_SERVICE) private service: IUserService,
  ) { }

  ngOnInit() {

  }


}

@NgModule({
  declarations: [UserTranslationsComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
  ],
  exports: [UserTranslationsComponent],
  providers: [
  ]
})
export class UserTranslationsModule { }
