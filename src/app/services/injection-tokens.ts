import { InjectionToken } from "@angular/core";
import { ITransCommonService } from './trans-common.service';
import { ISourceParseService } from './source-parse.service';
import { IDataService } from './data.service';

export const TRANS_SERVICE = new InjectionToken<ITransCommonService>('TRANS_SERVICE');
export const DATA_SERVICE = new InjectionToken<IDataService>('DATA_SERVICE');
export const SOURFCE_PARSE_SERVICE = new InjectionToken<ISourceParseService>('SOURFCE_PARSE_SERVICE');
