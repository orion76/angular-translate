import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreState as Original } from './trans/original/state';
import { StoreState as OriginalStatus } from './trans/original-status/state';
import { StoreState as Translated } from './trans/translated/state';
import { StoreState as TranslatedStatus } from './trans/translated-status/state';
import { StoreState as SyncState } from './trans/sync-state';
import { StoreState as User } from './trans/user';
import { StoreState as UserStatus } from './trans/user-status';
import { TransStoreModule } from '@app/app-store/trans/trans-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


export interface IAppState {
  TRANSLATE_ORIGINAL: Original.State,
  TRANSLATE_ORIGINAL_STATUS: OriginalStatus.State,
  TRANSLATE_TRANSLATED: Translated.State,
  TRANSLATE_TRANSLATED_STATUS: TranslatedStatus.State,
  SYNCS_TATE: SyncState.State,
  USER: User.State,
  USER_STATUS: UserStatus.State

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
