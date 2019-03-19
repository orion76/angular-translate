import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuBar: MenuItem[];
  title = 'trans';

  constructor() {

  }

  ngOnInit() {
    this.menuBar = [
      { label: 'Trans', routerLink: 'trans' },
      { label: 'Trans New', routerLink: 'trans-new' },
    ]
  }
}



