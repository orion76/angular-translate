import { Component, Inject, OnInit } from '@angular/core';
import { IMenuMainService, MENU_MAIN_SERVICE } from '@app-library/menu-main/menu-main.service';
import { MenuItem } from 'primeng/api';
import { IMenuMainItems, IMenuState, TMenuPlace } from '@app-library/menu-main/store/types';



@Component({
  selector: 'menu-main',
  template: `
<div class="menu-main">
  <div class="menu-main-left">
    <p-menubar [model]="items.left"></p-menubar>

  </div>

  <div class="menu-main-middle">
    <p-menubar [model]="items.middle" ></p-menubar>
  </div>
  <div class="menu-main-right">
    <p-menubar [model]="items.right" ></p-menubar>
  </div>


</div>
  `
})
export class MenuMainComponent implements OnInit {

  private map: Map<string, MenuItem> = new Map();

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

  addRoot() {

  }

  createId(...path: string[]) {
    return path.join('-');
  }

  private updateItem(item: MenuItem, updates: MenuItem) {

    Object.keys(item)
      .filter((name: string) => name !== 'items')
      .forEach((name: string) => delete item[name]);

    Object.keys(updates).forEach((name: string) => {
      item[name] = updates[name];
    });
  }

  createEmpty(): MenuItem {
    return { label: 'empty' }
  }

  createParents(place: TMenuPlace, path: string[]) {
    const _path: string[] = [];
    path.forEach((part: string) => {
      const item_id = part;
      // _path.push(part);
      const id = this.createId(place, ..._path, item_id);
      if (!this.map.has(id)) {
        const item = this.createEmpty();
        const parentId = this.createId(place, ...path);
        const parent = this.map.get(parentId);
        if (!parent.items) {
          parent.items = [];
        }
        (parent.items as MenuItem[]).push(item);
        this.map.set(id, item);
      }
    })
  }

  ngOnInit() {

    this.service.onMenu().subscribe((items: IMenuState[]) => {

      items.forEach((item: IMenuState) => {
        const id = this.createId(item.place, ...item.path, item.id);

        if (this.map.has(id)) {
          this.updateItem(this.map.get(id), item);
        } else {

          const parentId = this.createId(item.place, ...item.path);

          if (!this.map.has(parentId)) {
            this.createParents(item.place, item.path);
          }

          const parent = this.map.get(parentId);
          if (!parent.items) {
            parent.items = [];
          }
          (parent.items as MenuItem[]).push(item.item);
          this.map.set(id, item.item);
        }
      });




      // const newItems: IMenuMainItems = { left: [], middle: [], right: [] }

      // this.items = items.reduce((acc: IMenuMainItems, item: IMenuState) => {
      //   if (!item.place) {
      //     item.place = "middle"
      //   }
      //   acc[item.place] = acc[item.place].concat(item.items);
      //   return acc;
      // }, newItems)
    })
  }


}


