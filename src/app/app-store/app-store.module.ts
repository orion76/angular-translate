import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSourceState } from './trans/translate-source/state';


export interface IAppState {
  TRANSLATE_SOURCE: TranslateSourceState.State,
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppStoreModule { }
