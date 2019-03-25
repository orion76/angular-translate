import { Injectable, Inject } from "@angular/core";
import { SOURFCE_PARSE_SERVICE } from './injection-tokens';
import { ISourceParseService } from './source-parse.service';


import { Observable, of } from 'rxjs';
import { IEntityTranslate, ELanguage, TTranslateEntity, EEntityType } from '@app/types';
import { TEntityRequest } from '@app-library/store/types';
import { IUser, EUserRole } from '@app-library/user/types';
import { transSource } from '@pages/translate/source';

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
      role: EUserRole.AUTORISED,
      entityId: uid,
      name: 'AUTORISED',
      language: ELanguage.RU
    });
  }
}
