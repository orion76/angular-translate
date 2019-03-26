import { entitySelectors } from '@app-library/store/entity/selectors/factory';
import { IRequestTranslated as RequestType, IEntityStatus } from '@app-library/store/types';
import { IEntityTranslate } from '@app/types/trans';
import { StoreState } from './state';



export const StoreSelectors = entitySelectors<RequestType, IEntityTranslate, IEntityStatus>(
  StoreState.featureName,
  StoreState.featureAdapter
)
