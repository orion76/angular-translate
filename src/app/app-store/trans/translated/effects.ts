import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { DATA_SERVICE } from '../../../services/injection-tokens';
import { IDataService } from '../../../services/data.service';
import { StoreActions } from './actions';
import { ESources, ITranslatedEntity } from '../../../types/trans';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app-store.module';


@Injectable()
export class TranslateOriginalEffects {


  @Effect()
  loadOriginal$ = this.actions$.pipe(
    ofType<StoreActions.translatedFind>(StoreActions.Types.TRANSLATED_FIND),
    switchMap((action: StoreActions.translatedFind) => {
      return this.data.getItem(ESources.SOURCE, action.originalId).pipe(
        map((entity: ITranslatedEntity) => new StoreActions.translatedLoadSuccess(entity)),
        catchError(() => of(new StoreActions.translatedLoadError(action.originalId)))
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
