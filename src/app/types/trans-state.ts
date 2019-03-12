import { ELanguage } from './common';
import { ITranslateOriginalEntity } from './trans';


export interface ITransState extends ITranslateOriginalEntity {
  translateLanguage: ELanguage;
}
