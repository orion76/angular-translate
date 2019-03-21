import {
  ICollectionSelectors,
  IEntityListSelector,
  IEntitySelector,
  IEntitySelectors,
  IEntityState,
  IEntityStatusSelector,
  ISelectFeatureState,
  IStatusSelector
} from '@app-lib/store/entity/selectors/types';
import { IEntityProps } from '@app-lib/store/types';
import { IAppState } from '@app/app-store/app-store.module';
import { IEntityStatusProps } from '@app/types';
import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { IEntityOriginal as EntityType, IEntityOriginalStatus as EntityStatus } from '@app/types';
import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { getEntity, getEntityStatus } from '@app-lib/store/entity/selectors/getters';


export function selectNotEmpty<T>(selector: IEntitySelector<T>, props: IEntityProps): OperatorFunction<IAppState, T> {

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


