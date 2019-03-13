import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';

import { Dictionary } from '@ngrx/entity/src/models';

import { ITranslateOriginalEntity } from '../../../types/trans';
import { StoreState } from './state';
import { IEntityProps } from '../../../types/common';
import { IAppState } from '../../app-store.module';

// import IFormProps = FormSelectors.IFormProps;

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


  export const getOriginal = (entities: Dictionary<ITranslateOriginalEntity>, props: IEntityProps): ITranslateOriginalEntity => {
    if (props.entityId === undefined || !entities[props.entityId]) {
      // console.warn('getValue', values, props);
      return;
    }
    return entities[props.entityId];
  };


  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export type TOriginalEntities = MemoizedSelector<IAppState, Dictionary<ITranslateOriginalEntity>>;
  export const OriginalEntities: TOriginalEntities = createSelector(selectFeatureState, selectEntities);

  export type TOriginalEntity = MemoizedSelectorWithProps<IAppState, IEntityProps, ITranslateOriginalEntity>;
  export const OriginalEntity: TOriginalEntity = createSelector(OriginalEntities, getOriginal);


}

