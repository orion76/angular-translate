import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IDataService } from '../../../services/data.service';
import { DATA_SERVICE } from '../../../services/injection-tokens';
import { ESources, IOriginalEntity } from '../../../types/trans';
import { IAppState } from '../../app-store.module';
import { EOriginalStatus, StoreActions as StatusActions } from '../original-status/actions';
import { StoreActions } from './actions';



@Injectable()
export class OriginalEffects {


  @Effect()
  originalId$ = this.actions$.pipe(
    ofType<StoreActions.originalId>(StoreActions.Types.ORIGINAL_ID),
    map((action: StoreActions.originalId) => new StoreActions.originalLoad(action.entityId))
  );


  @Effect()
  loadOriginal$ = this.actions$.pipe(
    ofType<StoreActions.originalLoad>(StoreActions.Types.ORIGINAL_LOAD),
    tap((action: StoreActions.originalLoad) => this.store.dispatch(
      new StatusActions.statusSet(action.entityId, EOriginalStatus.ORIGINAL_LOAD))
    ),
    switchMap((action: StoreActions.originalLoad) => {
      return this.data.getItem(ESources.SOURCE, action.entityId).pipe(
        map((entity: IOriginalEntity) => new StoreActions.originalLoadSuccess(entity)),
        catchError(() => of(new StoreActions.originalLoadError(action.entityId))),
      )
    })
  );

  // ,
  constructor(
    private store: Store<IAppState>,
    private actions$: Actions<StoreActions.Actions>,
    @Inject(DATA_SERVICE) private data: IDataService
  ) {

  }

}
