import { Component, OnInit, NgModule, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransContentAbstract } from '../../../library/trans-content-abstract';

import { ITransCommonService } from '../../../services/trans-common.service';
import { TRANS_SERVICE } from '../../../services/injection-tokens';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ITransItemEntity } from "../../../services/ITransItemEntity";
import { EEvents, ISelectedTranslateString } from '../../../library/common';

@Component({
  selector: 'app-trans-translated',
  template: `
   <p-scrollPanel styleClass="trans-content" >
    nodesCount: {{nodesCount}}
    <div #content></div>
    </p-scrollPanel>
  `
})
export class TransTranslatedComponent extends TransContentAbstract implements OnInit {
  @Input() dom: HTMLElement;
  @Input() data: Map<string, ITransItemEntity>;

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
    this.service.onEvent(EEvents.TRANSLATED_UPDATE_COMPLETE).subscribe((event: ISelectedTranslateString) => {
      const { transId } = event;

      this.elements.get(transId).textContent = this.data.get(transId).content;
      console.log('[TRANSLATED_UPDATE_COMPLETE]', transId);
    })
  }

}
@NgModule({
  declarations: [TransTranslatedComponent],
  imports: [
    CommonModule,
    ScrollPanelModule,
  ],
  exports: [TransTranslatedComponent]
})
export class TransTranslatedModule { }
