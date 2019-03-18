import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Input, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ELineEvent, ISelectedLine, ILineEvent } from '@app-lib/common';
import { TransContentAbstract } from '@app-lib/trans-content-abstract';
import { TRANSLATE_SERVICE, USER_SERVICE } from '@app/services/injection-tokens';
import { ITranslateService } from '@app/services/translate.service';
import { IUserService, ITranslatedLineEntity } from '@app/types';
import { ActivatedRoute } from '@angular/router';



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
    protected route: ActivatedRoute,
    @Inject(USER_SERVICE) private user: IUserService,
    @Inject(TRANSLATE_SERVICE) protected service: ITranslateService,
    protected renderer: Renderer2
  ) {
    super(route, service, renderer);
  }

  ngOnInit() {
    super.ngOnInit()
    // this.service.onEvent(ELineEvent.TRANSLATED_UPDATE_COMPLETE).subscribe((event: ILineEvent) => {
    //   const { lineId } = event;

    //   this.elements.get(lineId).textContent = this.lines.get(lineId).content;
    //   console.log('[TRANSLATED_UPDATE_COMPLETE]', lineId);
    // })
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
