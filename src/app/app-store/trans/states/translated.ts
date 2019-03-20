import { ELanguage, ITranslatedEntity, ITranslatedState } from '@app/types';

export class TranslatedState implements ITranslatedState {
  type: "translated";

  constructor(private _entity: ITranslatedEntity, public status: any) {

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
