import { IUserStatus } from '@app-types/user';
import { createFeatureSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { IUserProps } from '../../../types/common';
import { IAppState } from '../../app-store.module';
import { StoreState } from './state';


export namespace StoreSelectors {



  import State = StoreState.State;
  import featureName = StoreState.featureName;



  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);


  export type TEntity = MemoizedSelectorWithProps<IAppState, IUserProps, IUserStatus>;
  export const Entity: TEntity = selectFeatureState;


}

