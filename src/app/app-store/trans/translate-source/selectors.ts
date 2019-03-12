import { createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';

import { Dictionary } from '@ngrx/entity/src/models';

import { ITranslateSourceEntity } from '../../../types/trans';

// import IFormProps = FormSelectors.IFormProps;

export namespace FormValueSelectors {

  import IFormProps = FormSelectors.IFormProps;


  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

  } = featureAdapter.getSelectors();

  export interface IEntityProps {
    entityId: string;
  }

  export const getSource = (values: Dictionary<ITranslateSourceEntity>, props: IEntityProps): IFormValueState => {
    if (props.entityId === undefined || !values[props.entityId]) {
      // console.warn('getValue', values, props);
      return;
    }
    return values[props.entityId];
  };


  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export const Values: MemoizedSelector<IAppState, Dictionary<IFormValueState>> = createSelector(selectFeatureState, _selectEntities);


  export const Value: MemoizedSelectorWithProps<IAppState, IFormProps, IFormValueState> = createSelector(Values, getValue);


}

