import { Injectable, InjectionToken } from '@angular/core';
import { StoreActions as MenuActions } from '@app-library/menu-main/store';
import { IMenuState } from '@app-library/menu-main/store/types';
import { IAppState } from '@app/app-store/app-store.module';
import { EEntityType } from '@app/types';
import { Store } from '@ngrx/store';
import { IEntityRequest } from '@xangular-store/entity/types';
import { Observable, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { StoreActions as UserActions, StoreSelectors as UserSelectors } from './store';
import { EUserRole, IUser, IUserService, Anonymus } from './types';
import { StoreState as UserState } from './store'
import TStateUser = UserState.TStateUser

export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');


@Injectable()
export class UserService implements IUserService {

  selectors = UserSelectors.selectors;


  constructor(private store: Store<IAppState>) {

    this.init();

    // const observer: PartialObserver<IMenuUpdate> = {
    //   complete: () => console.log('9999999999')
    // }
    // this.onMenuUpdate.subscribe(observer)
  }


  init() {

    this.store.dispatch(new MenuActions.ADD(this.getUserMenu(Anonymus)));

    this.onUID().subscribe((entityId: string) => {

      const request: IEntityRequest = { source: EEntityType.user, entityId };
      this.store.dispatch(new UserActions.Add(request));

      this.store.pipe(this.selectors.isStatus({ REQUEST: true })).subscribe(() => {
        this.store.dispatch(new UserActions.LOAD(request));
      })
    })

    this.onLogin().subscribe((state: TStateUser) => {
      // this.menuReplace(EUserRole.ANONIMUS, EUserRole.AUTORISED, user);
    })

    this.onLogout().subscribe((user: TStateUser) => {
      this.menuReplace(EUserRole.AUTORISED, EUserRole.ANONIMUS, Anonymus);
    })

  }

  getRoleMenu(role: EUserRole, user: IUser) {
    let menu: IMenuState[] = [];
    switch (user.role) {
      case EUserRole.ANONIMUS:

        menu = [{
          item: { label: 'Login', routerLink: '/user/login' },
          place: 'right', path: ['user'], id: EUserRole.ANONIMUS, weight: 1000,
        }]
        break;
      case EUserRole.AUTORISED:

        menu = [{
          item: { label: 'Logout', routerLink: '/user/logout', icon: user.avatar },
          place: 'right', path: ['user'], id: EUserRole.AUTORISED
        }]
        break;
    }
    return menu;
  }

  getUserMenu(user: IUser): IMenuState[] {

    let label = 'nobody';

    switch (user.role) {
      case EUserRole.ANONIMUS:
        label = 'Anonim';
        break;
      case EUserRole.AUTORISED:
        label = user.label;
        break;
    }

    return [{
      item: { label, routerLink: '/user/login' },
      place: 'right', path: [], id: 'user', weight: 1000,
    }]
  }

  private menuReplace(roleOld: EUserRole, roleNew: EUserRole, user: IUser) {
    this.store.dispatch(new MenuActions.DELETE(this.getRoleMenu(roleOld, user)));
    this.store.dispatch(new MenuActions.ADD(this.getRoleMenu(roleNew, user)));
  }

  onUID(): Observable<string> {
    return of('111').pipe(delay(1));
  }

  onLoaded(): Observable<TStateUser> {
    return this.store.pipe(
      this.selectors.isStatus({ LOAD_SUCCESS: true }),
      take(1)
    );
  }

  onLogin(): Observable<TStateUser> {
    return this.store.pipe(
      this.selectors.isStatus({ LOGIN: true }),
      take(1)
    );
  }


  onLogout(): Observable<TStateUser> {
    return this.store.pipe(
      this.selectors.isStatus({LOGOUT: true}),
      take(1)
    );
  }

}
