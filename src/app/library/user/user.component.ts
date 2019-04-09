import {CommonModule} from '@angular/common';
import {Component, Inject, NgModule, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MENU_MAIN_SERVICE} from '@app-library/menu-main/menu-main.service';
import {IUserService, USER_SERVICE} from '@app-library/user';
import {IAppState} from '@app-store/app-store.module';
import {Store} from '@ngrx/store';
import {StoreState} from '@app-library/user/store';
import {IMenuMainService} from '@app-library/menu-main/types';


// export const userHomeRoutes: Routes = [
//   {path: 'translations', component: UserTranslationsComponent}
// ];

@Component({
  selector: 'app-user',
  template: `
      <router-outlet></router-outlet>
  `
})
export class UserComponent implements OnInit {


  constructor(
    @Inject(MENU_MAIN_SERVICE) private menu: IMenuMainService,
    @Inject(USER_SERVICE) private service: IUserService,
    private store: Store<IAppState>
  ) {
  }

  ngOnInit() {

    this.service.onLogin()
      .subscribe((state: StoreState.TStateUser) => {
        // this.store.dispatch(new MenuActions.ADD([{
        //   place: 'right', path: ['user'], id: 'translations',
        //   item: { label: 'Translations', routerLink: '/user/translations' }
        // }]))
      });
  }
}

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [UserComponent],
  providers: []
})
export class UserHomeModule {
}
