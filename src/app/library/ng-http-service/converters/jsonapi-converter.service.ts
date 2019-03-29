import { Injectable } from "@angular/core";
import { IEntity } from '@app-library/entity/types';
import { THttpResponse } from '../types';
import { convertGet } from "./convert-get";
import { IConverterService } from './module';
import { iJSONAPI_Response } from './types';




@Injectable()
export class JSONAPIConverterService implements IConverterService<IEntity, iJSONAPI_Response> {


  constructor() {

  }

  response(method: string, response: iJSONAPI_Response): THttpResponse {

    switch (method) {
      case 'GET':
        return convertGet(response);

    }

  }

  request(body: IEntity): iJSONAPI_Response {
    return null;
  }


}
