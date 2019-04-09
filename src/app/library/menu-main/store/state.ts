import {IMenuState} from '@app-library/menu-main/store/types';
import {createEntityAdapter, Dictionary, EntityAdapter, EntityState} from '@ngrx/entity';
import {IMenuItem} from '@app-library/menu-main/types';


export namespace StoreState {
  export const featureName = 'MENU_MAIN';


  export const featureAdapter: EntityAdapter<IMenuState> = createEntityAdapter<IMenuState>({
    selectId: model => [model.menuName, ...model.path, model.id].join('-'),
  });


  export interface State extends EntityState<IMenuState> {
    items: Dictionary<IMenuItem>;
  }

  export const initialState: State = featureAdapter.getInitialState({ items: {} });
}
