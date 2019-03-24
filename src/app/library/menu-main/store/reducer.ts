import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';

import featureAdapter = StoreState.featureAdapter;

export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;

  switch (action.type) {

    case StoreActions.Types.ADD:
      stateNew = featureAdapter.addOne(action.state, state);
      break;
    case StoreActions.Types.UPDATE:
      stateNew = featureAdapter.updateOne<State>({
        id: action.menuId,
        changes: { items: action.items }
      }, state);
      break;
    case StoreActions.Types.DELETE:
      stateNew = featureAdapter.removeOne<State>(action.menuId, state);
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
