
// import IFormProps = FormSelectors.IFormProps;
import { entitySelectors } from '@app-library/store/entity/selectors/factory';
import { IEntityRequest, IEntityStatus } from '@app-library/store/types';
import { IEntityTranslate } from '@app/types/trans';
import { StoreState } from './state';


export const StoreSelectors = entitySelectors<IEntityRequest, IEntityTranslate, IEntityStatus>(
  StoreState.featureName,
  StoreState.featureAdapter
)
