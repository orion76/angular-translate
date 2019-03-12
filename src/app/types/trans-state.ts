import { ELanguage } from './common';
import { ITranslateSourceEntity } from './trans';


export interface ITransState extends ITranslateSourceEntity {
  translateLanguage: ELanguage;
}
