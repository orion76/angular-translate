import {StoreState} from './state';
import {StoreActions} from './actions';
import {EntityState} from '@ngrx/entity';
import {StateRecord} from '@xangular-store/entity/types';
import initialState = StoreState.initialState;
import State = StoreState.State;

import featureAdapter = StoreState.featureAdapter;
import TStateConfig = StoreState.TStateConfig;


const add = (action: StoreActions.Add, state: EntityState<TStateConfig>): EntityState<TStateConfig> => {
  const {stateId, config} = action;
  const stateNew: TStateConfig = new StateRecord({stateId, data: {config}, status: {ADDED: true}});
  return featureAdapter.addOne(stateNew, state);
};


export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;

  switch (action.type) {

    case StoreActions.Types.ADD:
      stateNew = add(action, state);
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
