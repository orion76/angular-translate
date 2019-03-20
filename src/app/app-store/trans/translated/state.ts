import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITranslateEntity, ITranslateEntityTranslated } from '@app/types';

export namespace StoreState {
  export const featureName = 'TRANSLATE_TRANSLATED';


  export const featureAdapter: EntityAdapter<ITranslateEntityTranslated> = createEntityAdapter<ITranslateEntityTranslated>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<ITranslateEntityTranslated> {

  }

  export const initialState: State = featureAdapter.getInitialState({});
}
