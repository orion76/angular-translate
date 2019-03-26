import { IEntityRequest } from '@app-library/store/types';
import { IUser } from '../types';
import { StoreActions } from './actions';
import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;


function LOGIN(state: State): State {
  const newState = { ...state };
  newState.status.LOGOUT = false;
  newState.status.LOGIN = true;
  return newState
}

function LOGOUT(state: State): State {
  const newState = { ...state };
  newState.status.LOGOUT = true;
  newState.status.LOGIN = false;
  return newState
}


function REQUEST(state: State, request: IEntityRequest): State {
  const newState = { ...state };
  newState.request = request;
  newState.status.REQUEST = true;
  return newState
}


function LOAD(state: State): State {

  const newState = { ...state };
  newState.status.LOAD = true;
  return newState
}

function LOAD_SUCCESS(state: State, entity: IUser): State {
  const newState = { ...state };
  newState.entity = entity;
  newState.status.LOAD_SUCCESS = true;
  return newState
}


export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;
  // debugger;

  switch (action.type) {

    case StoreActions.Types.REQUEST:
      stateNew = REQUEST(state, action.request)
      break;

    case StoreActions.Types.LOGIN:
      stateNew = LOGIN(state)
      break;

    case StoreActions.Types.LOGOUT:
      stateNew = LOGOUT(state)
      break;

    case StoreActions.Types.LOAD:
      stateNew = LOAD(state)
      break;
    case StoreActions.Types.LOAD_SUCCESS:
      stateNew = LOAD_SUCCESS(state, action.entity)
      break;
    case StoreActions.Types.LOAD_ERROR:
      stateNew = state;
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
