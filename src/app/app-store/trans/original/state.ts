import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IOriginalEntity } from '../../../types/trans';

export namespace StoreState {
  export const featureName = 'TRANSLATE_ORIGINAL';


  export const featureAdapter: EntityAdapter<IOriginalEntity> = createEntityAdapter<IOriginalEntity>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<IOriginalEntity> {

  }

  export const initialState: State = featureAdapter.getInitialState({});
}
