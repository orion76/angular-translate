import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';

import { Dictionary } from '@ngrx/entity/src/models';

import { IEntityProps, IEntityOriginalStatus } from '@app/types';
import { StatusState } from './state';
import { IAppState } from '@app/app-store/app-store.module';


export namespace StatusSelectors {


  import featureAdapter = StatusState.featureAdapter;
  import State = StatusState.State;
  import featureName = StatusState.featureName;

  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

  } = featureAdapter.getSelectors();


  export const getOriginal = (entities: Dictionary<IEntityOriginalStatus>, props: IEntityProps): IEntityOriginalStatus => {
    if (props.entityId === undefined || !entities[props.entityId]) {
      // console.warn('getValue', values, props);
      return;
    }
    return entities[props.entityId];
  };


  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export type TEntities = MemoizedSelector<IAppState, Dictionary<IEntityOriginalStatus>>;
  export const Entities: TEntities = createSelector(selectFeatureState, selectEntities);

  export type TEntity = MemoizedSelectorWithProps<IAppState, IEntityProps, IEntityOriginalStatus>;
  export const Entity: TEntity = createSelector(Entities, getOriginal);


}

