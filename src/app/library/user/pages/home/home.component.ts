import {CommonModule} from '@angular/common';
import {Component, Inject, Input, NgModule, OnInit} from '@angular/core';
import {ITranslateData} from '@app-library/common';
import {IUserService} from '../../types';
import {USER_SERVICE} from '../../user.service';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'home',
  template: `
      <router-outlet></router-outlet>

  `
})
export class HomeComponent implements OnInit {


  @Input() data: ITranslateData;

  constructor(
    @Inject(USER_SERVICE) protected service: IUserService,
  ) {
  }

  ngOnInit() {
  }


}

