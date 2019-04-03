
import { EntityReducer } from '@xangular-store/entity/reducerOne';
import { StoreActions } from './actions';
import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import TUserStasuses = StoreState.TUserStasuses;

const { setStatus, create, load, loadSuccess, loadError } = EntityReducer.factoryHandlers();;

function LOGIN(state: State): State {
  return setStatus<TUserStasuses>({ LOGOUT: false, LOGIN: true }, state);
}

function LOGOUT(state: State): State {
  const newState = { ...state };
  newState.status.LOGOUT = true;
  newState.status.LOGIN = false;
  return newState
}



export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;
  // debugger;

  switch (action.type) {

    case StoreActions.Types.REQUEST:
      stateNew = create(action, state)
      break;

    case StoreActions.Types.LOGIN:
      stateNew = LOGIN(state)
      break;

    case StoreActions.Types.LOGOUT:
      stateNew = LOGOUT(state)
      break;

    case StoreActions.Types.LOAD:
      stateNew = load(action, state)
      break;
    case StoreActions.Types.LOAD_SUCCESS:
      stateNew = loadSuccess(action, state);
      break;
    case StoreActions.Types.LOAD_ERROR:
      stateNew = state;
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
