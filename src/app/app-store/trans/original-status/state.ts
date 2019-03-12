import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IEntityOriginalStatus } from '../../../types/trans';

export namespace StoreState {

  export const featureName = 'TRANSLATE_ORIGINAL_STATUS';


  export const featureAdapter: EntityAdapter<IEntityOriginalStatus> = createEntityAdapter<IEntityOriginalStatus>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<IEntityOriginalStatus> {
    active: string;


  }

  export const initialState: State = featureAdapter.getInitialState({ active: null });
}
