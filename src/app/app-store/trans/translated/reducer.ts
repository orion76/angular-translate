import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';

import featureAdapter = StoreState.featureAdapter;

export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;



  switch (action.type) {

    case StoreActions.Types.TRANSLATED_NEW:
      stateNew = featureAdapter.addOne(action.entity, state);
      break;
    case StoreActions.Types.TRANSLATED_LOAD:
      stateNew = state;
      break;
    case StoreActions.Types.TRANSLATED_LOAD_SUCCESS:
      stateNew = featureAdapter.addOne(action.entity, state);
      break;
    case StoreActions.Types.TRANSLATED_LOAD_ERROR:
      stateNew = state;
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
