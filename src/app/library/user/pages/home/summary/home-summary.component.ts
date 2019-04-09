import {CommonModule} from '@angular/common';
import {Component, Inject, Input, NgModule, OnInit} from '@angular/core';
import {ITranslateData} from '@app-library/common';
import {IUserService} from '../../../types';
import {USER_SERVICE} from '../../../user.service';


@Component({
  selector: 'user-summary',
  template: `
<div class="user-summary">
</div>

  `
})
export class HomeSummaryComponent implements OnInit {

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
  declarations: [HomeSummaryComponent],
  imports: [
    CommonModule,
  ],
  exports: [HomeSummaryComponent]
})
export class UserSummaryModule { }
