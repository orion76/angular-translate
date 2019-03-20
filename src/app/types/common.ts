export enum ELanguage {
  RU = 'RU',
  EN = 'EN',
}

export interface IEntityProps {
  entityId: string;
}

export interface IUserProps {
  uid: string;
}

export interface IEntityStatus {
  load: boolean;
  loadSucess: boolean;
  loadError: boolean;
}
