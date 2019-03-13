import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TranslateOriginal } from './translate-original';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(TranslateOriginal.featureName, TranslateOriginal.reducer),
    EffectsModule.forFeature([TranslateOriginal.effects])
  ]
})
export class TransStoreModule { }
