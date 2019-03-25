import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {JSONAPIConverterService} from './jsonapi-converter.service';
import { ISourceConfig } from '../types/source-config';




export interface IConverterService<Req, Res> {
    response(method: string, response: Res, config: ISourceConfig);

    request(body: Req);
}

export const HTTP_RESPONSE_CONVERTER = new InjectionToken<IConverterService<any, any>>('HTTP Response converter');

@NgModule({})
export class HTTPConverterServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HTTPConverterServiceModule, providers: [
                {provide: HTTP_RESPONSE_CONVERTER, useClass: JSONAPIConverterService},
            ]
        };
    }
}
