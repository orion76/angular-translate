import {IResponseConverterPlugin} from '@app-services/data/response/types';
import {IEntity} from '@xangular-common/entity';
import {Injectable} from '@angular/core';
import {convert} from './utils';

@Injectable()
export class ResponseJsonapiConverter implements IResponseConverterPlugin {

  entrypoint = 'jsonapi';

  convert(data: any): IEntity[] {
    return convert(data);
  }
}
