import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { ITranslateProcess, TranslateProcess } from '@app/components/translate/process/translate-process';
import { ITranslateService, TranslateService } from '@app/services/translate.service';
import { CardModule } from 'primeng/card';
import { ITranslateData } from '../../library/common';
import { DataService, IDataService } from '../../services/data.service';
import { DATA_SERVICE, SOURFCE_PARSE_SERVICE, TRANSLATED_PROCESS, TRANSLATE_SERVICE, USER_SERVICE } from '../../services/injection-tokens';
import { SourceParseService } from '../../services/source-parse.service';
import { IOriginalEntity, ITranslatedEntity } from '../../types/trans';
import { IUserService } from '../../types/user';
import { TransEditModule } from './edit/translate-edit.component';
import { TransOriginalModule } from './original/translate-original.component';
import { TransTranslatedModule } from './translated/translate-translated.component';


@Component({
  selector: 'app-trans',
  template: `
  <p-card header="Content" >
    <div class="trans-wrapper">
      <div class="trans-original-wrapper  trans-content-block trans-block">
        <app-trans-original class="trans-original" [dom]="getDOM()"  [lines]="entityOriginal.lines"></app-trans-original>
      </div>

      <div class="trans-translated-wrapper  trans-content-block trans-block">
        <app-trans-translated class="trans-translated" [dom]="getDOM()" [lines]="entityTranslated.lines"></app-trans-translated>
      </div>

      <div class="trans-edit-wrapper  trans-block">
        <app-trans-edit class="trans-edit" [data]="selected"></app-trans-edit>
      </div>
    </div>
  </p-card>
  `
})
export class TransComponent implements OnInit {

  source: string;

  selected: ITranslateData;

  private entityOriginal: IOriginalEntity;
  private entityTranslated: ITranslatedEntity;

  translateData: Map<string, ITranslateData> = new Map();

  constructor(
    @Inject(TRANSLATED_PROCESS) private process: ITranslateProcess,
    @Inject(USER_SERVICE) private user: IUserService,

    @Inject(TRANSLATE_SERVICE) private service: ITranslateService,
    @Inject(DATA_SERVICE) private data: IDataService
  ) { }

  ngOnInit() {


  }

  getDOM() {
    const parser = new DOMParser();
    return parser.parseFromString(this.entityOriginal.template, 'text/html').body;
  }

}

@NgModule({
  declarations: [TransComponent],
  imports: [
    CommonModule,
    CardModule,
    TransOriginalModule,
    TransTranslatedModule,
    TransEditModule
  ],
  exports: [TransComponent],
  providers: [

    { provide: TRANSLATE_SERVICE, useClass: TranslateService },
    { provide: DATA_SERVICE, useClass: DataService },
    { provide: SOURFCE_PARSE_SERVICE, useClass: SourceParseService },
    { provide: TRANSLATED_PROCESS, useClass: TranslateProcess },
  ]
})
export class TransModule { }
