import { Inject, Injectable } from '@angular/core';
import { IAppState } from '@app/app-store/app-store.module';
import { IDataService } from '@app/services/data.service';
import { DATA_SERVICE } from '@app/services/injection-tokens';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreActions as UserActions } from './actions';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { IUser } from '@app/types';





@Injectable()
export class UserEffects {

  // @Effect()
  // Login$ = this.actions$.pipe(
  //   ofType<UserActions.Login>(UserActions.Types.LOGIN),
  //   map((action: UserActions.Login) => new StatusActions.Login(action.entity)));


  @Effect()
  LOAD$ = this.actions$.pipe(
    ofType<UserActions.LOAD>(UserActions.Types.LOAD),
    switchMap((action: UserActions.LOAD) => {
      const stateId = action.stateId;
      return this.data.getUser(stateId).pipe(
        map((entity: IUser) => new UserActions.LOAD_SUCCESS(stateId, entity)),
        catchError(() => of(new UserActions.LOAD_ERROR(stateId))),
      )
    })
  );

  // @Effect()
  // LoadSuccess$ = this.actions$.pipe(
  //   ofType<UserActions.LoadSuccess>(UserActions.Types.LOAD_SUCCESS),
  //   map((action: UserActions.LoadSuccess) => new StatusActions.LoadSuccess(action.entity)),
  // );


  // @Effect()
  // LoadError$ = this.actions$.pipe(
  //   ofType<UserActions.LoadError>(UserActions.Types.LOAD_ERROR),
  //   map((action: UserActions.LoadError) => new StatusActions.LoadError(action.uid)),
  // );

  // ,
  constructor(
    private store: Store<IAppState>,
    private actions$: Actions<UserActions.Actions>,
    @Inject(DATA_SERVICE) private data: IDataService
  ) {

  }

}
