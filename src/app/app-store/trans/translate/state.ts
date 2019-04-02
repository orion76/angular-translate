


import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IEntityStates, IEntityStatus, IState } from '@xangular-store/entity/types';
import { IEntityTranslate } from '@app/types';


export namespace StoreState {



export interface ITranslateStates extends IEntityStates{
  entity:IEntityTranslate
}
export interface ITranslateStatus extends IEntityStatus{}

  export interface IStateEntity extends IState<ITranslateStates, ITranslateStatus> {

  }

  export interface State extends EntityState<IStateEntity> {
  }


  export const featureName = 'ENTITY_TRANSLATE';
  export const featureAdapter: EntityAdapter<IStateEntity> = createEntityAdapter<IStateEntity>({
    selectId: model => model.stateId,
  });
  export const initialState: State = featureAdapter.getInitialState({});
}
