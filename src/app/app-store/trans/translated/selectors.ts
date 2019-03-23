import { IAppState } from '@app/app-store/app-store.module';
import { IEntityTranslatedStatus as StatusType, IEntityTranslated as EntityType } from '@app/types/trans';
import { StoreState } from './state';
import { entitySelectors } from '@app-library/store/entity/selectors/factory';



export const StoreSelectors = entitySelectors<EntityType, StatusType>(
  StoreState.featureName,
  StoreState.featureAdapter
)
