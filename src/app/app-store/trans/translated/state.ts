import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITranslatedEntity } from '../../../types/trans';

export namespace StoreState {
  export const featureName = 'TRANSLATE_TRANSLATED';


  export const featureAdapter: EntityAdapter<ITranslatedEntity> = createEntityAdapter<ITranslatedEntity>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<ITranslatedEntity> {

  }

  export const initialState: State = featureAdapter.getInitialState({});
}
