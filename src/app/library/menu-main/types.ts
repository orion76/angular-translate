import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs';
import {IMenuState} from './store/types';


export interface IMenuSecondary {
  name: string;

}

export interface IMenuItem extends MenuItem {
  weight: number;
  items?: IMenuItem[];
}

export interface IMenuModuleService {
  init(service: IMenuMainService);
}

export interface IMenuMainService {
  init();
  getModel(name: string);
  onMenu(): Observable<IMenuState[]>;

  add(items: IMenuState[]);

  delete(items: IMenuState[]);
}
