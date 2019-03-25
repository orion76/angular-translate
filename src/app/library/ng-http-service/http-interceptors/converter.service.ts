import {Inject, Injectable} from '@angular/core';
import {HTTP_RESPONSE_CONVERTER, IConverterService} from '../converters/module';
import { ISourceConfig } from '../types/source-config';



@Injectable()
export class HTTPResponseConverter {

    

    constructor(@Inject(HTTP_RESPONSE_CONVERTER) private converter: IConverterService<any, any>) {
  
    }

    convertResponse(method: string, config: ISourceConfig, response: any) {
        return this.converter.response(method, response, config);
    }

}




