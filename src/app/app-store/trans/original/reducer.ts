import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';

import featureAdapter = StoreState.featureAdapter;
import { EntityReducer } from '@app-library/store/entity/reduce';

export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;

  switch (action.type) {

    case StoreActions.Types.REQUEST:
      stateNew = EntityReducer.addRequest(featureAdapter, action, state);
      break;
    case StoreActions.Types.LOAD:
      stateNew = EntityReducer.load(featureAdapter, action, state);;
      break;
    case StoreActions.Types.LOAD_SUCCESS:
      stateNew = EntityReducer.loadSuccess(featureAdapter, action, state);;
      break;
    case StoreActions.Types.LOAD_ERROR:
      stateNew = EntityReducer.loadError(featureAdapter, action, state);;
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
