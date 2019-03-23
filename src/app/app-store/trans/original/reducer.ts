import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';

import featureAdapter = StoreState.featureAdapter;
import { IEntity } from '@app-types/common';
import { EEntityType, IEntityOriginal } from '@app/types';

export function addEntity(action: StoreActions.ADD, state: State): State {

  const entity: IEntityOriginal = {
    entityId: action.request.originalId,
    type: EEntityType.original
  }

  return featureAdapter.addOne(entity, state);
}

export function loadSuccess(action: StoreActions.LOAD_SUCCESS, state: State): State {

  const entity: IEntityOriginal = {
    entityId: action.ids.originalId,
    type: EEntityType.original
  }

  return featureAdapter.addOne(entity, state);
}


export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;



  switch (action.type) {

    case StoreActions.Types.ADD:
      stateNew = addEntity(action, state);
      break;
    case StoreActions.Types.LOAD:
      stateNew = state;
      break;
    case StoreActions.Types.LOAD_SUCCESS:
      stateNew = featureAdapter.addOne(action.entity, state);
      break;
    case StoreActions.Types.LOAD_ERROR:
      stateNew = state;
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
