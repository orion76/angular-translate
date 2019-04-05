import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

export interface IResponseConverterPlugin {
  convert(event: HttpResponse<any>): Observable<any> 
}
