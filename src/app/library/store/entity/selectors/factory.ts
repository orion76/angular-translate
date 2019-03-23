import { EntitySelectors } from './selectors';
import { IEntityState } from '@app-library/store/types';
import { IAppState } from '@app/app-store/app-store.module';
import { EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getEntity, getEntityStatus, getState, getStatus, getRequest } from './getters';
import { ICollectionSelectors, IEntitySelector, IEntitySelectors, ISelectFeatureState, IStateSelector, IStatusSelector, IRequestSelector } from './types';




export function collectionsSelectors(featureName: keyof IAppState, featureAdapter: EntityAdapter<IEntityState>): ICollectionSelectors {

  const { selectEntities } = featureAdapter.getSelectors();

  const feature: ISelectFeatureState = createFeatureSelector<IAppState, EntityState<IEntityState>>(featureName);

  const entities = createSelector(feature, selectEntities);


  return { feature, entities }
}


export function entitySelectors<R, T, S>(
  featureName: keyof IAppState,
  featureAdapter: EntityAdapter<IEntityState>): IEntitySelectors<R, T, S> {

  const { entities } = collectionsSelectors(featureName, featureAdapter);

  const stateSelector: IStateSelector = createSelector(entities, getState());

  const requestSelector: IRequestSelector = createSelector(stateSelector, getRequest());
  const entitySelector: IEntitySelector = createSelector(stateSelector, getEntity());
  const statusSelector: IStatusSelector = createSelector(stateSelector, getStatus());

  const entityStatusSelector = createSelector(stateSelector, getEntityStatus);

  return {
    entities,
    request: EntitySelectors.selectRequest<R>(requestSelector),
    entity: EntitySelectors.selectEntity<T>(entitySelector),
    status: EntitySelectors.selectStatus<S>(statusSelector),
    entityStatus: EntitySelectors.selectyEntityStatus<T>(entityStatusSelector)
  }
}


