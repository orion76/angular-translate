import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { StoreState } from './state';
import { UserEffects } from './effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreState.featureName, reducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: []
})
export class StoreUserModule {
}
