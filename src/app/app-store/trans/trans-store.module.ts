import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer as reducerOriginal, StoreState as OriginalState, OriginalEffects } from './original';
import { reducer as reducerOriginalStatus, StoreState as OriginalStatusState } from './original-status';
import { EffectsModule } from '@ngrx/effects';
import { reducer as reducerTranslated, StoreState as TranslatedState } from './translated';
import { reducer as reducerTranslatedStatus, StoreState as TranslatedStatusState } from './translated-status'

import { reducer as reducerSyncState, StoreState as SuncState } from './sync-state';

import { reducer as reducerUser, StoreState as UserState } from './user';
import { reducer as reducerUserStatus, StoreState as UserStatusState } from './user-status';
import { StoreOriginalModule } from '@app/app-store/trans/original/module';
import { StoreTranslatedModule } from '@app/app-store/trans/translated/module';
import { StoreOriginalStatusModule } from '@app/app-store/trans/original-status/module';
import { StoreTranslatedStatusModule } from '@app/app-store/trans/translated-status/module';
import { StoreSyncStateModule } from '@app/app-store/trans/sync-state/module';
import { StoreUserModule } from '@app/app-store/trans/user/module';
import { StoreUserStatusModule } from '@app/app-store/trans/user-status/module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature(OriginalState.featureName, reducerOriginal),
    StoreOriginalModule,
    StoreModule.forFeature(TranslatedState.featureName, reducerTranslated),
    StoreTranslatedModule,

    StoreModule.forFeature(OriginalStatusState.featureName, reducerOriginalStatus),
    StoreOriginalStatusModule,
    StoreModule.forFeature(TranslatedStatusState.featureName, reducerTranslatedStatus),
    StoreTranslatedStatusModule,

    StoreModule.forFeature(SuncState.featureName, reducerSyncState),
    StoreSyncStateModule,

    StoreModule.forFeature(UserState.featureName, reducerUser),
    StoreUserModule,
    StoreModule.forFeature(UserStatusState.featureName, reducerUserStatus),
    StoreUserStatusModule,

    EffectsModule.forFeature([OriginalEffects])
  ]
})
export class TransStoreModule { }
