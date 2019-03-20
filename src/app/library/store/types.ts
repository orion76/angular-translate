import { EntitySelectors, Dictionary, EntityState } from '@ngrx/entity/src/models';

import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';

export interface IEntityProps {
  entityId: string;
}

export interface ISelectors<AppState, EntityType> {

  selectIds: (state: EntityState<EntityType>) => string[] | number[];
  selectEntities: (state: EntityState<EntityType>) => Dictionary<EntityType>;
  selectAll: (state: EntityState<EntityType>) => EntityType[];
  selectTotal: (state: EntityState<EntityType>) => number;

  getEntity: (entities: Dictionary<EntityType>, props: IEntityProps) => EntityType;
  selectFeatureState: MemoizedSelector<AppState, EntityState<EntityType>>;
  Entities: MemoizedSelector<AppState, Dictionary<EntityType>>;
  Entity: MemoizedSelectorWithProps<AppState, IEntityProps, EntityType>
}
