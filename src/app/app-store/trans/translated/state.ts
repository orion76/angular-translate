import { IStateTranslated } from '@app-library/store/types';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';




export namespace StoreState {


  export interface State extends EntityState<IStateTranslated> { }


  export const featureName = 'TRANSLATE_ORIGINAL';
  export const featureAdapter: EntityAdapter<IStateTranslated> = createEntityAdapter<IStateTranslated>({
    selectId: model => model.stateId,
  });
  export const initialState: State = featureAdapter.getInitialState();
}
