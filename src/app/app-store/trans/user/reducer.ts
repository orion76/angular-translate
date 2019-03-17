import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';


export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;

  switch (action.type) {

    case StoreActions.Types.LOGIN:
      stateNew = { ...state };
      break;
    case StoreActions.Types.LOAD:
      stateNew = state;
      break;
    case StoreActions.Types.LOAD_SUCCESS:
      stateNew = { ...state };
      break;
    case StoreActions.Types.LOAD_ERROR:
      stateNew = state;
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
