import { IAppState } from '@app/app-store/app-store.module';
import { IEntityTranslatedStatus as StatusType, IEntityTranslated as EntityType } from '@app/types/trans';
import { StoreState } from './state';
import { entitySelectors } from '@app-library/store/entity/selectors/factory';
import { IRequestTranslated as RequestType } from '@app-library/store/types';



export const StoreSelectors = entitySelectors<RequestType, EntityType, StatusType>(
  StoreState.featureName,
  StoreState.featureAdapter
)
