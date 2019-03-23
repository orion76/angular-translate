import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';
import { IUser } from '@app/types';

function REQUEST(state: State, entityId: string): State {
  const newState = { ...state };
  newState.entity.entityId = entityId;
  newState.status.REQUEST = true;

  return newState
}

function LOGIN(state: State, entity: IUser): State {
  const newState = { ...state };

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

  switch (action.type) {

    case StoreActions.Types.REQUEST:
      stateNew = REQUEST(state, action.request)
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
