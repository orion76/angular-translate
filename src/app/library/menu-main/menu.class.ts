import {IMenuItem} from '@app-library/menu-main/types';


const defaultValues: IMenuItem = {
  routerLink: null,
  weight: 0,
  automationId: null,
  badge: null,
  badgeStyleClass: null,
  command: null,
  disabled: false,
  expanded: false,
  icon: null,
  id: null,
  // items: [],
  label: null,
  queryParams: {},
  routerLinkActiveOptions: null,
  separator: null,
  style: null,
  styleClass: null,
  target: null,
  title: null,
  url: null,
  visible: true
};

export interface IMenuRecord extends IMenuItem {
  isRecord: boolean;
}

export class MenuRecord implements IMenuRecord {
  weight = 0;
  isRecord = true;

  items: IMenuRecord[];
  private _ids: { [key: string]: number } = {};

  constructor(menu: IMenuItem = defaultValues) {
    this.updateProperties(menu);
  }

  has(key: string) {
    return this._ids.hasOwnProperty(key);
  }

  hasProperty(name: string) {
    return (this as object).hasOwnProperty(name) && this[name] !== null;
  }

  get(key: string) {
    if (this.hasProperty(key)) {
      return this[key];
    }

    if (this.has(key)) {
      const index = this._ids[key];
      return this.items[index];
    }

  }

  getIn(path: string[]) {
    return path.reduce((item: MenuRecord, key: string) => item.get(key), this);
  }


  setIn(path: string[], key: string, value: MenuRecord | IMenuItem, addParents = false) {

    const parent = this.getIn(path);

    if (!parent) {
      console.error('[MENU CLASS]', 'Path not found in', {path, menu: this});
      return;
    }

    parent.set(key, value);

  }

  setPropertyIn(path: string[], property: string, value: any) {
    const target = this.getIn(path);
    target.setProperty(property, value);
  }

  setProperty(name: string, value: any) {
    this[name] = value;
  }

  set(key: string, value: MenuRecord | IMenuItem) {

    if (this.has(key)) {

      const exists = this.get(key);
      exists.updateProperties(value);

    } else {
      const _value = value instanceof MenuRecord ? value : new MenuRecord(value);
      const index = this._nextIndex(_value.weight);
      this._insert(index, key, _value);
    }
  }

  delete(key: string) {
    if (!this.has(key)) {
      return;
    }
    const index = this._ids[key];
    this.items.splice(index, 1);
    this._indexDecrement(index);
  }

  updateProperties(properties: IMenuItem) {
    Object.keys(properties).forEach((name: string) => this[name] = properties[name]);
  }

  private _insert(index: number, key: string, value: MenuRecord) {
    if (!this.items) {
      this.items = [];
    }
    this.items.splice(index, 0, value);
    this._addKey(key, value);
  }

  private _addKey(key: string, value: MenuRecord) {
    const index = this.items.indexOf(value);
    this._ids[key] = index;
    this._indexIncrement(index + 1);
  }

  private _deleteKey(key: string) {
    const index = this._ids[key];
    delete this._ids[key];
    this._indexDecrement(index);
  }

  private _nextIndex(weight: number) {

    if (!this.items || this.items.length === 0) {
      return 0;
    }

    let lastItem: IMenuRecord;


    for (let i = this.items.length - 1; i >= 0; i--) {
      if (!lastItem) {
        lastItem = this.items[i];
        continue;
      }

      const item = this.items[i];
      if (item.weight < weight) {
        lastItem = item;
      } else {
        break;
      }
    }

    return this.items.indexOf(lastItem) + 1;
  }

  private _indexIncrement(from: number) {
    Object.keys(this._ids)
      .filter((key: string) => this._ids[key] >= from)
      .forEach((key: string) => this._ids[key]++);
  }

  private _indexDecrement(to: number) {
    Object.keys(this._ids)
      .filter((key: string) => this._ids[key] <= to)
      .forEach((key: string) => this._ids[key]--);
  }
}
