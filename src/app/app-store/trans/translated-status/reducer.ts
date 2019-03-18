import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions, ETranslatedStatus } from './actions';

import featureAdapter = StoreState.featureAdapter;
import { EnumFlagged } from '../../../library/enum-flagged';
import { StoreSelectors } from './selectors';


function statusAdd(state: State, action: StoreActions.Actions) {
  const oldstatus = StoreSelectors.getEntity(state.entities, action).status;
  const status = (action as StoreActions.statusAdd).status;
  return featureAdapter.updateOne({
    id: action.entityId,
    changes: {
      status: (oldstatus.add(status)) as EnumFlagged<ETranslatedStatus>
    }
  }, state);
}

function statusReplace(state: State, action: StoreActions.Actions) {
  const oldstatus = StoreSelectors.getEntity(state.entities, action).status;
  const { statusOld, statusNew } = (action as StoreActions.statusReplace);
  return featureAdapter.updateOne({
    id: action.entityId,
    changes: {
      status: (oldstatus.replace(statusOld, statusNew)) as EnumFlagged<ETranslatedStatus>
    }
  }, state);
}


export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;



  switch (action.type) {

    case StoreActions.Types.TRANSLATED_ADD:
      stateNew = featureAdapter.addOne({
        entityId: action.entityId,
        status: new EnumFlagged(ETranslatedStatus.NEW)
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
