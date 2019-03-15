import { ELanguage } from './common';
import { IOriginalEntity, ITranslatedEntity } from './trans';
import { EnumFlagged } from '@app-lib/enum-flagged';
import { ETranslatedStatus } from '@app-store/trans/translated-status/actions';


export interface ITranslatedState extends ITranslatedEntity {
  status: EnumFlagged<ETranslatedStatus>;
  readonly entity: ITranslatedEntity
}
