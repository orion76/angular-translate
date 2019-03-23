import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { DATA_SERVICE, TRANSLATE_SERVICE } from '@app/services/injection-tokens';
import { IDataService } from '@app/services/data.service';
import { StoreActions } from './actions';
import { ESources, IEntityTranslated } from '@app/types';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app-store.module';
import { ITranslateService } from '@app-services/translate.service';


@Injectable()
export class TranslatedStoreEffects {


  @Effect()
  LOAD$ = this.actions$.pipe(
    ofType<StoreActions.LOAD>(StoreActions.Types.LOAD),
    switchMap((action: StoreActions.LOAD) => {
      return this.service.load(action.request).pipe(
        map((entity: IEntityTranslated) => new StoreActions.LOAD_SUCCESS(action.stateId, entity)),
        catchError(() => of(new StoreActions.LOAD_ERROR(action.stateId)))
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
