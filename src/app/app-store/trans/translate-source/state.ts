import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITranslateSourceEntity } from '../../../types/trans';

export namespace TranslateSourceState {
  export const featureName = 'TRANSLATE_SOURCE';


  export const featureAdapter: EntityAdapter<ITranslateSourceEntity> = createEntityAdapter<ITranslateSourceEntity>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<ITranslateSourceEntity> {

  }

  export const initialState: State = featureAdapter.getInitialState({});
}
