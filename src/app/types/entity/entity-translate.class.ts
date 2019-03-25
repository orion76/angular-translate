import { IEntityTranslate } from '@app-types/trans';
import { Entity, IFieldOptions } from '@app-library/ng-http-service/entity/entity.class';
import { IKeyValueList } from '@app-library/ng-http-service/types';
import { EEntityType } from '@app-types/config';

export class EntityTranslate extends Entity implements IEntityTranslate {

  constructor(protected _source: EEntityType,
    protected _id: string,
    protected _fieldsOptions: IKeyValueList<IFieldOptions>) {
    super(_source, _id, _fieldsOptions);
  }

  get type() {
    return this.source;
  }
}