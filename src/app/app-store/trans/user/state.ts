import { IEntityState } from '@app-lib/store/entity';
import { IUser as EntityType, IUserStatus as StatusType } from '@app/types';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';


export namespace StoreState {
  export const featureName = 'USER';
  export const featureAdapter: EntityAdapter<EntityType> = createEntityAdapter<EntityType>({
    selectId: model => model.entityId,
  });
  export const initialState: IEntityState<EntityType, StatusType> = featureAdapter.getInitialState({ statuses: {} });
  export interface State extends IEntityState<EntityType, StatusType> { }
}
