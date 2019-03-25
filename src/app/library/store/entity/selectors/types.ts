import { IEntity } from '@app-library/ng-http-service/entity/types';
import { IEntityRequest, IEntityState, IEntityStatus, IStateProps, IStatusProps } from '@app-library/store/types';
import { IAppState } from '@app/app-store/app-store.module';
import { Dictionary, EntityState } from '@ngrx/entity';
import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { OperatorFunction } from 'rxjs';



export interface ISelectFeatureState extends MemoizedSelector<IAppState, EntityState<IEntityState>> { };


export interface IStateListSelector extends MemoizedSelector<IAppState, Dictionary<IEntityState>> { };

export interface ISelectorWithProps<T> extends MemoizedSelectorWithProps<IAppState, IStateProps, T> { };
export interface IStateSelector extends ISelectorWithProps<IEntityState> { };

export interface IRequestSelector extends ISelectorWithProps<IEntityRequest> { };
export interface IEntitySelector extends ISelectorWithProps<IEntity> { };
export interface IStatusSelector extends ISelectorWithProps<IEntityStatus> { };
export interface IEntityStatusSelector extends MemoizedSelectorWithProps<IAppState, IStatusProps, IEntity> { };

export interface ICollectionSelectors {
  feature?: ISelectFeatureState,
  entities?: IStateListSelector,
}

export interface IEntitySelectors<R, T, S> extends ICollectionSelectors {
  request?: (props: IStateProps) => OperatorFunction<IAppState, R>,
  entity?: (props: IStateProps) => OperatorFunction<IAppState, T>,
  status?: (props: IStateProps) => OperatorFunction<IAppState, S>,
  entityStatus?: (props: IStatusProps) => OperatorFunction<IAppState, T>,
}


