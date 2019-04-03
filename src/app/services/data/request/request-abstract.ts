import { IRequest } from './types';
import { IEntityRequest } from '@xangular-store/entity/types';
import { ISourceConfig } from '@app-library/app-config/app-config.service';
import { HttpParamsOptions, HttpParams } from '@angular/common/http/src/params';


export abstract class RequestAbstract implements IRequest {
  constructor(public request: IEntityRequest, public config: ISourceConfig) { }


  abstract path(): string[];

  abstract query(): HttpParams;

}
