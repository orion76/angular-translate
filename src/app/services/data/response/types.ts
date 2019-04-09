import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export interface IResponseConverterPlugin {
  readonly entrypoint: string;

  convert<T>(event: HttpResponse<any>): any | Observable<any>;
}
