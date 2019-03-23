
// import IFormProps = FormSelectors.IFormProps;
import { entitySelectors } from '@app-library/store/entity/selectors/factory';
import { IRequestOriginal as RequestType } from '@app-library/store/types';
import { IEntityOriginal as EntityType, IOriginalStatus as StatusType } from '@app/types/trans';
import { StoreState } from './state';


export const StoreSelectors = entitySelectors<RequestType, EntityType, StatusType>(
  StoreState.featureName,
  StoreState.featureAdapter
)
