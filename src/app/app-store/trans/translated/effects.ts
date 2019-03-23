import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { DATA_SERVICE } from '@app/services/injection-tokens';
import { IDataService } from '@app/services/data.service';
import { StoreActions } from './actions';
import { ESources, IEntityTranslated } from '@app/types';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app-store.module';


@Injectable()
export class TranslatedStoreEffects {


  @Effect()
  loadOriginal$ = this.actions$.pipe(
    ofType<StoreActions.LOAD>(StoreActions.Types.LOAD),
    switchMap((action: StoreActions.LOAD) => {
      return this.data.getItem(ESources.SOURCE, action.originalId).pipe(
        map((entity: IEntityTranslated) => new StoreActions.LOAD_SUCCESS(entity)),
        catchError(() => of(new StoreActions.LOAD_ERROR(action.originalId)))
      )
    })
  );


  constructor(
    private store: Store<IAppState>,
    private actions$: Actions<StoreActions.Actions>,
    @Inject(DATA_SERVICE) private data: IDataService
  ) {

  }

}
