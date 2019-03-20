import { ISelectors } from '@app-lib/store/types';
import { EntitySelectors, EntityState, Dictionary, EntityAdapter } from '@ngrx/entity/src/models';
import { IEntityProps } from '@app/types';
import { MemoizedSelector, MemoizedSelectorWithProps, createFeatureSelector, createSelector } from '@ngrx/store';




export class Selectors<AppState, T> implements ISelectors<AppState, T>{
  selectIds: (state: EntityState<T>) => string[] | number[];
  selectEntities: (state: EntityState<T>) => Dictionary<T>;
  selectAll: (state: EntityState<T>) => T[];
  selectTotal: (state: EntityState<T>) => number;


  getEntity = (entities: Dictionary<T>, props: IEntityProps) => {
    return entities[props.entityId];
  };

  selectFeatureState: MemoizedSelector<AppState, EntityState<T>>;
  Entities: MemoizedSelector<AppState, Dictionary<T>>;
  Entity: MemoizedSelectorWithProps<AppState, IEntityProps, T>;

  constructor(protected featureName: keyof AppState, protected featureAdapter: EntityAdapter<T>) {

    const { selectAll, selectEntities, selectIds, selectTotal } = featureAdapter.getSelectors();

    this.selectAll = selectAll;
    this.selectEntities = selectEntities;
    this.selectIds = selectIds;
    this.selectTotal = selectTotal;

    this.selectFeatureState = createFeatureSelector<AppState, EntityState<T>>(featureName);

    this.Entities = createSelector<AppState, EntityState<T>, Dictionary<T>>(this.selectFeatureState, this.selectEntities);
    this.Entity = createSelector(this.Entities, this.getEntity);
  }


}
