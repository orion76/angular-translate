import { Injectable, InjectionToken } from '@angular/core';
import { IRequestUser } from '@app-library/store/types';
import { IAppState } from '@app/app-store/app-store.module';
import { EEntityType } from '@app/types';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { StoreActions as UserActions, StoreSelectors as UserSelectors } from './store';
import { IUser, IUserService, EUserRole, TUserStatusName } from './types';
import { IMenuState } from '@app-library/menu-main/store/types';
import { StoreActions as MenuActions } from '@app-library/menu-main/store';
import { delay, take } from 'rxjs/operators';


export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');

export const menu_anonimus: IMenuState = {
  menuId: EUserRole.ANONIMUS,
  place: 'right',
  weight: 1000,
  path: [],
  items: [{ label: 'Login', routerLink: '/user/login' }]
}

export const menu_autorized: IMenuState = {
  menuId: EUserRole.AUTORISED,
  place: 'right',
  weight: 1000,
  path: [],
  items: [
    {
      label: 'User', items: [
        { label: 'Logout', routerLink: '/user/logout' }
      ],
    }
  ]
}

@Injectable()
export class UserService implements IUserService {

  selectors: UserSelectors.IEntitySelectors;

  constructor(private store: Store<IAppState>) {
    this.selectors = UserSelectors.createSelectors();
    this.init();
  }


  init() {

    this.onUID().subscribe((entityId: string) => {

      const request: IRequestUser = { type: EEntityType.user, entityId };
      this.store.dispatch(new UserActions.REQUEST(request));

      this.onStatus('REQUEST').subscribe(() => {
        this.store.dispatch(new UserActions.LOAD(request));
      })
    })

    this.onLogin().subscribe((user: IUser) => {
      console.log('333333');
      this.menuReplace(menu_anonimus.menuId, menu_autorized);
    })

    this.onLogout().subscribe((user: IUser) => {
      console.log('22222');
      this.menuReplace(menu_autorized.menuId, menu_anonimus);
    })

  }

  private menuReplace(menuId: string, menuNew: IMenuState) {
    this.store.dispatch(new MenuActions.DELETE(menuId));
    this.store.dispatch(new MenuActions.ADD(menuNew));
  }

  onUID(): Observable<string> {
    return of('111').pipe(delay(1));
  }

  onLoaded(): Observable<IUser> {
    return this.store.pipe(
      this.selectors.entityStatus('LOAD_SUCCESS', true),
      take(1)
    );
  }

  onLogin() {
    return this.store.pipe(
      this.selectors.entityStatus('LOGIN', true),
      take(1)
    );
  }

  onStatus(status: TUserStatusName, value: any = true) {
    return this.store.pipe(
      this.selectors.entityStatus(status, value),
      take(1)
    );
  }

  onLogout() {
    return this.store.pipe(
      this.selectors.entityStatus('LOGOUT', true),
      take(1)
    );
  }

}
