

import { IEntityState } from '@app-library/store/types';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';





export namespace StoreState {


  export interface State extends EntityState<IEntityState> { }


  export const featureName = 'TRANSLATE_ORIGINAL';
  export const featureAdapter: EntityAdapter<IEntityState> = createEntityAdapter<IEntityState>({
    selectId: model => model.stateId,
  });
  export const initialState: State = featureAdapter.getInitialState();
}
