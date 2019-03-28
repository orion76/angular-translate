import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { StoreState } from "./state";
import { EffectsModule } from '@ngrx/effects';
import { TranslateEffects } from './effects';



@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreState.featureName, reducer),
    EffectsModule.forFeature([TranslateEffects])
  ],
  providers: []
})
export class StoreEntityTranslateModule {
}
