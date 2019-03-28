import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreSyncStateModule } from '@app/app-store/trans/sync-state/module';
import { StoreEntityTranslateModule } from '@app/app-store/trans/translate/module';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer as reducerTranslate, StoreState as TranslateState } from './translate';
import { reducer as reducerSyncState, StoreState as SuncState } from './sync-state';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature(TranslateState.featureName, reducerTranslate),
    StoreEntityTranslateModule,


    StoreModule.forFeature(SuncState.featureName, reducerSyncState),
    StoreSyncStateModule,


  ]
})
export class TransStoreModule { }
