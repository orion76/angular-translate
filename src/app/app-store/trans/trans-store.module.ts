import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreOriginalModule } from '@app/app-store/trans/original/module';
import { StoreSyncStateModule } from '@app/app-store/trans/sync-state/module';
import { StoreTranslatedModule } from '@app/app-store/trans/translated/module';
import { StoreUserModule } from '@app/app-store/trans/user/module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OriginalEffects, reducer as reducerOriginal, StoreState as OriginalState } from './original';
import { reducer as reducerSyncState, StoreState as SuncState } from './sync-state';
import { reducer as reducerTranslated, StoreState as TranslatedState } from './translated';
import { reducer as reducerUser, StoreState as UserState } from './user';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature(OriginalState.featureName, reducerOriginal),
    StoreOriginalModule,
    StoreModule.forFeature(TranslatedState.featureName, reducerTranslated),
    StoreTranslatedModule,


    StoreModule.forFeature(SuncState.featureName, reducerSyncState),
    StoreSyncStateModule,

    StoreModule.forFeature(UserState.featureName, reducerUser),
    StoreUserModule,

    EffectsModule.forFeature([OriginalEffects])
  ]
})
export class TransStoreModule { }
