import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITranslateEntity, IEntityTranslated } from '@app/types';

export namespace StoreState {
  export const featureName = 'TRANSLATE_TRANSLATED';


  export const featureAdapter: EntityAdapter<IEntityTranslated> = createEntityAdapter<IEntityTranslated>({
    selectId: model => model.entityId,
  });


  export interface State extends EntityState<IEntityTranslated> {

  }

  export const initialState: State = featureAdapter.getInitialState({});
}
