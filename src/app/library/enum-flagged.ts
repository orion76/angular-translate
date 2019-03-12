export type TEnums<E> = { [P in keyof E]?: E[P] };

export interface IEnumFlagged<E> {

  readonly flags: TEnums<E>;

  toArray(): TEnumFlagged<E>[];

  contains(val: TEnumFlagged<E>): boolean;

  set(val: TEnumFlagged<E>): IEnumFlagged<E>;

  add(val: TEnumFlagged<E>): IEnumFlagged<E>;

  remove(val: TEnumFlagged<E>): IEnumFlagged<E>;

  intersect(val: TEnumFlagged<E>): IEnumFlagged<E>;

  equals(val: TEnumFlagged<E>): boolean;

  create(value?: TEnumFlagged<E>);

  replace(valueOld: E, valueNew: E): IEnumFlagged<E>;
}

export type TEnumFlagged<E> = number | IEnumFlagged<E>;

export class EnumFlagged<E extends number> implements IEnumFlagged<E> {


  constructor(private _enum: any, private _value?: TEnumFlagged<E>) {

  }

  get flags() {
    return this.toArray().reduce((acc: any, item: number) => ({ ...acc, [this._enum[item]]: item }), {});
  }


  create(value?: TEnumFlagged<E>) {
    return new EnumFlagged<E>(this._enum, value);
  }

  toBits(value: TEnumFlagged<E>) {
    const bits: number[] = [];
    const bin = (value as number).toString(2);
    for (let i = 0; i < bin.length; i++) {
      const bit = parseInt(bin[i]);
      if (bit === 1) {
        bits.push(1 << (bin.length - 1 - i));
      }
    }

    return bits.sort();
  }

  toArray(): number[] {
    return this.toBits(this._value);
  }

  valueOf() {
    return this._value;
  }

  contains(val: TEnumFlagged<E>): boolean {
    const result = <number>this._value & <number>val;
    return result === val;
  }


  add(val: TEnumFlagged<E>): IEnumFlagged<E> {
    return this.create(<number>this._value | <number>val);
  }

  replace(valueOld: E, valueNew: E): IEnumFlagged<E> {
    const clean = (<number>this._value ^ valueOld) & <number>this._value;
    return this.create(clean | valueNew);
  }

  set(val: TEnumFlagged<E>): IEnumFlagged<E> {
    const newItem = this.create(<number>val);
    return newItem;
  }

  remove(val: TEnumFlagged<E>): IEnumFlagged<E> {
    return this.create((<number>this._value ^ <number>val) & <number>this._value);
  }

  _intersect(val1: TEnumFlagged<E>, val2: TEnumFlagged<E>) {
    return (<number>this._value & <number>val1) !== 0 && (<number>val2 & <number>val1) !== 0;
  }

  intersect(val: TEnumFlagged<E>): IEnumFlagged<E> {
    return this.create(this.toArray()
      .reduce((acc: number, value: number) => this._intersect(val, value) ? acc + value : acc)
    );
  }

  equals(val: number): boolean {
    return this._value === val;
  }

  toString() {
    return Object.keys(this.flags).join(', ');
  }
}

