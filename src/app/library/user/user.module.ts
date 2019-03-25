import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuMainModule } from '@app-library/menu-main/module';
import { UserRoutingModule } from '@app-library/user/routing.module';
import { StoreUserModule } from '@app-library/user/store/module';
import { UserCabinetComponent } from '@app-library/user/user-cabinet/user-cabinet.component';
import { menu_anonimus } from './user.service';

@NgModule({
  declarations: [
    UserCabinetComponent,
  ],
  imports: [
    CommonModule,
    StoreUserModule,
    UserRoutingModule,
    MenuMainModule.forRoot(menu_anonimus)
  ],
  exports: [UserCabinetComponent],
  providers: [
  ]
})
export class UserModule { }
