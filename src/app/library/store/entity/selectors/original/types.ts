import { IAppState } from '@app/app-store/app-store.module';
import { IEntityProps, IEntityStatusProps } from '@app/types';
import { Dictionary, EntityState } from '@ngrx/entity';
import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';



export interface IEntityState<T, S> extends EntityState<T> {
  statuses: Dictionary<S>;
}


export interface ISelectFeatureState<T, S> extends MemoizedSelector<IAppState, IEntityState<T, S>> { };


export interface IEntityListSelector<T> extends MemoizedSelector<IAppState, Dictionary<T>> { };


export interface IEntitySelector<T> extends MemoizedSelectorWithProps<IAppState, IEntityProps, T> { };
export interface IStatusSelector<S> extends MemoizedSelectorWithProps<IAppState, IEntityProps, S> { };
export interface IEntityStatusSelector<T> extends MemoizedSelectorWithProps<IAppState, IEntityStatusProps, T> { };

export interface ICollectionSelectors<T, S> {
  feature: ISelectFeatureState<T, S>,
  entities: IEntityListSelector<T>,
  stasuses: IEntityListSelector<S>
}

export interface IEntitySelectors<T, S> {
  entity: (props: IEntityProps) => (source: Observable<IAppState>) => OperatorFunction<IAppState, T>,
  status?: (props: IEntityProps) => (source: Observable<IAppState>) => OperatorFunction<IAppState, S>,
  entityStatus?: (props: IEntityStatusProps) => (source: Observable<IAppState>) => OperatorFunction<IAppState, T>,
}

