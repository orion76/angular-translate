import { IUser } from '@app-types/user';
import { Dictionary } from '@ngrx/entity/src/models';
import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { IUserProps } from '../../../types/common';
import { IAppState } from '../../app-store.module';
import { StoreState } from './state';



// import IFormProps = FormSelectors.IFormProps;

export namespace StoreSelectors {


  import State = StoreState.State;
  import featureName = StoreState.featureName;


  export const getEntity = (entities: Dictionary<IUser>, props: IUserProps): IUser => {
    if (props.uid === undefined || !entities[props.uid]) {
      // console.warn('getValue', values, props);
      return;
    }
    return entities[props.uid];
  };


  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);


  export type TEntity = MemoizedSelectorWithProps<IAppState, IUserProps, IUser>;
  export const Entity: TEntity = selectFeatureState;


}

