import {IMenuProps as StateProps, IMenuState as StateType} from '@app-library/menu-main/store/types';
import {IAppState} from '@app-store/app-store.module';
import {Dictionary} from '@ngrx/entity/src/models';
import {createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps} from '@ngrx/store';
import {StoreState} from './state';


// import IFormProps = FormSelectors.IFormProps;

export function DictionaryToArray<T>(dictionary: Dictionary<T>): T[] {
  const array = Object.keys(dictionary).map((key: string) => dictionary[key]);
  return array;
}

export namespace StoreSelectors {


  import featureAdapter = StoreState.featureAdapter;
  import State = StoreState.State;
  import featureName = StoreState.featureName;


  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

  } = featureAdapter.getSelectors();


  export const getEntity = (entities: Dictionary<StateType>, props: StateProps): StateType => {
    return entities && entities[props.menuId] ? entities[props.menuId] : null;
  };


  export const getMenu = (entities: Dictionary<StateType>): StateType[] => {
    return DictionaryToArray<StateType>(entities);
  };

  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export type TEntities = MemoizedSelector<IAppState, Dictionary<StateType>>;
  export const entities: TEntities = createSelector(selectFeatureState, selectEntities);

  export type TEntity = MemoizedSelectorWithProps<IAppState, StateProps, StateType>;
  export const entity: TEntity = createSelector(entities, getEntity);

  export type TMenu = MemoizedSelector<IAppState, StateType[]>;
  export const menu: TMenu = createSelector(entities, getMenu);

}

