import { Component, OnInit, NgModule, Renderer2 } from '@angular/core';
import { transSource } from './source';
import { CommonModule } from '@angular/common';
import { ITranslateData } from '../../library/common';
import { getTextNodes } from '../../library/dom';
import { TransOriginalModule } from './trans-original/trans-original.component';
import { TransTranslatedModule } from './trans-translated/trans-translated.component';
import { TransEditModule } from './trans-edit/trans-edit.component';
import { TransCommonService } from '../../services/trans-common.service';






@Component({
  selector: 'app-trans',
  template: `
  <div class="trans-wrapper">
    <div class="trans-original-wrapper  trans-content-block trans-block">
      <app-trans-original class="trans-original" [dom]="originalDom"  [data]="translateData"></app-trans-original>
    </div>
    <div class="trans-translated-wrapper  trans-content-block trans-block">
      <app-trans-translated class="trans-translated" [dom]="translatedDom" [data]="translateData"></app-trans-translated>
    </div>
    <div class="trans-edit-wrapper  trans-block">
      <app-trans-edit class="trans-edit" ></app-trans-edit>
    </div>
  </div>
  `
})
export class TransComponent implements OnInit {

  source: string;

  originalDom: HTMLElement;
  translatedDom: HTMLElement;

  translateData: Map<string, ITranslateData> = new Map();
  private textNodes: HTMLElement[];
  constructor(service: TransCommonService, private renderer: Renderer2) { }

  ngOnInit() {
    this.source = transSource;
    const parser = new DOMParser();
    const dom = parser.parseFromString(this.source, 'text/html');

    this.textNodes = getTextNodes(dom);

    let transId = 1;

    this.textNodes.forEach((node: HTMLElement) => {
      const trans = dom.createElement('trans');
      trans.id = `trans-id-${transId}`;

      this.translateData.set(trans.id, {
        origin: node.textContent,
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
    TransOriginalModule,
    TransTranslatedModule,
    TransEditModule
  ],
  exports: [TransComponent],
  providers: []
})
export class TransModule { }
