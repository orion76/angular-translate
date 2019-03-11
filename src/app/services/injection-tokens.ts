import { InjectionToken } from "@angular/core";
import { ITransCommonService } from './trans-common.service';

export const TRANS_SERVICE = new InjectionToken<ITransCommonService>('TRANS_SERVICE');
