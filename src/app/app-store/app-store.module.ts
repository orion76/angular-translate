import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreState as Original } from '@app-store/trans/original';
import { StoreState as Translated } from '@app-store/trans/translated';
import { StoreState as SyncState } from '@app-store/trans/sync-state';
import { StoreState as User } from '@app-store/user';

import { TransStoreModule } from '@app-store/trans/trans-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


export interface IAppState {
  TRANSLATE_ORIGINAL: Original.State,
  TRANSLATE_TRANSLATED: Translated.State,
  SYNCS_TATE: SyncState.State,
  USER: User.State,
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    TransStoreModule
  ]
})
export class AppStoreModule { }
