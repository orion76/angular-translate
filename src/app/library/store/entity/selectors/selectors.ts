import { getEntity, getEntityStatus, getStatus } from '@app-lib/store/entity/selectors/factory';
import { ICollectionSelectors, IEntityListSelector, IEntitySelector, IEntitySelectors, IEntityState, IEntityStatusSelector, ISelectFeatureState, IStatusSelector } from '@app-lib/store/entity/selectors/original/types';
import { IEntityProps } from '@app-lib/store/types';
import { IAppState } from '@app/app-store/app-store.module';
import { IEntityStatusProps } from '@app/types';
import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { IEntityOriginal as EntityType, IEntityOriginalStatus as EntityStatus } from '@app/types';
import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';


export function collectionsSelectors<T, S>(
  featureName: keyof IAppState,
  featureAdapter: EntityAdapter<T>): ICollectionSelectors<T, S> {

  const { selectEntities } = featureAdapter.getSelectors();
  const selectStatuses: (state: IEntityState<T, S>) => Dictionary<S> = (state) => state.statuses;


  const feature: ISelectFeatureState<T, S> = createFeatureSelector<IAppState, IEntityState<T, S>>(featureName);

  const entities = createSelector(feature, selectEntities);
  const stasuses = createSelector(feature, selectStatuses);

  return { feature, entities, stasuses }
}

export function selectNotEmpty<T>(
  selector: IEntitySelector<T>,
  props: IEntityProps
): OperatorFunction<IAppState, T> {

  return (source$: Observable<IAppState>) => {
    let mapped$: Observable<T>;
    mapped$ = source$.pipe(
      map(source => selector(source, <IEntityProps>props)),
      distinctUntilChanged(),
      filter(Boolean)
    );
    return mapped$;
  };
}


export function selectEntity<T>(selector: IEntitySelector<T>) {
  return (props: IEntityProps) => {
    return (source$: Observable<IAppState>) => selectNotEmpty(selector, props)
  };
}

export function selectStatus<S>(selector: IStatusSelector<S>) {
  return (props: IEntityProps) => {
    return (source$: Observable<IAppState>) => selectNotEmpty<S>(selector, props)
  }
}

export function selectyEntityStatus<T>(selector: IEntityStatusSelector<T>) {
  return (props: IEntityStatusProps) => {
    return (source$: Observable<IAppState>) => selectNotEmpty<T>(selector, props)
  };
}



export function entitySelectors<T, S>(
  entities: IEntityListSelector<T>,
  statuses: IEntityListSelector<S>): IEntitySelectors<T, S> {

  const entitySelector: IEntitySelector<T> = createSelector(entities, getEntity);
  const statusSelector: IEntitySelector<S> = createSelector(statuses, getStatus);
  const entityStatusSelector = createSelector(statuses, entities, getEntityStatus);

  return {
    entity: selectEntity(entitySelector),
    status: selectStatus(statusSelector),
    entityStatus: selectyEntityStatus<T>(entityStatusSelector)
  }
}
