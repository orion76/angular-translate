
import { selectNotEmpty } from '@app-library/rxjs-helper';
import { IAppState } from '@app/app-store/app-store.module';
import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';
import { IUser, IUserStatus, TUserStatusName } from '../types';
import { StoreState } from './state';



export interface IUserStatusProps {
  name: TUserStatusName,
  value: any
}



export namespace StoreSelectors {

  import State = StoreState.State;
  import featureName = StoreState.featureName;


  export interface IEntitySelectors {
    entity?: OperatorFunction<IAppState, IUser>,
    status?: OperatorFunction<IAppState, IUserStatus>,
    entityStatus?: (status: TUserStatusName, value: any) => OperatorFunction<IAppState, IUser>,
  }


  export const feature: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export const getEntity = (state: State) => state.entity;
  export const getStatus = (state: State) => state.status;
  export const getEntityStatus = (state: State, props: IUserStatusProps) => {
    const status = getStatus(state);
    const { name, value } = props;
    if (status[name] === value) {
      return getEntity(state);
    }
  };

  export const selectorEntity: MemoizedSelector<IAppState, IUser> = createSelector(feature, getEntity);
  export const selectorStatus: MemoizedSelector<IAppState, IUserStatus> = createSelector(feature, getStatus);
  export const selectorEntityStatus: MemoizedSelectorWithProps<IAppState, IUserStatusProps, IUser> = createSelector(feature, getEntityStatus);

  export function createSelectors(): IEntitySelectors {
    return {
      entity: selectNotEmpty(selectorEntity),
      status: selectNotEmpty(selectorStatus),
      entityStatus: selectEntityStatus(selectorEntityStatus)
    }
  }
}
// select()
export interface IUserSelector extends MemoizedSelector<IAppState, IUser> { }

export function selectEntity(selector: IUserSelector): (source: Observable<IAppState>) => Observable<IUser> {
  return selectNotEmpty(selector)
}

export function selectStatus(selector: MemoizedSelector<IAppState, IUserStatus>) {
  return (source$: Observable<IAppState>) => selectNotEmpty(selector)
}

export function selectEntityStatus(selector: MemoizedSelectorWithProps<IAppState, IUserStatusProps, IUser>) {
  return (name: string, value: any) => selectNotEmpty(selector, { name, value })
}

