import { EntityState, Dictionary } from '@ngrx/entity';

export interface IEntityState<EntityType, StatusType> extends EntityState<EntityType> {
  statuses: Dictionary<StatusType>;
}


