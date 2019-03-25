import { CommonModule } from '@angular/common';
import { Component, Inject, Input, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ITranslateData } from '@app-library/common';
import { IUserService } from '../types';
import { USER_SERVICE } from '../user.service';


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

  ],
  exports: [UserCabinetComponent]
})
export class UserCabinetModule { }
