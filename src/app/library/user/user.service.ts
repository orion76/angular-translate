import {Inject, Injectable, InjectionToken} from '@angular/core';
import {IAppState} from '@app/app-store/app-store.module';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {StoreSelectors as UserSelectors, StoreState as UserState} from './store';
import {EUserRole, IUser, IUserService} from './types';
import TStateUser = UserState.TStateUser;
import {IUserAuthService, USER_AUTH_SERVICE} from '@app-library/user/auth';

export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');


@Injectable()
export class UserService implements IUserService {

  selectors = UserSelectors.selectors;


  constructor(
    private store: Store<IAppState>,
    @Inject(USER_AUTH_SERVICE) protected auth: IUserAuthService,
  ) {


    // const observer: PartialObserver<IMenuUpdate> = {
    //   complete: () => console.log('9999999999')
    // }
    // this.onMenuUpdate.subscribe(observer)
  }


  getRole(user: IUser) {
    return user.id ? EUserRole.AUTORISED : EUserRole.ANONIMUS;
  }


  onLoaded(): Observable<TStateUser> {
    return this.store.pipe(
      this.selectors.isStatus({LOAD_SUCCESS: true}),
      take(1)
    );
  }

  onLogin(): Observable<TStateUser> {
    return this.auth.onLogin();
  }

  onLogout(): Observable<TStateUser> {
    return this.auth.onLogout();
  }


}
