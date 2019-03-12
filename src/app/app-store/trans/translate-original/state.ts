import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITranslateOriginalEntity } from '../../../types/trans';

export namespace StoreState {
  export const featureName = 'TRANSLATE_ORIGINAL';


  export const featureAdapter: EntityAdapter<ITranslateOriginalEntity> = createEntityAdapter<ITranslateOriginalEntity>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<ITranslateOriginalEntity> {

  }

  export const initialState: State = featureAdapter.getInitialState({});
}
