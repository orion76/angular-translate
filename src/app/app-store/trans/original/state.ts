


import { IEntityTranslate } from '@app/types';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { IEntityRequest, IEntityStatus, IStateEntity } from '@xangular-store/entity/types';





export namespace StoreState {

  export interface IEntityState extends IStateEntity<IEntityTranslate> {

  }

  export interface State extends EntityState<IEntityState> {
    requests: Dictionary<IEntityRequest>,
    stasuses: Dictionary<IEntityStatus>
  }


  export const featureName = 'TRANSLATE_ORIGINAL';
  export const featureAdapter: EntityAdapter<IEntityState> = createEntityAdapter<IEntityState>({
    selectId: model => model.entityId,
  });
  export const initialState: State = featureAdapter.getInitialState({
    requests: {},
    stasuses: {}
  });
}
