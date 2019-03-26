import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITranslateData } from '@app-library/common';
import { IUserService, USER_SERVICE } from '@app-library/user';
import { DataService, IDataService } from '@app/services/data.service';
import { ITranslateService, TranslateService } from '@app/services/translate.service';
import { EEntityType, IEntityTranslate} from '@app/types';
import { ITranslateProcess, TRANSLATED_PROCESS, TranslateProcess } from '@pages/translate/process/translate-process';
import { CardModule } from 'primeng/card';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DATA_SERVICE, SOURFCE_PARSE_SERVICE, TRANSLATE_SERVICE } from '../../services/injection-tokens';
import { SourceParseService } from '../../services/source-parse.service';
import { TransEditModule } from './edit/translate-edit.component';
import { TransOriginalModule } from './original/translate-original.component';
import { TransTranslatedModule } from './translated/translate-translated.component';


@Component({
  selector: 'app-trans',
  template: `
  <p-card header="Content" >
    <div class="trans-wrapper">
      <div class="trans-original-wrapper  trans-content-block trans-block">
        <app-trans-original class="trans-original" [entity$]="entityOriginal$" ></app-trans-original>
      </div>

      <div class="trans-translated-wrapper  trans-content-block trans-block">
        <app-trans-translated class="trans-translated" [entity$]="entityTranslated$"></app-trans-translated>
      </div>

      <div class="trans-edit-wrapper  trans-block">
        <app-trans-edit class="trans-edit" [data]="selected"></app-trans-edit>
      </div>
    </div>
  </p-card>
  `
})
export class TranslateComponent implements OnInit {

  source: string;

  selected: ITranslateData;

  private originalSubject = new BehaviorSubject<IEntityTranslate>(null);
  private translatedSubject = new BehaviorSubject<IEntityTranslate>(null);

  private entityOriginal$: Observable<IEntityTranslate> = this.originalSubject.asObservable();
  private entityTranslated$: Observable<IEntityTranslate> = this.translatedSubject.asObservable();

  translateData: Map<string, ITranslateData> = new Map();

  constructor(
    @Inject(TRANSLATED_PROCESS) private process: ITranslateProcess,
    @Inject(USER_SERVICE) private user: IUserService,

    @Inject(TRANSLATE_SERVICE) private service: ITranslateService,
    @Inject(DATA_SERVICE) private data: IDataService,
    protected route: ActivatedRoute,
  ) { }

  ngOnInit() {



    this.route.paramMap
      .pipe(
        map((params: ParamMap) => params.get('originalId')),
        filter(Boolean)
      )
      .subscribe((originalId: string) => {
        console.log('[1.setOriginalId]', originalId);
        this.service.setOriginalId(originalId);

        this.service
          .onLoad(EEntityType.original, originalId)
          .subscribe((entity: IEntityTranslate) => {
            this.originalSubject.next(entity);
          })

        this.service
          .onLoad(EEntityType.translated, originalId)
          .subscribe((entity: IEntityTranslate) => {
            this.translatedSubject.next(entity);
          })

      })
  }

  getDOM(template: string) {
    const parser = new DOMParser();
    return parser.parseFromString(template, 'text/html').body;
  }

}

@NgModule({
  declarations: [TranslateComponent],
  imports: [
    CommonModule,
    CardModule,
    TransOriginalModule,
    TransTranslatedModule,
    TransEditModule
  ],
  exports: [TranslateComponent],
  providers: [
    { provide: TRANSLATED_PROCESS, useClass: TranslateProcess },
    { provide: TRANSLATE_SERVICE, useClass: TranslateService },
    { provide: DATA_SERVICE, useClass: DataService },
    { provide: SOURFCE_PARSE_SERVICE, useClass: SourceParseService },

  ]
})
export class TransModule { }
