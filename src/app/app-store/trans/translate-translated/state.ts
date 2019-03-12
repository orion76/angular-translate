import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITranslateOriginalEntity, ITranslateTranslatedEntity } from '../../../types/trans';

export namespace StoreState {
  export const featureName = 'TRANSLATE_TRANSLATED';


  export const featureAdapter: EntityAdapter<ITranslateTranslatedEntity> = createEntityAdapter<ITranslateTranslatedEntity>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<ITranslateTranslatedEntity> {

  }

  export const initialState: State = featureAdapter.getInitialState({});
}
