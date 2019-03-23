import { Injectable, Inject } from "@angular/core";
import { SOURFCE_PARSE_SERVICE } from './injection-tokens';
import { ISourceParseService } from './source-parse.service';
import { transSource } from '../components/translate/source';

import { Observable, of } from 'rxjs';
import { ITranslateEntity, ELanguage, IUser, TTranslateEntity, EEntityType } from '@app/types';
import { TEntityRequest } from '@app-library/store/types';

export interface IDataService {
  getItem(request: TEntityRequest): Observable<TTranslateEntity>
  getUser(uid: string): Observable<IUser>;
}

@Injectable()
export class DataService implements IDataService {
  constructor(
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
  ) {

  }

  getItem(request: TEntityRequest): Observable<TTranslateEntity> {
    return of(this.parser.parse(transSource, 'en', '1'));
  }


  getUser(uid: string): Observable<IUser> {
    return of({
      type: EEntityType.user,
      entityId: uid,
      name: 'user',
      language: ELanguage.RU
    });
  }
}
