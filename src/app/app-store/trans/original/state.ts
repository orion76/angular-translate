import { IEntityState } from '@app-lib/store/entity';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IOriginalEntity as EntityType, IEntityOriginalStatus as StatusType } from '../../../types/trans';



export namespace StoreState {
  export const featureName = 'TRANSLATE_ORIGINAL';
  export const featureAdapter: EntityAdapter<EntityType> = createEntityAdapter<EntityType>({
    selectId: model => model.entityId,
  });
  export const initialState: IEntityState<EntityType, StatusType> = featureAdapter.getInitialState({ statuses: {} });
  export interface State extends IEntityState<EntityType, StatusType> { }
}
