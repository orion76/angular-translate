import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IEntityStates, IState, TEntityStatusList, TStatus} from '@xangular-store/entity/types';
import {ISourceEntityTranslate} from '@app/types';
import * as Immutable from 'immutable';

export namespace StoreState {



  export interface ITranslateStates extends IEntityStates {
    entity: ISourceEntityTranslate;
  }

  export type TTranslateStatusList = TEntityStatusList;

  export type TTranslateStatus = TStatus<TTranslateStatusList>;



  export type IStateTranslate = Immutable.RecordOf<IState<ITranslateStates>>;

  export interface State extends EntityState<IStateTranslate> {
  }


  export const featureName = 'ENTITY_TRANSLATE';
  export const featureAdapter: EntityAdapter<IStateTranslate> = createEntityAdapter<IStateTranslate>({
    selectId: model => model.stateId,
  });
  export const initialState: State = featureAdapter.getInitialState({});
}
