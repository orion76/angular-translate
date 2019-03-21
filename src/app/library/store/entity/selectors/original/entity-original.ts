import { IEntityProps } from '@app-lib/store/types';
import { IAppState } from '@app/app-store/app-store.module';
// import { IEntityOriginal as EntityType, IEntityOriginalStatus as EntityStatus } from '@app/types';
import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { IEntitySelector, ICollectionSelectors, ISelectFeatureState, IEntityState, IStatusSelector, IEntityStatusSelector, IEntityListSelector } from './types';
import { EntityAdapter, Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IEntityStatusProps } from '@app/types';

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

export function getEntity<T>(collection: Dictionary<T>, props: IEntityProps): T {
  return collection[props.entityId];
}

export function selectyEntity<T>(selector: IEntitySelector<T>) {
  return (props: IEntityProps) => {
    return (source$: Observable<IAppState>) => selectNotEmpty(selector, props)
  };
}


export function createEntitySelector<T>(collection: IEntityListSelector<T>) {
  return createSelector(collection, getEntity);
}

export function getEntityStatus<T, S>(statuses: Dictionary<S>, entities: Dictionary<T>, props: IEntityStatusProps) {

  const { entityId, name, value } = props;

  if (!statuses[entityId]) {
    return;
  }

  const status: S = statuses[entityId];
  if (status[name] === value) {
    return entities[entityId]
  }
}

export function selectyStatus<S>(selector: IStatusSelector<S>) {
  return (props: IEntityProps) => {
    return (source$: Observable<IAppState>) => selectNotEmpty<S>(selector, props)
  };
}



export function selectyEntityStatus<T>(selector: IEntityStatusSelector<T>) {
  return (props: IEntityProps) => {
    return (source$: Observable<IAppState>) => selectNotEmpty<T>(selector, props)
  };
}
