import { Component, OnInit, NgModule, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransContentAbstract } from '../../../library/trans-content-abstract';
import { ITranslateData, TTranslateMode } from '../../../library/common';
import { TransCommonService, ITransCommonService } from '../../../services/trans-common.service';
import { TRANS_SERVICE } from '../../../services/injection-tokens';


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


  constructor(
    @Inject(TRANS_SERVICE) protected service: ITransCommonService,
    protected renderer: Renderer2
  ) {
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
