import { Inject, Injectable } from "@angular/core";
import { EUserRole, IUser } from '@app-library/user/types';
import { EEntityType, ELanguage, IEntityTranslate } from '@app/types';
import { transSource } from '@pages/translate/source';
import { Observable, of } from 'rxjs';
import { SOURFCE_PARSE_SERVICE } from './injection-tokens';
import { ISourceParseService } from './source-parse.service';
import { IEntity } from '@app-library/ng-http-service/entity/types';
import { IEntityRequest } from '@xangular-store/entity/types';




export interface IDataService {
  getItem(request: IEntityRequest): Observable<IEntity>
  getUser(uid: string): Observable<IUser>;
}

@Injectable()
export class DataService implements IDataService {
  constructor(
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
  ) {

  }

  getItem(request: IEntityRequest): Observable<IEntity> {
    switch (request.source) {
      case EEntityType.translate:
        return of(this.parser.parse(transSource, 'en', '1'));

      case EEntityType.user:
        return of({
          source: EEntityType.user,
          role: EUserRole.AUTORISED,
          entityId: uid,
          label: 'AUTORISED',
          language: ELanguage.RU
        });

    }

  }


}
