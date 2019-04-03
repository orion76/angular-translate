


import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IEntityStates, IState, TEntityStatusList, TStatus } from '@xangular-store/entity/types';
import { IEntityTranslate } from '@app/types';
import * as Immutable from 'immutable';

export namespace StoreState {



  export interface ITranslateStates extends IEntityStates {
    entity: IEntityTranslate
  }

  export type TTranslateStatusList = TEntityStatusList;

  export type TTranslateStatus = TStatus<TTranslateStatusList>;



  export type IStateEntity = Immutable.RecordOf<IState<ITranslateStates>>

  export interface State extends EntityState<IStateEntity> {
  }


  export const featureName = 'ENTITY_TRANSLATE';
  export const featureAdapter: EntityAdapter<IStateEntity> = createEntityAdapter<IStateEntity>({
    selectId: model => model.stateId,
  });
  export const initialState: State = featureAdapter.getInitialState({});
}
