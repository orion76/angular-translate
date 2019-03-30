import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';

import featureAdapter = StoreState.featureAdapter;
import { IMenuState } from '@app-library/menu-main/store/types';


function clone(items: IMenuState[]) {
  return items.map((item: IMenuState) => ({ ...item }))
}

export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;

  switch (action.type) {

    case StoreActions.Types.ADD:
    case StoreActions.Types.UPDATE:
      stateNew = featureAdapter.upsertMany(clone(action.items), state);
      break;
    case StoreActions.Types.DELETE:
      const keys: string[] = action.items.map((item: IMenuState) => [item.place, ...item.path, item.id].join('-'))
      stateNew = featureAdapter.removeMany<State>(keys, state);
      break;
    default:
      stateNew = state;
  }
  return stateNew;
}
