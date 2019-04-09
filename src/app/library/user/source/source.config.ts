import {ISourceConfig} from '@app-library/app-config';
import {IEntity} from '@xangular-common/entity';


export interface ISourceEntityUser extends IEntity {
  name: string;

}


export const sourceConfigUser: ISourceConfig<ISourceEntityUser> = {
  name: 'user',
  url: 'user',
  fields: {name: 'string'}

};
export const configs: ISourceConfig<ISourceEntityUser>[] = [sourceConfigUser];
