import {IAppState} from '@app-store/app-store.module';
import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {StoreState} from './state';
import {EntitySelectorsMany} from '@xangular-store/entity';
import {IState} from '@xangular-store/entity/types';


export namespace StoreSelectors {


  import State = StoreState.State;
  import featureName = StoreState.featureName;

  import TStateConfig = StoreState.TStateConfig;
  import IConfigStates = StoreState.IConfigStates;


  export const feature: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);
  export const selectors = EntitySelectorsMany.create<IAppState, IState<IConfigStates>>(feature);

}

