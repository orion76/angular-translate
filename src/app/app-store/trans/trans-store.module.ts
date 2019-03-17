import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { Original } from './original';
import { OriginalStatus } from './original-status';
import { EffectsModule } from '@ngrx/effects';
import { reducer as reducerTranslated, StoreState as TranslatedState } from './translated';
import { reducer as reducerTranslatedStatus, StoreState as TranslatedStatusState } from './translated-status'

import { reducer as reducerSyncState, StoreState as SuncState } from './sync-state';

import { reducer as reducerUser, StoreState as UserState } from './user';
import { reducer as reducerUserStatus, StoreState as UserStatusState } from './user-status';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature(Original.featureName, Original.reducer),
    StoreModule.forFeature(TranslatedState.featureName, reducerTranslated),

    StoreModule.forFeature(OriginalStatus.featureName, OriginalStatus.reducer),
    StoreModule.forFeature(TranslatedStatusState.featureName, reducerTranslatedStatus),

    StoreModule.forFeature(SuncState.featureName, reducerSyncState),


    StoreModule.forFeature(UserState.featureName, reducerUser),
    StoreModule.forFeature(UserStatusState.featureName, reducerUserStatus),

    EffectsModule.forFeature([Original.effects])
  ]
})
export class TransStoreModule { }
