import { CommonModule } from '@angular/common';
import { Component, Inject, Input, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ITranslateData } from '@app-library/common';
import { MenuMainModule } from '@app-library/menu-main/module';
import { IMenuState } from '@app-library/menu-main/store/types';
import { EUserRole, IUserService } from '../types';
import { USER_SERVICE } from '../user.service';




@Component({
  selector: 'user-summary',
  template: `
<div class="user-summary">
</div>

  `
})
export class UserSummaryComponent implements OnInit {

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
  declarations: [UserSummaryComponent],
  imports: [
    CommonModule,
  ],
  exports: [UserSummaryComponent]
})
export class UserSummaryModule { }
