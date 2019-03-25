import { Inject, Injectable } from '@angular/core';
import { ITranslateService } from '@app-services/translate.service';
import { IEntityOriginal } from '@app/types';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { StoreActions } from './actions';
import { IAppState } from '@app-store/app-store.module';
import { TRANSLATE_SERVICE } from '@app-services/injection-tokens';



@Injectable()
export class OriginalEffects {


  @Effect()
  LOAD$ = this.actions$.pipe(
    ofType<StoreActions.LOAD>(StoreActions.Types.LOAD),
    switchMap((action: StoreActions.LOAD) => {
      return this.service.load(action.request).pipe(
        map((entity: IEntityOriginal) => new StoreActions.LOAD_SUCCESS(action.stateId, entity)),
        catchError(() => of(new StoreActions.LOAD_ERROR(action.stateId, action.request))),
      )
    })
  );

  // ,
  constructor(
    private store: Store<IAppState>,
    private actions$: Actions<StoreActions.Actions>,
    @Inject(TRANSLATE_SERVICE) private service: ITranslateService
  ) {

  }

}
