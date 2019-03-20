import { ELanguage } from './common';
import { IOriginalEntity, ITranslatedEntity } from './trans';
import { EnumFlagged } from '@app-lib/enum-flagged';


export interface ITranslatedState extends ITranslatedEntity {
  status: any;
  readonly entity: ITranslatedEntity
}
