import { Injectable, Inject } from "@angular/core";
import { SOURFCE_PARSE_SERVICE } from './injection-tokens';
import { ISourceParseService } from './source-parse.service';
import { transSource } from '../components/trans/source';

import { Observable, of } from 'rxjs';
import { ITranslateSourceEntity } from '../types/trans';

export interface IDataService {
  getItem(source: string, entityId: string): Observable<ITranslateSourceEntity>
}

@Injectable()
export class DataService implements IDataService {
  constructor(
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
  ) {

  }

  getItem(source: string, entityId: string): Observable<ITranslateSourceEntity> {
    return of(this.parser.parse(transSource, 'en', '1'));
  }
}
