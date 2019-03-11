import { Injectable, Inject } from "@angular/core";
import { SOURFCE_PARSE_SERVICE } from './injection-tokens';
import { ISourceParseService } from './source-parse.service';
import { transSource } from '../components/trans/source';



export interface ITransItemEntity {
  transId: string;
  language: string;
  autorId: string;
  content: string;
  translated: boolean;
}

export interface ITransEntity {
  entityId?: string;
  template: string;
  original: Map<string, ITransItemEntity>;
  translated: Map<string, ITransItemEntity>;
}

export interface IDataService {
  getItem(entityId: string): ITransEntity
}

@Injectable()
export class DataService implements IDataService {
  constructor(
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
  ) {

  }

  getItem(entityId: string): ITransEntity {
    return this.parser.parse(transSource, 'en', '1');
  }
}
