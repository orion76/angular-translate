import { TranslatedState } from '@app/app-store/trans/states/translated';
import { ISyncState } from '@app/types/trans';
import { Dictionary } from '@ngrx/entity/src/models';
import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { ELanguage, IEntityProps } from '../../../types/common';
import { IEntityTranslatedStatus, ITranslatedEntity } from '../../../types/trans';
import { IAppState } from '../../app-store.module';
import { StoreSelectors as StatusSelectors } from '../translated-status/selectors';
import { StoreState } from './state';

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


  export const getEntity = (entities: Dictionary<ISyncState>, props: IEntityProps): ISyncState => {
    return entities && entities[props.entityId] ? entities[props.entityId] : null
  };


  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export type TTranslatedEntities = MemoizedSelector<IAppState, Dictionary<ISyncState>>;
  export const TranslatedEntities: TTranslatedEntities = createSelector(selectFeatureState, selectEntities);

  export type TTranslatedEntity = MemoizedSelectorWithProps<IAppState, IEntityProps, ISyncState>;
  export const Entity: TTranslatedEntity = createSelector(TranslatedEntities, getEntity);
}

