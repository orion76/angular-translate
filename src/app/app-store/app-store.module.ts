import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreState as Original } from './trans/original/state';

import { StoreState as Translated } from './trans/translated/state';

import { StoreState as SyncState } from './trans/sync-state';
import { StoreState as User } from './trans/user';

import { TransStoreModule } from '@app/app-store/trans/trans-store.module';
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
