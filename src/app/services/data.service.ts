import { Inject, Injectable } from "@angular/core";
import { EUserRole, IUser } from '@app-library/user/types';
import { EEntityType, ELanguage } from '@app/types';
import { transSource } from '@pages/translate/source';
import { IEntityRequest } from '@xangular-store/entity/types';
import { Observable, of } from 'rxjs';
import { SOURFCE_PARSE_SERVICE } from './injection-tokens';
import { ISourceParseService } from './source-parse.service';
import { IEntity, createEntity } from '@xangular-common/entity';
import { HttpClient } from '@angular/common/http';





export interface IDataService {
  getItem(request: IEntityRequest): Observable<IEntity>
  // getUser(uid: string): Observable<IUser>;
}

@Injectable()
export class DataService implements IDataService {
  constructor(
    private http: HttpClient,
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
  ) {

  }

  getItem(request: IEntityRequest): Observable<IEntity> {
    switch (request.source) {
      case EEntityType.translate:
        return of(this.parser.parse(transSource, 'en', '1'));

      case EEntityType.user:
        return of(createEntity<IUser>(EEntityType.user, '111', {
          role: EUserRole.AUTORISED,
          label: 'AUTORISED',
          language: ELanguage.RU,
          avatar: 'https://avatars0.githubusercontent.com/u/2338387'
        }));

    }

  }

  private request(method: string, url: string, data?: any) {


    const options: { headers?: { [header: string]: string | string[] } } = {
      headers: {
        'Content-type': 'application/json'
      },
    };

    let response: any;

    switch (method) {
      case "POST":
        response = this.http.post(url, data, options);
        break;
    }

    return response;
  }
}
