import { Inject, Injectable } from '@angular/core';
import { IAppState } from '@app/app-store/app-store.module';
import { IDataService, DATA_SERVICE } from '@app/services/data';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUser } from '../types';
import { StoreActions as UserActions } from './actions';
import { EEntityType } from '@app/types';
import { IEntityRequest } from '@xangular-store/entity/types';

@Injectable()
export class UserEffects {


  @Effect()
  LOAD$ = this.actions$.pipe(

    ofType<UserActions.LOAD>(UserActions.Types.LOAD),

    switchMap((action: UserActions.LOAD) => {
      debugger;
      return this.data.getItem(action.request).pipe(
        map((entity: IUser) => new UserActions.LOAD_SUCCESS(entity)),
        catchError(() => of(new UserActions.LOAD_ERROR(action.request))),
      )
    })
  );

  @Effect()
  LOAD_SUCCESS$ = this.actions$.pipe(
    ofType<UserActions.LOAD_SUCCESS>(UserActions.Types.LOAD_SUCCESS),
    map((action: UserActions.LOAD_SUCCESS) => new UserActions.Login()),
  );


  constructor(
    private store: Store<IAppState>,
    private actions$: Actions<UserActions.Actions>,
    @Inject(DATA_SERVICE) private data: IDataService
  ) {

  }

}
