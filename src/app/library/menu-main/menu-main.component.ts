import {Component, Inject, OnInit} from '@angular/core';
import {MENU_MAIN_SERVICE} from '@app-library/menu-main/menu-main.service';

import {IMenuMainItems} from '@app-library/menu-main/store/types';
import {IMenuItem, IMenuMainService} from '@app-library/menu-main/types';

@Component({
  selector: 'menu-main',
  template: `
      <div class="menu-main">
          <div class="menu-main-left">
              <p-menubar [model]="items.left.items"></p-menubar>

          </div>

          <div class="menu-main-middle">
              <p-menubar [model]="items.middle.items"></p-menubar>
          </div>
          <div class="menu-main-right">
              <p-menubar [model]="items.right.items"></p-menubar>
          </div>


      </div>
  `
})
export class MenuMainComponent implements OnInit {

  public items: IMenuMainItems = {
    left: null,
    middle: null,
    right: null,
  };
  autoZIndex = true;
  autoDisplay = true;
  baseZIndex = 0;
  private map: Map<string, IMenuItem> = new Map();

  constructor(
    @Inject(MENU_MAIN_SERVICE) protected service: IMenuMainService,
  ) {
  }

  ngOnInit() {

    this.items.left = this.service.getModel('main-left');
    this.items.middle = this.service.getModel('main-middle');
    this.items.right = this.service.getModel('main-right');
    this.service.init();
  }


}


