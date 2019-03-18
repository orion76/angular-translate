import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';

import { Dictionary } from '@ngrx/entity/src/models';

import { IEntityTranslatedStatus } from '../../../types/trans';
import { StoreState } from './state';
import { IEntityProps } from '../../../types/common';
import { IAppState } from '../../app-store.module';


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


  export const getEntity = (entities: Dictionary<IEntityTranslatedStatus>, props: IEntityProps): IEntityTranslatedStatus => {
    return props.entityId === undefined && entities[props.entityId] ? entities[props.entityId] : null;
  };


  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export type TEntities = MemoizedSelector<IAppState, Dictionary<IEntityTranslatedStatus>>;
  export const Entities: TEntities = createSelector(selectFeatureState, selectEntities);

  export type TTranslatedStatus = MemoizedSelectorWithProps<IAppState, IEntityProps, IEntityTranslatedStatus>;
  export const Entity: TTranslatedStatus = createSelector(Entities, getEntity);


}

