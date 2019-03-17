import { EnumFlagged } from '@app-lib/enum-flagged';
import { ETranslatedStatus } from '@app/app-store/trans/translated-status/actions';
import { ELanguage, ITranslatedEntity, ITranslatedState } from '@app/types';

export class TranslatedState implements ITranslatedState {


  constructor(private _entity: ITranslatedEntity, public status: EnumFlagged<ETranslatedStatus>) {

  }
  get entity() {
    return this.entity;
  }

  get originalId(): string {
    return this._entity.originalId;
  }

  get language(): ELanguage {
    return this._entity.language;
  }

  get lines() {
    return this._entity.lines;
  }

  get entityId(): string {
    return this._entity.entityId;
  }
  get authorId(): string {
    return this._entity.authorId;
  }




}
