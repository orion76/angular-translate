import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { EEvents, ISelectedTranslateString, ITranslateData } from '../../library/common';
import { DataService, IDataService } from '../../services/data.service';
import { DATA_SERVICE, SOURFCE_PARSE_SERVICE, TRANSLATED_SERVICE, USER_SERVICE } from '../../services/injection-tokens';
import { SourceParseService } from '../../services/source-parse.service';
import { ITranslatedService, TranslatedService } from '../../services/translated.service';
import { ESources, ITranslateOriginalEntity, ITranslateTranslatedEntity } from '../../types/trans';
import { IUserService } from '../../types/user';
import { TransEditModule } from './trans-edit/trans-edit.component';
import { TransOriginalModule } from './trans-original/trans-original.component';
import { TransTranslatedModule } from './trans-translated/trans-translated.component';



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

  private entityOriginal: ITranslateOriginalEntity;
  private entityTranslated: ITranslateTranslatedEntity;

  translateData: Map<string, ITranslateData> = new Map();

  constructor(
    @Inject(USER_SERVICE) private user: IUserService,
    @Inject(TRANSLATED_SERVICE) private service: ITranslatedService,
    @Inject(DATA_SERVICE) private data: IDataService
  ) { }

  ngOnInit() {

    /** TODO Реализовать загрузку реальной Entity */
    this.data.getItem(ESources.ORIGINAL, '111')
      .subscribe((entity: ITranslateOriginalEntity) => {
        this.entityOriginal = entity
      });

    this.data.getItem(ESources.TRANSLATED, '111')
      .subscribe((entity: ITranslateTranslatedEntity) => {
        this.entityTranslated = entity
      });


    this.service.onEvent(EEvents.MOUSE_DOWN).subscribe((event: ISelectedTranslateString) => {
      const { transId } = event;
      this.selected = {
        transId,
        original: this.entityOriginal.lines.get(transId).content,
        translated: this.entityTranslated.lines.get(transId).content,
      }
    })

    this.service.onEvent(EEvents.TRANSLATED_UPDATE).subscribe((event: ISelectedTranslateString) => {
      const { transId, data } = event;
      this.entityOriginal.lines.get(transId).content = data;
      this.service.do(EEvents.TRANSLATED_UPDATE_COMPLETE, transId);
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
    { provide: TRANSLATED_SERVICE, useClass: TranslatedService },
    { provide: DATA_SERVICE, useClass: DataService },
    { provide: SOURFCE_PARSE_SERVICE, useClass: SourceParseService },
  ]
})
export class TransModule { }
