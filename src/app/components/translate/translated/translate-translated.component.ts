import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Input, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ETranslatedEvents, ISelectedTranslateString } from '../../../library/common';
import { TransContentAbstract } from '../../../library/trans-content-abstract';
import { TRANSLATED_SERVICE, USER_SERVICE } from '../../../services/injection-tokens';
import { ITranslatedService } from '../../../services/translated.service';
import { ITranslatedLineEntity } from '../../../types/trans';
import { IUserService } from '../../../types/user';



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
  @Input() lines: Map<string, ITranslatedLineEntity>;

  @ViewChild("content")
  content: ElementRef;


  constructor(
    @Inject(USER_SERVICE) private user: IUserService,
    @Inject(TRANSLATED_SERVICE) protected service: ITranslatedService,
    protected renderer: Renderer2
  ) {
    super(service, renderer);
  }

  ngOnInit() {
    super.ngOnInit()
    this.service.onEvent(ETranslatedEvents.TRANSLATED_UPDATE_COMPLETE).subscribe((event: ISelectedTranslateString) => {
      const { transId } = event;

      this.elements.get(transId).textContent = this.lines.get(transId).content;
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
