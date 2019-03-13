import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreState as OriginalState } from './trans/original/state';
import { StoreState as OriginalStatusState } from './trans/original-status/state';
import { StoreState as TranslatedState } from './trans/translated/state';
import { StoreState as TranslatedStatusState } from './trans/translated-status/state';


export interface IAppState {
  TRANSLATE_ORIGINAL: OriginalState.State,
  TRANSLATE_ORIGINAL_STATUS: OriginalStatusState.State,
  TRANSLATE_TRANSLATED: TranslatedState.State,
  TRANSLATE_TRANSLATED_STATUS: TranslatedStatusState.State,
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppStoreModule { }
