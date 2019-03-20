import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IEntityOriginalStatus } from '@app/types/trans';

export namespace StatusState {

  export const featureName = 'TRANSLATE_ORIGINAL_STATUS';


  export const featureAdapter: EntityAdapter<IEntityOriginalStatus> = createEntityAdapter<IEntityOriginalStatus>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<IEntityOriginalStatus> {


  }

  export const initialState: State = featureAdapter.getInitialState({ active: null });
}
