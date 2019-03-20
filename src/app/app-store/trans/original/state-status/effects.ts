import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/app-store/app-store.module';
import { StoreActions } from './actions';




@Injectable()
export class OriginalStatusEffects {

  constructor(
    private store: Store<IAppState>,
    private actions$: Actions<StoreActions.Actions>,
  ) { }
}
