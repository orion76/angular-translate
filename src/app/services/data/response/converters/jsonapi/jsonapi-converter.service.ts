import { IResponseConverterPlugin } from '@app-services/data/response/types';
import { Observable, of } from 'rxjs';
import { IEntity } from '@xangular-common/entity';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ResponseJsonapiConverter implements IResponseConverterPlugin {
  convert(event: HttpResponse<any>): Observable<IEntity[]> {
    return of([{ id: '111', source: 'source' }])
  }
}
