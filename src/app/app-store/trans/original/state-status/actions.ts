
export enum EOriginalStatus {
  ORIGINAL_NEW = 1 << 0,
  ORIGINAL_LOAD = 1 << 1,
  ORIGINAL_LOAD_SUCCESS = 1 << 2,
  ORIGINAL_LOAD_ERROR = 1 << 3,
}

export namespace StoreActions {
  export enum Types {
    ORIGINAL_ADD = '[STATUS] ORIGINAL_ADD',
    STATUS_SET = '[STATUS] SET',
    STATUS_ADD = '[STATUS] ADD',
    STATUS_REPLACE = '[STATUS] REPLACE',
  }

  export class originalAdd {
    readonly type = Types.ORIGINAL_ADD;
    constructor(public entityId: string) { }
  }

  export class statusSet {
    readonly type = Types.STATUS_SET;
    constructor(public entityId: string, public status: EOriginalStatus) { }
  }

  export class statusAdd {
    readonly type = Types.STATUS_ADD;
    constructor(public entityId: string, public status: EOriginalStatus) { }
  }

  export class statusReplace {
    readonly type = Types.STATUS_REPLACE;
    constructor(public entityId: string, public statusOld: EOriginalStatus, public statusNew: EOriginalStatus) { }
  }

  export type Actions = originalAdd
    | statusSet
    | statusAdd
    | statusReplace;
}
