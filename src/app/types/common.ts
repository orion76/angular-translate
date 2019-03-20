export enum ELanguage {
  RU = 'RU',
  EN = 'EN',
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
  load: boolean;
  loadSucess: boolean;
  loadError: boolean;
}
