import {IConverterService} from './module';


import {convertGet} from "./convert-get";
import {Injectable} from "@angular/core";
import { iJSONAPI_Response } from './types';

import { ISourceConfig } from '../types/source-config';
import { THttpResponse } from '../types';
import { IEntity } from '@app-library/entity/types';

@Injectable()
export class JSONAPIConverterService implements IConverterService<IEntity, iJSONAPI_Response> {


    constructor() {

    }

    response(method: string, response: iJSONAPI_Response, config: ISourceConfig): THttpResponse {

        switch (method) {
            case 'GET':
                return convertGet(response, config);

        }

    }

    request(body: IEntity): iJSONAPI_Response {
        return null;
    }


}
