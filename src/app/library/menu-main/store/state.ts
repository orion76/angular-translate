import { IMenuState } from '@app-library/menu-main/store/types';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { MenuItem } from 'primeng/components/common/menuitem';



export namespace StoreState {
  export const featureName = 'MENU_MAIN';


  export const featureAdapter: EntityAdapter<IMenuState> = createEntityAdapter<IMenuState>({
    selectId: model => [model.place, ...model.path, model.id].join('-'),
  });


  export interface State extends EntityState<IMenuState> {
    items: Dictionary<MenuItem>
  }

  export const initialState: State = featureAdapter.getInitialState({ items: {} });
}
