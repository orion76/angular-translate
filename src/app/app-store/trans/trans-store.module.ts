import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { Original } from './original';
import { OriginalStatus } from './original-status';
import { Translated } from './translated';
import { TranslatedStatus } from './translated-status';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature(Original.featureName, Original.reducer),
    StoreModule.forFeature(Translated.featureName, Translated.reducer),

    StoreModule.forFeature(OriginalStatus.featureName, OriginalStatus.reducer),
    StoreModule.forFeature(TranslatedStatus.featureName, TranslatedStatus.reducer),

    EffectsModule.forFeature([Original.effects])
  ]
})
export class TransStoreModule { }
