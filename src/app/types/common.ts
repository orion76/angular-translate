import { EEntityType } from '@app/types/config';

export interface IEntity {
  entityId: string,

  type: EEntityType
}


export interface IEntityProps {
  entityId: string;
}

export interface IEntityStatusProps extends IEntityProps {
  name: string;
  value: any
}

export interface IUserProps {
  uid: string;
}

export interface IEntityStatus {
  ADD: boolean;
  LOAD: boolean;
  LOAD_SUCCESS: boolean;
  LOAD_ERROR: boolean;
}
