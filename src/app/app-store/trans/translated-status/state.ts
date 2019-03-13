import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IEntityTranslatedStatus } from '../../../types/trans';

export namespace StoreState {

  export const featureName = 'TRANSLATE_ORIGINAL_STATUS';


  export const featureAdapter: EntityAdapter<IEntityTranslatedStatus> = createEntityAdapter<IEntityTranslatedStatus>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<IEntityTranslatedStatus> {


  }

  export const initialState: State = featureAdapter.getInitialState({ active: null });
}
