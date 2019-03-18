import { InjectionToken } from "@angular/core";
import { IUserService } from '../types/user';
import { IDataService } from './data.service';

import { ISourceParseService } from './source-parse.service';
import { ITranslateService } from './translate.service';
import { ITranslateProcess } from '@app/components/translate/process/translate-process';

export const TRANSLATE_SERVICE = new InjectionToken<ITranslateService>('TRANS_SERVICE');
//ITranslateProcess
export const TRANSLATED_PROCESS = new InjectionToken<ITranslateProcess>('TRANSLATED_PROCESS');
export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');
export const DATA_SERVICE = new InjectionToken<IDataService>('DATA_SERVICE');
export const SOURFCE_PARSE_SERVICE = new InjectionToken<ISourceParseService>('SOURFCE_PARSE_SERVICE');
