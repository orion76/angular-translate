import { Inject, Injectable } from '@angular/core';
import { ITranslateService } from '@app-services/translate.service';
import { IAppState } from '@app-store/app-store.module';
import { TRANSLATE_SERVICE } from '@app/services/injection-tokens';
import { IEntityTranslate } from '@app/types';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StoreActions } from './actions';





@Injectable()
export class TranslatedStoreEffects {


  @Effect()
  LOAD$ = this.actions$.pipe(
    ofType<StoreActions.LOAD>(StoreActions.Types.LOAD),
    switchMap((action: StoreActions.LOAD) => {
      return this.service.load(action.request).pipe(
        map((entity: IEntityTranslate) => new StoreActions.LOAD_SUCCESS(action.stateId, entity)),
        catchError(() => of(new StoreActions.LOAD_ERROR(action.stateId, action.request)))
      )
    })
  );


  constructor(
    @Inject(TRANSLATE_SERVICE) protected service: ITranslateService,
    private store: Store<IAppState>,
    private actions$: Actions<StoreActions.Actions>,

  ) {

  }

}
