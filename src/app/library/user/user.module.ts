import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuMainModule } from '@app-library/menu-main/module';

import { StoreUserModule } from '@app-library/user/store/module';

import { menu_anonimus } from './user.service';
import { UserSummaryModule } from './user-cabinet/user-summary/user-summary.component';
import { UserLoginModule } from './user-cabinet/user-login/user-login.component';
import { UserLogoutModule } from './user-cabinet/user-logout/user-logout.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    StoreUserModule,
    MenuMainModule.forRoot(menu_anonimus),
    UserSummaryModule,
    UserLoginModule,
    UserLogoutModule,

  ],
  exports: [],
  providers: [
  ]
})
export class UserModule { }
