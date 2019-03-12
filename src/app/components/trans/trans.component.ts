import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { transSource } from './source';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ITranslateData, EEvents, ISelectedTranslateString } from '../../library/common';
import { getTextNodes } from '../../library/dom';
import { TransOriginalModule } from './trans-original/trans-original.component';
import { TransTranslatedModule } from './trans-translated/trans-translated.component';
import { TransEditModule } from './trans-edit/trans-edit.component';
import { TransCommonService, ITransCommonService } from '../../services/trans-common.service';
import { TRANS_SERVICE, DATA_SERVICE, SOURFCE_PARSE_SERVICE } from '../../services/injection-tokens';
import { DataService, IDataService } from '../../services/data.service';
import { ITransEntity } from "../../services/ITransItemEntity";
import { SourceParseService } from '../../services/source-parse.service';


@Component({
  selector: 'app-trans',
  template: `
  <p-card header="Content" >
    <div class="trans-wrapper">
      <div class="trans-original-wrapper  trans-content-block trans-block">
        <app-trans-original class="trans-original" [dom]="getDOM()"  [data]="entity.original"></app-trans-original>
      </div>

      <div class="trans-translated-wrapper  trans-content-block trans-block">
        <app-trans-translated class="trans-translated" [dom]="getDOM()" [data]="entity.translated"></app-trans-translated>
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

  private entity: ITransEntity;

  translateData: Map<string, ITranslateData> = new Map();

  constructor(
    @Inject(TRANS_SERVICE) private service: ITransCommonService,
    @Inject(DATA_SERVICE) private data: IDataService
  ) { }

  ngOnInit() {
    this.source = transSource;
    /** TODO Реализовать загрузку реальной Entity */
    this.entity = this.data.getItem('');
    this.service.onEvent(EEvents.MOUSE_DOWN).subscribe((event: ISelectedTranslateString) => {
      const { transId } = event;
      this.selected = {
        transId,
        original: this.entity.original.get(transId).content,
        translated: this.entity.translated.get(transId).content,
      }
    })

    this.service.onEvent(EEvents.TRANSLATED_UPDATE).subscribe((event: ISelectedTranslateString) => {
      const { transId, data } = event;
      this.entity.translated.get(transId).content = data;
      this.service.do(EEvents.TRANSLATED_UPDATE_COMPLETE, transId);
      console.log('[TRANSLATED_UPDATE]', transId, data);
    })

  }

  getDOM() {
    const parser = new DOMParser();
    return parser.parseFromString(this.entity.template, 'text/html').body;
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
    { provide: TRANS_SERVICE, useClass: TransCommonService },
    { provide: DATA_SERVICE, useClass: DataService },
    { provide: SOURFCE_PARSE_SERVICE, useClass: SourceParseService },
  ]
})
export class TransModule { }
