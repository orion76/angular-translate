import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { StoreState } from "./state";
import { StatusState } from "./state-status/state";
import { reducerStatus } from "./state-status/reducer";
import { EffectsModule } from '@ngrx/effects';
import { OriginalEffects } from '@app/app-store/trans/original';
import { OriginalStatusEffects } from '@app/app-store/trans/original/state-status/effects';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreState.featureName, reducer),
    StoreModule.forFeature(StatusState.featureName, reducerStatus),
    EffectsModule.forFeature([OriginalEffects, OriginalStatusEffects])
  ],
  providers: []
})
export class StoreOriginalModule {
}
