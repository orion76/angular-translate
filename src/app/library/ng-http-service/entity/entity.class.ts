import { TEntityFieldType, IEntity, IEntityField, EEntityDeleted } from './types';
import { ISourceConfig } from '../types/source-config';
import { IKeyValueList } from '../types';
import { EntityField } from './field.class';
import { ELanguage } from '@app/types';



export interface IFieldOptions {
  type: TEntityFieldType;
  valueType?: any;
  source?: ISourceConfig;
}

export class Entity implements IEntity {


  protected _fields: Map<string, IEntityField> = new Map();

  constructor(protected _source: string,
    protected _id: string,
    protected _fieldsOptions: IKeyValueList<IFieldOptions>) {

  }

  protected _is_new = false;

  get is_new() {
    return this._is_new;
  }

  set is_new(state: boolean) {
    this._is_new = state;
  }

  private _deleted: EEntityDeleted = EEntityDeleted.NOT_DELETED;

  get deleted() {
    return this._deleted;
  }

  set deleted(status: EEntityDeleted) {
    this._deleted = status;
  }

  get entityId() {
    return this._id;
  }

  get label(): string {
    return this.field('label').getValue<string>();
  }

  get language() {
    return this.field('language').getValue<ELanguage>();
  }
  get source() {
    return this._source;
  }

  get values() {
    const values: IKeyValueList<any> = {
      id: this.entityId,
      source: this.source
    };

    this._fields.forEach((field: IEntityField, fieldName: string) => {
      let fieldValue = field.getValue();
      if (typeof fieldValue === 'object') {
        fieldValue = (fieldValue as IEntity).values;
      }
      values[fieldName] = fieldValue;

    });

    return values;
  }

  setFields(fields: Map<string, IEntityField>) {
    this._fields = new Map(fields.entries());
  }

  clone() {
    const thisClone = new Entity(this._source, this._id, { ...this._fieldsOptions });
    thisClone.setFields(this._fields);

    Object.keys(this).forEach((fieldName: string) => thisClone[fieldName] = this[fieldName]);

    return thisClone;
  }

  cleanId() {
    this._id = null;
  }

  hasField(fieldName: string) {
    return this._fields.has(fieldName);
  }

  field(fieldName: string) {
    if (this._fields.has(fieldName)) {
      return this._fields.get(fieldName);
    }
  }


  fieldValue(fieldName: string) {
    if (this._fields.has(fieldName)) {
      return this._fields.get(fieldName).getValue();
    }
  }

  getFieldOptions(fieldName: string): IFieldOptions {
    if (this._fieldsOptions.hasOwnProperty(fieldName)) {
      return this._fieldsOptions[fieldName];
    } else {
      return { type: 'attribute', valueType: 'string' };
    }

  }

  setFieldValue(fieldName: string, value: any) {
    let field: any;
    if (this._fields.has(fieldName)) {
      field = this._fields.get(fieldName);
    } else {
      const config: IFieldOptions = this.getFieldOptions(fieldName);
      field = new EntityField(fieldName, config.type);
    }

    field.setValue(value);
    this._fields.set(fieldName, field);
  }

  addAttribute(name: string, value: any, type: string) {
    const field = new EntityField(name, 'attribute');
    field.setValue(value);

    this._fields.set(name, field);
  }

  addRelationship(name: string, value: IEntity) {
    const field = new EntityField(name, 'relationship');
    field.setValue(value);
    this._fields.set(name, field);
  }

}
