import { getEntity, getEntityStatus } from '@app-lib/store/entity/selectors/getters';
import { selectEntity, selectStatus, selectyEntityStatus } from '@app-lib/store/entity/selectors/selectors';
import { ICollectionSelectors, IEntitySelector, IEntitySelectors, IEntityState, ISelectFeatureState, IStatusSelector } from '@app-lib/store/entity/selectors/types';
import { IAppState } from '@app/app-store/app-store.module';
import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';



export function collectionsSelectors<T, S>(
  featureName: keyof IAppState,
  featureAdapter: EntityAdapter<T>): ICollectionSelectors<T, S> {

  const { selectEntities } = featureAdapter.getSelectors();
  const selectStatuses: (state: IEntityState<T, S>) => Dictionary<S> = (state) => state.statuses;


  const feature: ISelectFeatureState<T, S> = createFeatureSelector<IAppState, IEntityState<T, S>>(featureName);

  const entities = createSelector(feature, selectEntities);
  const statuses = createSelector(feature, selectStatuses);

  return { feature, entities, statuses }
}


export function entitySelectors<T, S>(featureName: keyof IAppState, featureAdapter: EntityAdapter<T>): IEntitySelectors<T, S> {

  const { entities, statuses } = collectionsSelectors<T, S>(featureName, featureAdapter);

  const entitySelector: IEntitySelector<T> = createSelector(entities, getEntity<T>());
  const statusSelector: IStatusSelector<S> = createSelector(statuses, getEntity<S>());
  const entityStatusSelector = createSelector(statuses, entities, getEntityStatus);

  return {
    entities,
    statuses,
    entity: selectEntity(entitySelector),
    status: selectStatus(statusSelector),
    entityStatus: selectyEntityStatus<T>(entityStatusSelector)
  }
}

export function StoreSelectors() {

}


// export function createSelectors<T, S>(featureName: keyof IAppState, featureAdapter: EntityAdapter<T>): IEntitySelectors<IAppState, T, S> {

//   const { entities, stasuses } = collectionsSelectors<T, S>(featureName, featureAdapter);

//   const getEntity = (collection:) =>

//   return {
//     entities,
//     stasuses,
//     entity: selectEntity<T>(),
//     stasus: selectStatus<T>(),
//     entityStatus: selectyEntityStatus<T>()
//   }
//   }

