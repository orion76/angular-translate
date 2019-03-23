

import { IStateOriginal } from '@app-library/store/types';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';





export namespace StoreState {


  export interface State extends EntityState<IStateOriginal> { }


  export const featureName = 'TRANSLATE_ORIGINAL';
  export const featureAdapter: EntityAdapter<IStateOriginal> = createEntityAdapter<IStateOriginal>({
    selectId: model => model.stateId,
  });
  export const initialState: State = featureAdapter.getInitialState();
}
