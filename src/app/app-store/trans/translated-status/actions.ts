

export enum ETranslatedStatus {
  TRANSLATED_NEW = 1 << 0,
  TRANSLATED_LOAD = 1 << 1,
  TRANSLATED_LOAD_SUCCESS = 1 << 2,
  TRANSLATED_LOAD_ERROR = 1 << 3,
}


export namespace StoreActions {
  export enum Types {
    TRANSLATED_ADD = '[TRANSLATED STATUS] TRANSLATED_ADD',
    STATUS_SET = '[TRANSLATED STATUS] SET',
    STATUS_ADD = '[TRANSLATED STATUS] ADD',
    STATUS_REPLACE = '[TRANSLATED STATUS] REPLACE',
  }

  export class Add {
    readonly type = Types.TRANSLATED_ADD;
    constructor(public entityId: string) { }
  }

  export class statusdSet {
    readonly type = Types.STATUS_SET;
    constructor(public entityId: string, public status: ETranslatedStatus) { }
  }

  export class statusAdd {
    readonly type = Types.STATUS_ADD;
    constructor(public entityId: string, public status: ETranslatedStatus) { }
  }

  export class statusReplace {
    readonly type = Types.STATUS_REPLACE;
    constructor(public entityId: string, public statusOld: ETranslatedStatus, public statusNew: ETranslatedStatus) { }
  }

  export type Actions = Add
    | statusdSet
    | statusAdd
    | statusReplace;
}
