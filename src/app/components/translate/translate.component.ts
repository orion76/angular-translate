import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ETranslatedEvents, ISelectedTranslateString, ITranslateData } from '../../library/common';
import { DataService, IDataService } from '../../services/data.service';
import { DATA_SERVICE, ORIGINAL_SERVICE, SOURFCE_PARSE_SERVICE, TRANSLATED_SERVICE, USER_SERVICE, TRANSLATED_PROCESS } from '../../services/injection-tokens';
import { IOriginalService, OriginalService } from '../../services/original.service';
import { SourceParseService } from '../../services/source-parse.service';
import { ITranslatedService, TranslatedService } from '../../services/translated.service';
import { ESources, IOriginalEntity, ITranslatedEntity } from '../../types/trans';
import { IUserService, IUser } from '../../types/user';
import { TransEditModule } from './edit/translate-edit.component';
import { TransOriginalModule } from './original/translate-original.component';
import { TransTranslatedModule } from './translated/translate-translated.component';
import { TranslateProcess, ITranslateProcess } from '@components/translate/process/translate-process';



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
    @Inject(ORIGINAL_SERVICE) private original: IOriginalService,
    @Inject(TRANSLATED_SERVICE) private translated: ITranslatedService,
    @Inject(DATA_SERVICE) private data: IDataService
  ) { }

  ngOnInit() {

    this.user.onLoaded().subscribe((user: IUser) => {
      this.process.dispatch(new )
    })

    /** TODO Реализовать загрузку реальной Entity */
    this.data.getItem(ESources.ORIGINAL, '111')
      .subscribe((entity: IOriginalEntity) => {
        this.entityOriginal = entity
      });

    this.data.getItem(ESources.TRANSLATED, '111')
      .subscribe((entity: ITranslatedEntity) => {
        this.entityTranslated = entity
      });


    this.translated.onEvent(ETranslatedEvents.MOUSE_DOWN).subscribe((event: ISelectedTranslateString) => {
      const { transId } = event;
      this.selected = {
        transId,
        original: this.entityOriginal.lines.get(transId).content,
        translated: this.entityTranslated.lines.get(transId).content,
      }
    })

    this.translated.onEvent(ETranslatedEvents.TRANSLATED_UPDATE).subscribe((event: ISelectedTranslateString) => {
      const { transId, data } = event;
      this.entityOriginal.lines.get(transId).content = data;
      this.translated.do(ETranslatedEvents.TRANSLATED_UPDATE_COMPLETE, transId);
      console.log('[TRANSLATED_UPDATE]', transId, data);
    })

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
    { provide: ORIGINAL_SERVICE, useClass: OriginalService },
    { provide: TRANSLATED_SERVICE, useClass: TranslatedService },
    { provide: DATA_SERVICE, useClass: DataService },
    { provide: SOURFCE_PARSE_SERVICE, useClass: SourceParseService },
    { provide: TRANSLATED_PROCESS, useClass: TranslateProcess },
  ]
})
export class TransModule { }
