import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { DATA_SERVICE } from '../../../services/injection-tokens';
import { IDataService } from '../../../services/data.service';
import { StoreActions } from './actions';
import { ESources, ITranslateSourceEntity } from '../../../types/trans';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app-store.module';


@Injectable()
export class TranslateSourceEffects {


  @Effect()
  loadTransStates$ = this.actions$.pipe(
    ofType<StoreActions.loadSource>(StoreActions.Types.LOAD_SOURCE),
    switchMap((action: StoreActions.loadSource) => {
      return this.data.getItem(ESources.SOURCE, action.entityId).pipe(
        map((entity: ITranslateSourceEntity) => new StoreActions.loadSourceSuccess(entity)),
        catchError(() => of(new StoreActions.loadSourceError(action.entityId)))
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
