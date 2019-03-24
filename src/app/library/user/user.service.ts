import { Injectable, InjectionToken } from '@angular/core';
import { IRequestUser } from '@app-library/store/types';
import { IAppState } from '@app/app-store/app-store.module';
import { EEntityType } from '@app/types';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { StoreActions as UserActions, StoreSelectors as UserSelectors } from './store';
import { IUser, IUserService } from './types';


export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');

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
    })

  }

  onUID(): Observable<string> {
    return of('111');
  }

  onLoaded(): Observable<IUser> {
    return this.store.pipe(this.selectors.entityStatus('LOAD_SUCCESS', true));
  }

  onLogin() {
    return this.store.pipe(this.selectors.entityStatus('LOGIN', true));
  }


  onLogout() {
    return this.store.pipe(this.selectors.entityStatus('LOGOUT', true));
  }

}
