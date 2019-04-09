import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';

import featureAdapter = StoreState.featureAdapter;
import { EntityReducer } from '@xangular-store/entity/reducerMany';



const { add, load, loadSuccess, loadError } = EntityReducer.factoryHandlers(featureAdapter);


function setParent(action: StoreActions.SetParent, state: State) {

  const { stateId, parent } = action;
  const entityState = state.entities[stateId];
  const status = { ...entityState.status, SET_PARENT: true };

  return featureAdapter.updateOne({ id: stateId, changes: { status, parent } }, state);
}



export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;

  switch (action.type) {

    case StoreActions.Types.ADD_REQUEST:
      stateNew = add(action, state);
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
