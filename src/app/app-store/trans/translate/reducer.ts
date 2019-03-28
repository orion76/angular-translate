import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';

import featureAdapter = StoreState.featureAdapter;
import { EntityReducer } from '@xangular-store/entity/reducer';

const { addRequest, load, loadSuccess, loadError } = EntityReducer.createHandlers(featureAdapter)


function setParent(action: StoreActions.SET_PARENT, state: State) {

  const { stateId, parent } = action;
  const entityState = state.entities[stateId];
  const status = { ...entityState.status, SET_PARENT: true };

  return featureAdapter.updateOne({ id: stateId, changes: { status, parent } }, state);
}



export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;

  switch (action.type) {

    case StoreActions.Types.REQUEST:
      stateNew = addRequest(action, state);
      break;
    case StoreActions.Types.LOAD:
      stateNew = load(action, state);
      break;
    case StoreActions.Types.LOAD_SUCCESS:
      stateNew = loadSuccess(action, state);
      break;
    case StoreActions.Types.LOAD_ERROR:
      stateNew = loadError(action, state);
      break;

    case StoreActions.Types.SET_PARENT:
      stateNew = setParent(action, state);
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
