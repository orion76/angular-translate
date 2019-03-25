import { Component, Inject, OnInit } from '@angular/core';
import { IMenuMainService, MENU_MAIN_SERVICE } from '@app-library/menu-main/menu-main.service';
import { MenuItem } from 'primeng/api';
import { IMenuMainItems, IMenuState } from '@app-library/menu-main/store/types';



@Component({
  selector: 'menu-main',
  template: `
<div class="menu-main">
  <div class="menu-main-left">
    <p-menu [model]="items.right"></p-menu>

  </div>
  <!--
  <div class="menu-main-middle">
    <p-menu *ngFor="let item in items.middle" [model]="item" ></p-menu>
  </div>
  <div class="menu-main-right">
    <p-menu *ngFor="let item in items.right" [model]="item" ></p-menu>
  </div>
-->

</div>
  `
})
export class MenuMainComponent implements OnInit {



  public items: IMenuMainItems = {
    left: [],
    middle: [],
    right: [],
  }

  autoZIndex: boolean = true;
  autoDisplay: boolean = true;
  baseZIndex: number = 0;

  constructor(
    @Inject(MENU_MAIN_SERVICE) protected service: IMenuMainService,
  ) { }

  ngOnInit() {
    this.service.onMenu().subscribe((items: MenuItem[]) => {
      const newItems: IMenuMainItems = {
        left: [],
        middle: [],
        right: [],
      }
      this.items = items.reduce((acc: IMenuMainItems, item: IMenuState) => {
        if (!item.place) {
          item.place = "middle"
        }
        acc[item.place] = acc[item.place].concat(item.items);
        return acc;
      }, newItems)
    })
  }


}


