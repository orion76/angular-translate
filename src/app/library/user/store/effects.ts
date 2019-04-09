import {Inject, Injectable} from '@angular/core';
import {IAppState} from '@app/app-store/app-store.module';
import {DATA_SERVICE, IDataService} from '@app/services/data';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {IUser} from '../types';
import {StoreActions as UserActions} from './actions';
import {USER_AUTH_SERVICE} from '../auth/auth.service';
import {tap} from 'rxjs/internal/operators/tap';
import {IUserAuthService} from '../auth/types';

@Injectable()
export class UserEffects {

  @Effect({dispatch: false})
  AUTHENTICATE$ = this.actions$.pipe(
    ofType<UserActions.Authenticate>(UserActions.Types.AUTHENTICATE),
    tap((action: UserActions.Authenticate) => this.service.toLocalStorage(action.authData))
  );

  @Effect()
  LOAD$ = this.actions$.pipe(
    ofType<UserActions.LOAD>(UserActions.Types.LOAD),

    switchMap((action: UserActions.LOAD) => {
      return this.data.getItem(action.request).pipe(
        map((entity: IUser) => new UserActions.LoadSuccess(entity)),
        catchError(() => of(new UserActions.LoadError(action.request))),
      );
    })
  );

  @Effect()
  LOAD_SUCCESS$ = this.actions$.pipe(
    ofType<UserActions.LoadSuccess>(UserActions.Types.LOAD_SUCCESS),
    map((action: UserActions.LoadSuccess) => new UserActions.Login()),
  );


  constructor(
    private store: Store<IAppState>,
    private actions$: Actions<UserActions.Actions>,
    @Inject(USER_AUTH_SERVICE) private service: IUserAuthService,
    @Inject(DATA_SERVICE) private data: IDataService
  ) {

  }

}
