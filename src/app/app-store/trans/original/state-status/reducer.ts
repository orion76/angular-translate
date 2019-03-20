import { StatusState } from './state';

import initialState = StatusState.initialState;
import State = StatusState.State;
import { StoreActions, EOriginalStatus } from './actions';

import featureAdapter = StatusState.featureAdapter;
import { EnumFlagged } from '@app-lib/enum-flagged';
import { StatusSelectors } from './selectors';


function statusAdd(state: State, action: StoreActions.Actions) {
  const oldstatus = StatusSelectors.getOriginal(state.entities, action).status;
  const status = (action as StoreActions.statusAdd).status;
  return featureAdapter.updateOne({
    id: action.entityId,
    changes: {
      status: (oldstatus.add(status)) as EnumFlagged<EOriginalStatus>
    }
  }, state);
}

function statusReplace(state: State, action: StoreActions.Actions) {
  const oldstatus = StatusSelectors.getOriginal(state.entities, action).status;
  const { statusOld, statusNew } = (action as StoreActions.statusReplace);
  return featureAdapter.updateOne({
    id: action.entityId,
    changes: {
      status: (oldstatus.replace(statusOld, statusNew)) as EnumFlagged<EOriginalStatus>
    }
  }, state);
}


export function reducerStatus(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;
  switch (action.type) {
    case StoreActions.Types.ORIGINAL_ADD:
      stateNew = featureAdapter.addOne({
        entityId: action.entityId,
        status: new EnumFlagged(EOriginalStatus.ORIGINAL_NEW)
      }, state);
      break;

    case StoreActions.Types.STATUS_ADD:
      stateNew = statusAdd(state, action);
      break;

    case StoreActions.Types.STATUS_REPLACE:
      stateNew = statusReplace(state, action);
      break;

    default:
      stateNew = state;
  }
  return stateNew;
}
