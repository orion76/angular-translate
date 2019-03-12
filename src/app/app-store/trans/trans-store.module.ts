import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TranslateSource } from './translate-source';
import { EffectsModule } from '@ngrx/effects';
import { TranslateSourceEffects } from './translate-source/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(TranslateSource.featureName, TranslateSource.reducer),
    EffectsModule.forFeature([TranslateSourceEffects])
  ]
})
export class TransStoreModule { }
