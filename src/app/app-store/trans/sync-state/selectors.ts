import { ISyncState } from '@app/types/trans';
import { Dictionary } from '@ngrx/entity/src/models';
import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { IAppState } from '../../app-store.module';
import { StoreState } from './state';
import { IStateProps } from '@app-library/store/types';

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


  export const getEntity = (entities: Dictionary<ISyncState>, props: IStateProps): ISyncState => {
    return entities && entities[props.stateId] ? entities[props.stateId] : null
  };


  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export type TTranslatedEntities = MemoizedSelector<IAppState, Dictionary<ISyncState>>;
  export const TranslatedEntities: TTranslatedEntities = createSelector(selectFeatureState, selectEntities);

  export type TTranslatedEntity = MemoizedSelectorWithProps<IAppState, IStateProps, ISyncState>;
  export const Entity: TTranslatedEntity = createSelector(TranslatedEntities, getEntity);
}

