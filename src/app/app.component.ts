import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
  <menu-main></menu-main>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'trans';

  constructor() {

  }

  ngOnInit() {
  }
}



