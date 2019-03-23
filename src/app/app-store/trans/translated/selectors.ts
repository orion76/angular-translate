import { entitySelectors } from '@app-library/store/entity/selectors/factory';
import { IRequestTranslated as RequestType } from '@app-library/store/types';
import { IEntityTranslated as EntityType, ITranslatedStatus as StatusType } from '@app/types/trans';
import { StoreState } from './state';



export const StoreSelectors = entitySelectors<RequestType, EntityType, StatusType>(
  StoreState.featureName,
  StoreState.featureAdapter
)
