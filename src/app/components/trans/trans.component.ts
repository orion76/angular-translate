import { Component, OnInit, NgModule, Renderer2, Inject } from '@angular/core';
import { transSource } from './source';
import { CommonModule } from '@angular/common';
import {CardModule} from 'primeng/card';
import { ITranslateData, EEvents, ISelectedTranslateString } from '../../library/common';
import { getTextNodes } from '../../library/dom';
import { TransOriginalModule } from './trans-original/trans-original.component';
import { TransTranslatedModule } from './trans-translated/trans-translated.component';
import { TransEditModule } from './trans-edit/trans-edit.component';
import { TransCommonService, ITransCommonService } from '../../services/trans-common.service';
import { TRANS_SERVICE } from '../../services/injection-tokens';


@Component({
  selector: 'app-trans',
  template: `
  <p-card header="Content" >
    <div class="trans-wrapper">
      <div class="trans-original-wrapper  trans-content-block trans-block">
        <app-trans-original class="trans-original" [dom]="originalDom"  [data]="translateData"></app-trans-original>
      </div>

      <div class="trans-translated-wrapper  trans-content-block trans-block">
        <app-trans-translated class="trans-translated" [dom]="translatedDom" [data]="translateData"></app-trans-translated>
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

  originalDom: HTMLElement;
  translatedDom: HTMLElement;

  selected: ITranslateData;

  translateData: Map<string, ITranslateData> = new Map();
  private textNodes: HTMLElement[];
  constructor(
    @Inject(TRANS_SERVICE) private service: ITransCommonService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.source = transSource;
    this.initParseDom();
    this.service.onEvent(EEvents.MOUSE_DOWN).subscribe((event: ISelectedTranslateString) => {
      this.selected = this.translateData.get(event.transId);
    })
  }
  initParseDom() {
    const parser = new DOMParser();
    const dom = parser.parseFromString(this.source, 'text/html');

    this.textNodes = getTextNodes(dom);

    let transId = 1;

    this.textNodes.forEach((node: HTMLElement) => {
      const trans = dom.createElement('trans');
      trans.id = `trans-id-${transId}`;

      this.translateData.set(trans.id, {
        original: node.textContent,
        translated: node.textContent
      })

      node.parentNode.replaceChild(trans, node);
      transId++;
    })

    this.translatedDom = parser.parseFromString(dom.body.innerHTML, 'text/html').body;
    this.originalDom = parser.parseFromString(dom.body.innerHTML, 'text/html').body;
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
  ]
})
export class TransModule { }
