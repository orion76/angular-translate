import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { StoreState } from "./state";
import { TranslatedStoreEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreState.featureName, reducer),
    EffectsModule.forFeature([TranslatedStoreEffects])
  ],
  providers: []
})
export class StoreTranslatedModule {
}
