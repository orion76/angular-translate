import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { StoreState } from "./state";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreState.featureName, reducer),
  ],
  providers: []
})
export class StoreTranslatedStatusModule {
}
