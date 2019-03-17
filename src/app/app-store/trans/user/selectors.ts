import { IUser } from '@app/types/user';
import { Dictionary } from '@ngrx/entity/src/models';
import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { IUserProps } from '../../../types/common';
import { IAppState } from '../../app-store.module';
import { StoreState } from './state';



// import IFormProps = FormSelectors.IFormProps;

export namespace StoreSelectors {


  import State = StoreState.State;
  import featureName = StoreState.featureName;




  export const selectFeatureState: MemoizedSelector<IAppState, IUser> = createFeatureSelector<State>(featureName);


  export type TEntity = MemoizedSelector<IAppState, IUser>;
  export const Entity: TEntity = selectFeatureState;


}

