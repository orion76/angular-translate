import { Component, Inject, OnInit } from '@angular/core';
import { IMenuMainService, MENU_MAIN_SERVICE } from '@app-library/menu-main/menu-main.service';
import { MenuItem } from 'primeng/api';
import { IMenuMainItems, IMenuState, TMenuPlace } from '@app-library/menu-main/store/types';

export function createId(item: IMenuState) {
  let path: string[] = [];

  ['place', 'path', 'id'].every((key: string) => {
    if (!item[key]) {
      return;
    }
    if (key === 'path') {
      path = path.concat(item[key]);
    } else {
      path.push(item[key])
    }
    return true;
  })
  return path.join('-');
}

@Component({
  selector: 'menu-main',
  template: `
<div class="menu-main">
  <div class="menu-main-left">
    <p-menubar [model]="items.left.items"></p-menubar>

  </div>

  <div class="menu-main-middle">
    <p-menubar [model]="items.middle.items" ></p-menubar>
  </div>
  <div class="menu-main-right">
    <p-menubar [model]="items.right.items" ></p-menubar>
  </div>


</div>
  `
})
export class MenuMainComponent implements OnInit {

  private map: Map<string, MenuItem> = new Map();

  public items: IMenuMainItems = {
    left: null,
    middle: null,
    right: null,
  }

  autoZIndex: boolean = true;
  autoDisplay: boolean = true;
  baseZIndex: number = 0;

  constructor(
    @Inject(MENU_MAIN_SERVICE) protected service: IMenuMainService,
  ) { }
  ngOnInit() {
    this.addRoot();
    this.service.onMenu().subscribe((items: IMenuState[]) => this.updateMenu(items))
  }

  getRoot(): IMenuState[] {
    return [{ place: 'left' }, { place: 'middle' }, { place: 'right' }]
  }

  addRoot() {
    this.getRoot().forEach((item: IMenuState) => {
      this.items[item.place] = { items: [] };
      this.map.set(item.place, this.items[item.place]);
    })
  }

  updateMenu(items: IMenuState[]) {
    items.forEach((item: IMenuState) => {
      const id = createId(item);

      if (item.item && this.map.has(id)) {
        this.updateItem(this.map.get(id), item.item);
      } else {

        const { place, path } = item

        const parentId = createId({ place, path });

        if (!this.map.has(parentId)) {
          this.updateMenu(this.createParents(item.place, item.path))
        }

        const parent = this.map.get(parentId);
        if (!parent.items) {
          parent.items = [];
        }
        (parent.items as MenuItem[]).push(item.item);
        this.map.set(id, item.item);
      }
    });

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

  createParents(place: TMenuPlace, childPath: string[]): IMenuState[] {

    const path: string[] = [];

    if (!childPath) {
      childPath = [];
    }

    return childPath.reduce((parents: IMenuState[], part: string) => {
      path.push(part);
      parents.push({ place, path });
      return parents;
    }, [{ place }])

  }



}


