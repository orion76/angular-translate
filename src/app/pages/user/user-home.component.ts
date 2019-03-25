import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { IMenuMainService, MENU_MAIN_SERVICE } from '@app-library/menu-main/menu-main.service';
import { EUserRole, IMenuUpdate, IUserService, USER_SERVICE } from '@app-library/user';
import { UserModule } from '@app-library/user/user.module';
import { RouterModule, Routes } from '@angular/router';
import { UserTranslationsComponent, UserTranslationsModule } from '@pages/user/translations/user-translations.component';

export const UserHomeRoutes: Routes = [
  { path: 'translations', component: UserTranslationsComponent }
]

@Component({
  selector: 'app-user-home',
  template: `
<h1>User profile</h1>
<router-outlet></router-outlet>
  `
})
export class UserHomeComponent implements OnInit {



  constructor(
    @Inject(MENU_MAIN_SERVICE) private menu: IMenuMainService,
    @Inject(USER_SERVICE) private service: IUserService,
  ) { }

  ngOnInit() {

    this.service.onMenuUpdate(EUserRole.AUTORISED)
      .subscribe((update: IMenuUpdate) => {

               update.items.push({ label: 'Translations', routerLink: '/user/translations' })
      })
  }


}

@NgModule({
  declarations: [UserHomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    UserTranslationsModule
  ],
  exports: [UserHomeComponent],
  providers: [
  ]
})
export class UserHomeModule { }
