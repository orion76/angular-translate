import {Inject, Injectable, InjectionToken} from '@angular/core';
import {IMenuState} from '@app-library/menu-main/store/types';
import {IAppState} from '@app-store/app-store.module';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {StoreActions, StoreSelectors} from './store';
import {tap} from 'rxjs/operators';
import {MenuRecord} from '@app-library/menu-main/menu.class';
import {IMenuMainService, IMenuModuleService, IMenuSecondary} from '@app-library/menu-main/types';

export const MENU_SECONDARY = new InjectionToken<IMenuSecondary>('MENU_SECONDARY');
export const MENU_MODULE_SERVICE = new InjectionToken<IMenuModuleService>('MENU_MODULE_SERVICE');
export const MENU_MAIN_SERVICE = new InjectionToken<IMenuMainService>('MENU_MAIN_SERVICE');
export const MENU_MAIN_STATE = new InjectionToken<IMenuState>('MENU_MAIN_STATE');


@Injectable()
export class MenuMainService implements IMenuMainService {

  root = new MenuRecord();

  constructor(
    @Inject(MENU_SECONDARY) private secondary: IMenuSecondary[] = [],
    @Inject(MENU_MODULE_SERVICE) private  services: IMenuModuleService[] = [],
    @Inject(MENU_MAIN_STATE) private states: IMenuState[][] = [],
    private store: Store<IAppState>
  ) {

  }

  init() {
    this.states.forEach((state: IMenuState[]) => this.store.dispatch(new StoreActions.ADD(state)));
    this.services.forEach((service: IMenuModuleService) => service.init(this));

    this.secondary.forEach((menu: IMenuSecondary) => this.addSecondary(menu.name));
    this.onMenu().subscribe((items: IMenuState[]) => {

      this.updateMenu(items);
    });
  }

  getModel(name: string) {
    if (!this.root.has(name)) {
      this.addSecondary(name);

    }
    return this.root.get(name);
  }

  addSecondary(name: string) {
    const secondary = new MenuRecord();
    this.root.set(name, secondary);
  }

  delete(items: IMenuState[]) {
    this.store.dispatch(new StoreActions.DELETE(items));
  }

  add(items: IMenuState[]) {
    this.store.dispatch(new StoreActions.ADD(items));
  }

  onMenu(): Observable<IMenuState[]> {
    return this.store.pipe(
      select(StoreSelectors.menu),
    );
  }

  createPath(menu: IMenuState) {

    return [menu.menuName, ...menu.path];
  }

  updateMenu(items: IMenuState[]) {
    items.forEach((state: IMenuState) => {
      const path = this.createPath(state);
      this.root.setIn(path, state.id, state.item);
    });
  }
}
