import { Injectable, Inject } from "@angular/core";
import { SOURFCE_PARSE_SERVICE } from './injection-tokens';
import { ISourceParseService } from './source-parse.service';
import { transSource } from '../components/translate/source';

import { Observable, of } from 'rxjs';
import { TEntity, ELanguage, IUser } from '@app/types';

export interface IDataService {
  getItem(source: string, entityId: string): Observable<TEntity>;
  getUser(uid: string): Observable<IUser>;
}

@Injectable()
export class DataService implements IDataService {
  constructor(
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
  ) {

  }

  getItem(source: string, entityId: string): Observable<TEntity> {
    return of(this.parser.parse(transSource, 'en', '1'));
  }

  getUser(uid: string): Observable<IUser> {
    return of({
      entityId: uid,
      name: 'user',
      language: ELanguage.RU
    });
  }
}
