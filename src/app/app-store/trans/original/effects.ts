import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IDataService } from '../../../services/data.service';
import { DATA_SERVICE } from '../../../services/injection-tokens';
import { IAppState } from '../../app-store.module';
import { StoreActions } from './actions';



@Injectable()
export class OriginalEffects {


  @Effect()
  LOAD$ = this.actions$.pipe(
    ofType<StoreActions.LOAD>(StoreActions.Types.ORIGINAL_LOAD),
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
