import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';

import { Dictionary } from '@ngrx/entity/src/models';

import { ITranslateOriginalEntity, ITranslateTranslatedEntity } from '../../../types/trans';
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


  export const getOranslated = (entities: Dictionary<ITranslateTranslatedEntity>, props: IEntityProps): ITranslateTranslatedEntity => {
    if (props.entityId === undefined || !entities[props.entityId]) {
      // console.warn('getValue', values, props);
      return;
    }
    return entities[props.entityId];
  };


  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export type TTranslatedEntities = MemoizedSelector<IAppState, Dictionary<ITranslateTranslatedEntity>>;
  export const TranslatedEntities: TTranslatedEntities = createSelector(selectFeatureState, selectEntities);

  export type TTranslatedEntity = MemoizedSelectorWithProps<IAppState, IEntityProps, ITranslateTranslatedEntity>;
  export const TranslatedEntity: TTranslatedEntity = createSelector(TranslatedEntities, getOranslated);


}

