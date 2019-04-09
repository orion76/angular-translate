import {IResponseConverterPlugin} from '@app-services/data/response/types';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class ResponseOauthConverter implements IResponseConverterPlugin {
  entrypoint = 'oauth';

  convert(event: any): Observable<any> {
    return event;
  }
}
