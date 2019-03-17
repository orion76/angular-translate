import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions, EUserStatus } from './actions';



export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;



  switch (action.type) {

    case StoreActions.Types.LOGIN:
      stateNew = { ...state, status: state.status.add(EUserStatus.LOGGED) };
      break;
    case StoreActions.Types.LOAD:
      stateNew = state;
      break;
    case StoreActions.Types.LOAD_SUCCESS:
      stateNew = { ...state, status: state.status.add(EUserStatus.LOAD_SUCCESS) };
      break;
    case StoreActions.Types.LOAD_ERROR:
      stateNew = { ...state, status: state.status.add(EUserStatus.LOAD_ERROR) };
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
