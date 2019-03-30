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
import { EUserRole, IUser, IUserService, TUserStatusName, Anonymus } from './types';



export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');


@Injectable()
export class UserService implements IUserService {

  selectors: UserSelectors.IEntitySelectors;


  constructor(private store: Store<IAppState>) {
    this.selectors = UserSelectors.createSelectors();
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
      this.store.dispatch(new UserActions.REQUEST(request));

      this.onStatus('REQUEST').subscribe(() => {
        this.store.dispatch(new UserActions.LOAD(request));
      })
    })

    this.onLogin().subscribe((user: IUser) => {
      this.menuReplace(EUserRole.ANONIMUS, EUserRole.AUTORISED, user);
    })

    this.onLogout().subscribe((user: IUser) => {
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
      item: { label, routerLink: '/user' },
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
