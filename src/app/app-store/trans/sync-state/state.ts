import { ISyncState } from '@app/types/trans';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export namespace StoreState {
  export const featureName = 'TRANSLATE_SYNC_STATE';


  export const featureAdapter: EntityAdapter<ISyncState> = createEntityAdapter<ISyncState>({
    selectId: model => model.originalId,
  });


  export interface State extends EntityState<ISyncState> {

  }

  export const initialState: State = featureAdapter.getInitialState({});
}
