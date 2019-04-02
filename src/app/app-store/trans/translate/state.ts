


import { IEntityTranslate } from '@app/types';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IEntityStates, IEntityState as _IState } from '@xangular-store/entity/types';






export namespace StoreState {



  export interface IStateData extends IEntityStates {
    entity?: IEntityTranslate;
  }

  export interface IState extends _IState<IStateData> {
    entity?: IEntityTranslate;
  }

  // export interface IState

  export interface State extends EntityState<IState> {
  }


  export const featureName = 'ENTITY_TRANSLATE';
  export const featureAdapter: EntityAdapter<IState> = createEntityAdapter<IState>({
    selectId: model => model.stateId,
  });
  export const initialState: State = featureAdapter.getInitialState({});
}
