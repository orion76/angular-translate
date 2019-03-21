import { Dictionary } from '@ngrx/entity';
import { IEntityProps, IEntityStatusProps } from '@app/types';

export function getEntity<T>(): (collection: Dictionary<T>, props: IEntityProps) => T {
  return (collection: Dictionary<T>, props: IEntityProps) => collection[props.entityId];
}

export function getEntityStatus<T, S>
  (statuses: Dictionary<S>, entities: Dictionary<T>, props: IEntityStatusProps) {

  const { entityId, name, value } = props;

  if (!statuses[entityId]) {
    return;
  }

  const status: S = statuses[entityId];
  if (status[name] === value) {
    return entities[entityId]
  }
}
