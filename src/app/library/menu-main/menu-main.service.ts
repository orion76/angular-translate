import { Inject, Injectable, InjectionToken } from "@angular/core";
import { IMenuState } from '@app-library/menu-main/store/types';
import { IAppState } from '@app-store/app-store.module';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Observable } from 'rxjs';
import { StoreActions, StoreSelectors } from './store';
import { tap } from 'rxjs/operators';
import { IMenuService } from '@app-library/menu-main/types';

export const MENU_MAIN_SERVICE = new InjectionToken<IMenuMainService>('MENU_MAIN_SERVICE');
export const MENU_SERVICE = new InjectionToken<IMenuService>('MENU_SERVICE');
export const MENU_MAIN_STATE = new InjectionToken<IMenuState>('MENU_MAIN_STATE');

export interface IMenuMainService {
  Init();
  onMenu(): Observable<MenuItem[]>;
  add(items: IMenuState[]);
  delete(items: IMenuState[]);
}

@Injectable()
export class MenuMainService implements IMenuMainService {

  constructor(
    @Inject(MENU_MAIN_STATE) private states: IMenuState[][] = [],
    @Inject(MENU_SERVICE) private services: IMenuService[] = [],
    private store: Store<IAppState>
  ) {



  }


  Init() {
    this.states.forEach((state: IMenuState[]) => this.store.dispatch(new StoreActions.ADD(state)));
    this.services.forEach((service: IMenuService) => service.Init(this));
  }

  delete(items: IMenuState[]) {
    this.store.dispatch(new StoreActions.DELETE(items))
  }

  add(items: IMenuState[]) {
    this.store.dispatch(new StoreActions.ADD(items))
  }

  onMenu(): Observable<MenuItem[]> {
    return this.store.pipe(

      select(StoreSelectors.Menu),
      // tap((args) => console.log('1111-[MenuMainService]', args)),
      // take(1)
    )
  }
}
