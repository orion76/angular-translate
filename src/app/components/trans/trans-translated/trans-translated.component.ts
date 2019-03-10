import { Component, OnInit, NgModule, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransContentAbstract } from '../../../library/trans-content-abstract';
import { ITranslateData, TTranslateMode } from '../../../library/common';
import { TransCommonService } from '../../../services/trans-common.service';


@Component({
  selector: 'app-trans-translated',
  template: `
    nodesCount: {{nodesCount}}
    <div #content></div>
  `
})
export class TransTranslatedComponent extends TransContentAbstract implements OnInit {
  @Input() dom: HTMLElement;
  @Input() data: Map<string, ITranslateData>;
  @Output() selectedChange = new EventEmitter();
  @ViewChild("content")
  content: ElementRef;


  constructor(service: TransCommonService, protected renderer: Renderer2) {
    super(service, renderer);
  }

  ngOnInit() {
    super.ngOnInit()
  }
  mode: TTranslateMode = 'translated';
}
@NgModule({
  declarations: [TransTranslatedComponent],
  imports: [
    CommonModule
  ],
  exports: [TransTranslatedComponent]
})
export class TransTranslatedModule { }
