import { Injectable } from '@angular/core';
import { IAppState } from '@app/app-store/app-store.module';
import { StoreActions as UserActions, StoreSelectors as UserSelectors, IUserStatusProps } from '@app/app-store/user';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IUserService, IUser } from '../types/user';
import { IRequestUser } from '@app-library/store/types';
import { EEntityType } from '@app/types';


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
      this.store.dispatch(new UserActions.REQUEST(entityId, request));
    })

  }

  onUID(): Observable<string> {
    return of('111');
  }

  onLoaded(): Observable<IUser> {
    return this.store.pipe(this.selectors.entityStatus('LOAD_SUCCESS', true));
  }



}
