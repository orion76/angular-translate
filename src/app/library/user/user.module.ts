import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserCabinetComponent } from '@app-library/user/user-cabinet/user-cabinet.component';
import { UserRoutingModule } from '@app-library/user/routing.module';
import { UserLoginModule } from '@app-library/user/user-cabinet/user-login/user-login.component';
import { UserLogoutModule } from '@app-library/user/user-cabinet/user-logout/user-logout.component';
import { UserSummaryModule } from '@app-library/user/user-cabinet/user-summary.component';


@NgModule({
  declarations: [
    UserCabinetComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,

  ],
  exports: [UserCabinetComponent],
  providers: [
  ]
})
export class UserModule { }
