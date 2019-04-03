
// import IFormProps = FormSelectors.IFormProps;

import { IAppState } from '@app-store/app-store.module';
import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { StoreState } from './state';
import { EntitySelectorsMany } from '@xangular-store/entity/selectors/factoryMany';



export namespace StoreSelectors {

  import State = StoreState.State;
  import featureName = StoreState.featureName;
  import IStateTranslate = StoreState.IStateTranslate;
  export const feature: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);
  export const selectors = EntitySelectorsMany.create<IAppState, IStateTranslate>(feature);

}
