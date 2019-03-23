
// import IFormProps = FormSelectors.IFormProps;
import { IEntityOriginalStatus as StatusType, IEntityOriginal as EntityType } from '@app/types/trans';
import { IAppState } from '@app/app-store/app-store.module';
import { StoreState } from './state';
import { IEntitySelectors } from '@app-library/store/entity/selectors/types';
import { entitySelectors } from '@app-library/store/entity/selectors/factory';


export const StoreSelectors = entitySelectors<EntityType, StatusType>(
  StoreState.featureName,
  StoreState.featureAdapter
)
