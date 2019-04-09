import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {StoreUserModule} from './store/module';


import {UserSummaryModule} from './pages/home/summary/home-summary.component';
import {UserLoginModule} from './pages/user/user-login/user-login.component';
import {UserLogoutModule} from './pages/user/user-logout/user-logout.component';
import {MenuMainModule} from '@app-library/menu-main/module';
import {UserMenuService} from './menu.service';
import {RouterModule} from '@angular/router';
import {UserHomeModule} from './user.component';
import {UserRoutingModule} from './routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    StoreUserModule,
    MenuMainModule.addService(UserMenuService),

    UserRoutingModule,
    UserHomeModule,
    UserSummaryModule,
    UserLoginModule,
    UserLogoutModule,

  ],
  exports: [],
  providers: []
})
export class UserModule {
}
