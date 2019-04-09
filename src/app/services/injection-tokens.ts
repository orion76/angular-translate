import { InjectionToken } from '@angular/core';
import { ISourceParseService } from './source-parse.service';
import { ITranslateService } from './translate.service';


export const TRANSLATE_SERVICE = new InjectionToken<ITranslateService>('TRANS_SERVICE');


export const SOURFCE_PARSE_SERVICE = new InjectionToken<ISourceParseService>('SOURFCE_PARSE_SERVICE');
