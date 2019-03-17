import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, mergeMap, mergeMapTo, concatMap, mapTo, concatAll, tap } from 'rxjs/operators';
import { of, concat, merge } from 'rxjs';

import { DATA_SERVICE } from '../../../services/injection-tokens';
import { IDataService } from '../../../services/data.service';
import { StoreActions } from './actions';
import { ESources, IOriginalEntity } from '../../../types/trans';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app-store.module';
import { StoreActions as StatusActions, EOriginalStatus } from '../original-status/actions';

@Injectable()
export class TranslateOriginalEffects {


  constructor(
    private store: Store<IAppState>,
    private actions$: Actions<StoreActions.Actions>,
  ) { }

}
