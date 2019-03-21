
// import IFormProps = FormSelectors.IFormProps;
import { IEntityOriginalStatus as StatusType, IEntityOriginal as EntityType } from '@app/types/trans';
import { IAppState } from '@app/app-store/app-store.module';
import { StoreState } from './state';
import { entitySelectors } from '@app-lib/store/entity/selectors/factory';

export const StoreSelectors = entitySelectors<EntityType, StatusType>(
  StoreState.featureName,
  StoreState.featureAdapter
)
