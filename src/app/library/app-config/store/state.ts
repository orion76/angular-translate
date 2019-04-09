import {ISourceConfig} from '@app-library/app-config';
import {IEntityStates, IState, IStateEntity, TStatus} from '@xangular-store/entity/types';
import * as Immutable from 'immutable';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';


export namespace StoreState {
  export const featureName = 'SOURCE_CONFIG';


  export interface IConfigStates extends IEntityStates {
    config?: ISourceConfig<any>;
  }

  export type TConfigStatusList = 'ADDED' ;

  export type TConfigStatus = TStatus<TConfigStatusList>;

  export type TStateConfig = Immutable.RecordOf<IState<IConfigStates>>;


  export type State = EntityState<TStateConfig>;


  export const featureAdapter: EntityAdapter<TStateConfig> = createEntityAdapter<TStateConfig>({
    selectId: model => model.stateId,
  });
  export const initialState: State = featureAdapter.getInitialState({});

}
