import { EntityStore } from '@app-lib/store/entity';
import { IAppState } from '@app/app-store/app-store.module';
import { IEntityTranslatedStatus as StatusType, ITranslateEntityTranslated as EntityType } from '@app/types/trans';
import { StoreState } from './state';


export const StoreSelectors = EntityStore.createSelectors<IAppState, EntityType, StatusType>(
  StoreState.featureName,
  StoreState.featureAdapter
)
