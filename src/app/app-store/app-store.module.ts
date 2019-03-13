import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreState as TranslateOriginalState } from './trans/translate-original/state';


export interface IAppState {
  TRANSLATE_SOURCE: TranslateOriginalState.State,
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppStoreModule { }
