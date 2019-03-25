import { IEntityField, IEntityFieldOptions, TEntityFieldType, IEntity } from './types';

export class EntityField implements IEntityField {

    private _options: IEntityFieldOptions;

    constructor(private _name: string, private _type: TEntityFieldType) {

    }

    private _value: any | IEntity;

    set value(value: any | IEntity) {
        this._value = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    getValue<T extends any | IEntity>(): T {
        return this._value as T;

    }

    getOptions(name: keyof IEntityFieldOptions) {
        return this._options[name];

    }

    setOptions(options: IEntityFieldOptions) {
        this._options = options;
    }

    setValue(value: any | IEntity) {
        return this._value = value;

    }

    isEmpty() {
        return this._value === null || this._value === undefined;
    }
}
