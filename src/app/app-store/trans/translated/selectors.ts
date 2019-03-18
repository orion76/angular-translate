import { Dictionary } from '@ngrx/entity/src/models';
import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { ELanguage, IEntityProps } from '@app/types/common';
import { ITranslatedEntity, IEntityTranslatedStatus } from '@app/types/trans';
import { IAppState } from '@app/app-store/app-store.module';
import { StoreState } from './state';

import { StoreSelectors as StatusSelectors } from '../translated-status/selectors';
import { ITranslatedState } from '@app/types/trans-state';
import { TranslatedState } from '@app/app-store/trans/states/translated';

// import IFormProps = FormSelectors.IFormProps;

export namespace StoreSelectors {


  import featureAdapter = StoreState.featureAdapter;
  import State = StoreState.State;
  import featureName = StoreState.featureName;

  export interface ITranslatedProps {
    userId: string,
    originalId: string,
    language: ELanguage
  }


  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

  } = featureAdapter.getSelectors();


  export const getEntity = (entities: Dictionary<ITranslatedEntity>, props: IEntityProps): ITranslatedEntity => {
    return props.entityId === undefined && entities[props.entityId] ? entities[props.entityId] : null;
  };



  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export type TTranslatedEntities = MemoizedSelector<IAppState, Dictionary<ITranslatedEntity>>;
  export const TranslatedEntities: TTranslatedEntities = createSelector(selectFeatureState, selectEntities);

  export type TTranslatedEntity = MemoizedSelectorWithProps<IAppState, IEntityProps, ITranslatedEntity>;
  export const Entity: TTranslatedEntity = createSelector(TranslatedEntities, getEntity);

  export type TTranslatedState = MemoizedSelectorWithProps<IAppState, IEntityProps, ITranslatedState>;
  export const State: TTranslatedEntity = createSelector(
    Entity,
    StatusSelectors.Entities,
    (entity: ITranslatedEntity, statuses: Dictionary<IEntityTranslatedStatus>) => {
      const statusState = StatusSelectors.getEntity(statuses, entity)
      return new TranslatedState(entity, statusState.status)
    }
  );


}

