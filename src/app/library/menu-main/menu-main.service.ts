import { Injectable, InjectionToken, Inject } from "@angular/core";
import { IMenuState } from '@app-library/menu-main/store/types';
import { IAppState } from '@app-store/app-store.module';
import { Store, select } from '@ngrx/store';
import { StoreActions } from './store'
import { StoreSelectors } from './store'
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/components/common/menuitem';
import { take, tap } from 'rxjs/operators';

export const MENU_MAIN_SERVICE = new InjectionToken<IMenuMainService>('MENU_MAIN_SERVICE');
export const MENU_MAIN_STATE = new InjectionToken<IMenuState>('MENU_MAIN_STATE');

export interface IMenuMainService {
  onMenu(): Observable<MenuItem[]>
}

@Injectable()
export class MenuMainService implements IMenuMainService {

  constructor(
    @Inject(MENU_MAIN_STATE) states: IMenuState[],
    private store: Store<IAppState>
  ) {
    states.forEach((state: IMenuState) => {
      this.store.dispatch(new StoreActions.ADD(state))
    })
  }


  delete(menuId: string) {
    this.store.dispatch(new StoreActions.DELETE(menuId))
  }

  add(menuState: IMenuState) {
    this.store.dispatch(new StoreActions.ADD(menuState))
  }

  onMenu(): Observable<MenuItem[]> {
    return this.store.pipe(

      select(StoreSelectors.Menu),
      // tap((args) => console.log('1111-[MenuMainService]', args)),
      // take(1)
    )
  }
}
