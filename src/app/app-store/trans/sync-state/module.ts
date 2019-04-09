import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { StoreState } from './state';
import { SyncStateStoreEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreState.featureName, reducer),
    EffectsModule.forFeature([SyncStateStoreEffects])
  ],
  providers: []
})
export class StoreSyncStateModule {
}
