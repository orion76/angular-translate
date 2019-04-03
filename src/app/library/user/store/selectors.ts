
import { IAppState } from '@app/app-store/app-store.module';
import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { EntitySelectorsOne } from '@xangular-store/entity/selectors/factoryOne';
import { StoreState } from './state';

export namespace StoreSelectors {

  import State = StoreState.State;
  import featureName = StoreState.featureName;
  import StatusList = StoreState.TUserStatusList;
  import TStateUser = StoreState.TStateUser;


  export const feature: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);
  export const selectors = EntitySelectorsOne.create<IAppState, TStateUser, StatusList>(feature);

}
