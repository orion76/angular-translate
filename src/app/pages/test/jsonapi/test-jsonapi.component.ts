import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IMenuMainService, MENU_MAIN_SERVICE } from '@app-library/menu-main/menu-main.service';
import { StoreActions as MenuActions } from '@app-library/menu-main/store';
import { IUser, IUserService, USER_SERVICE } from '@app-library/user';
import { UserModule } from '@app-library/user/user.module';
import { IAppState } from '@app-store/app-store.module';
import { Store } from '@ngrx/store';
import { UserTranslationsComponent, UserTranslationsModule } from '@pages/user/translations/user-translations.component';
export const UserHomeRoutes: Routes = [
  { path: 'translations', component: UserTranslationsComponent }
]

@Component({
  selector: 'test-jsonapi',
  template: `
<h1>User profile</h1>
<router-outlet></router-outlet>
  `
})
export class TestJsonApiComponent implements OnInit {



  constructor(
    @Inject(MENU_MAIN_SERVICE) private menu: IMenuMainService,
    @Inject(USER_SERVICE) private service: IUserService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {

    this.service.onLogin()
      .subscribe((user: IUser) => {
        // this.store.dispatch(new MenuActions.ADD([{
        //   place: 'right', path: ['user'], id: 'translations',
        //   item: { label: 'Translations', routerLink: '/user/translations' }
        // }]))
      })
  }
}

@NgModule({
  declarations: [TestJsonApiComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    UserTranslationsModule
  ],
  exports: [TestJsonApiComponent],
  providers: [
  ]
})
export class TestJsonApiModule { }
