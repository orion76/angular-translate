import { TranslateSourceState } from './state';

import initialState = TranslateSourceState.initialState;
import State = TranslateSourceState.State;
import { StoreActions } from './actions';
import { featureAdapter } from '../translate-status/state';


export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;



  switch (action.type) {

    case StoreActions.Types.NEW_SOURCE:
      stateNew = featureAdapter.addOne(action.entity, state);
      break;
    case StoreActions.Types.LOAD_SOURCE:
      stateNew = state;
      break;
    case StoreActions.Types.LOAD_SOURCE_SUCCESS:
      stateNew = featureAdapter.addOne(action.entity, state);
      break;
    case StoreActions.Types.LOAD_SOURCE_ERROR:
      stateNew = state;
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
