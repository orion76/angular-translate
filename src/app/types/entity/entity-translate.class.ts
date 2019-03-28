import { Entity, IFieldOptions } from '@app-library/ng-http-service/entity/entity.class';
import { IKeyValueList } from '@app-library/ng-http-service/types';
import { IEntityTranslate, ILineEntity } from '@app-types/trans';

export class EntityTranslate extends Entity implements IEntityTranslate {


}

export class EntityTranslateLine extends Entity implements ILineEntity {

  public sourceId: string;

  constructor(protected _source: string,
    protected _id: string,
    protected _fieldsOptions: IKeyValueList<IFieldOptions>) {
    super(_source, _id, _fieldsOptions);
  }

  get content() {
    return this.fieldValue('content') as string;
  }


}
