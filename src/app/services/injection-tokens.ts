import { InjectionToken } from "@angular/core";
import { IUserService } from '../types/user';
import { IDataService } from './data.service';
import { IOriginalService } from './original.service';
import { ISourceParseService } from './source-parse.service';
import { ITranslatedService } from './translated.service';
import { ITranslateProcess } from '@components/translate/process/translate-process';

export const ORIGINAL_SERVICE = new InjectionToken<IOriginalService>('ORIGINAL_SERVICE');
export const TRANSLATED_SERVICE = new InjectionToken<ITranslatedService>('TRANS_SERVICE');
//ITranslateProcess
export const TRANSLATED_PROCESS = new InjectionToken<ITranslateProcess>('TRANSLATED_PROCESS');
export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');
export const DATA_SERVICE = new InjectionToken<IDataService>('DATA_SERVICE');
export const SOURFCE_PARSE_SERVICE = new InjectionToken<ISourceParseService>('SOURFCE_PARSE_SERVICE');
