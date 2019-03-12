import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions, EOriginalStatus } from './actions';

import featureAdapter = StoreState.featureAdapter;
import { EnumFlagged } from '../../../library/enum-flagged';

export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;



  switch (action.type) {

    case StoreActions.Types.ORIGINAL_NEW:
      stateNew = featureAdapter.addOne({
        entityId: action.entityId,
        status: new EnumFlagged(EOriginalStatus.ORIGINAL_NEW)
      }, state);
      break;

    case StoreActions.Types.ORIGINAL_LOAD:
      stateNew = featureAdapter.updateOne({
        id: action.entityId,
        changes: { status: new EnumFlagged(EOriginalStatus.ORIGINAL_LOAD_SUCCESS) }

      }, state);
      break;

    case StoreActions.Types.ORIGINAL_LOAD_SUCCESS:
      stateNew = featureAdapter.addOne({
        entityId: action.entityId,
        status: new EnumFlagged(EOriginalStatus.ORIGINAL_LOAD_SUCCESS)
      }, state);
      break;

    case StoreActions.Types.ORIGINAL_LOAD_ERROR:
      stateNew = featureAdapter.addOne({
        entityId: action.entityId,
        status: new EnumFlagged(EOriginalStatus.ORIGINAL_LOAD_ERROR)
      }, state);
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
