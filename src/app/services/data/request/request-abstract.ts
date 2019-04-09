import { HttpParams } from '@angular/common/http/src/params';
import { ISourceConfig } from '@app-library/app-config';
import { IEntityRequest } from '@xangular-store/entity/types';
import { IRequest } from './types';


export abstract class RequestAbstract implements IRequest {
  constructor(public request: IEntityRequest, public config: ISourceConfig<any>) { }


  abstract path(): string;

  abstract query(): HttpParams;

}
