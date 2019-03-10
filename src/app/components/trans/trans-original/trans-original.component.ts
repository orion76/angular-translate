import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, ElementRef, Renderer2, Output, EventEmitter, ViewChild } from '@angular/core';
import { TransContentAbstract } from '../../../library/trans-content-abstract';
import { ITranslateData, ISelectedTranslateString, TTranslateMode } from '../../../library/common';
import { TransCommonService } from '../../../services/trans-common.service';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-trans-original',
  template: `
    nodesCount: {{nodesCount}}
    <div #content></div>
  `
})
export class TransOriginalComponent extends TransContentAbstract implements OnInit {
  @Input() dom: HTMLElement;
  @Input() data: Map<string, ITranslateData>;
  @ViewChild("content")
  content: ElementRef;


  constructor(protected service: TransCommonService, protected renderer: Renderer2) {
    super(service, renderer);
  }
  mode: TTranslateMode = 'original';

  ngOnInit() {
    super.ngOnInit();


  }



}

@NgModule({
  declarations: [TransOriginalComponent],
  imports: [
    CommonModule
  ],
  exports: [TransOriginalComponent]
})
export class TransOriginalModule { }
