import { CommonModule } from '@angular/common';
import { Component, Inject, Input, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ITranslateData } from '@app-library/common';
import { MenuMainModule } from '@app-library/menu-main/module';
import { IMenuState } from '@app-library/menu-main/store/types';
import { EUserRole, IUserService } from '../types';
import { USER_SERVICE } from '../user.service';


const menu_anonimus: IMenuState = {
  menuId: EUserRole.ANONIMUS,
  place: 'right',
  weight: 1000,
  path: [],
  items: [{ label: 'Login', routerLink: '/user/login' }]
}
const menu_autorized: IMenuState = {
  menuId: EUserRole.AUTORISED,
  place: 'right',
  weight: 1000,
  path: [],
  items: [
    {
      label: 'User', items: [
        { label: 'Logout', routerLink: '/user/logout' }
      ],
    }
  ]
}


@Component({
  selector: 'user-cabinet',
  template: `
<div class="user-page">
  <h1>Cabinet</h1>
  <div class="sidebar">

  </div>
  <div class="content">
    <router-outlet></router-outlet>
  </div>
</div>

  `
})
export class UserCabinetComponent implements OnInit {

  public translated: string;
  public original: string;

  @Input() data: ITranslateData;

  constructor(
    @Inject(USER_SERVICE) protected service: IUserService,
  ) { }

  ngOnInit() {
  }


}


@NgModule({
  declarations: [UserCabinetComponent],
  imports: [
    CommonModule,
    RouterModule,
    MenuMainModule.forRoot(menu_anonimus)
  ],
  exports: [UserCabinetComponent]
})
export class UserCabinetModule { }
