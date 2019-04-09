import {CommonModule} from '@angular/common';
import {Component, ElementRef, Inject, Input, NgModule, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TransContentAbstract} from '@app-library/trans-content-abstract';
import {IUserService, USER_SERVICE} from '@app-library/user';
import {TRANSLATE_SERVICE} from '@app/services/injection-tokens';
import {ITranslateService} from '@app/services/translate.service';
import {ISourceEntityTranslate} from '@app/types';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {Observable} from 'rxjs';


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
  @Input() entity$: Observable<ISourceEntityTranslate>;
  // @Input() lines: Map<string, ILineEntityTranslated>;

  @ViewChild('content')
  content: ElementRef;


  constructor(
    @Inject(USER_SERVICE) private user: IUserService,
    @Inject(TRANSLATE_SERVICE) protected service: ITranslateService,
    protected renderer: Renderer2
  ) {
    super(service, renderer);
  }

  ngOnInit() {
    super.ngOnInit();
    // this.service.onEvent(ELineEvent.TRANSLATED_UPDATE_COMPLETE).subscribe((event: ILineEvent) => {
    //   const { lineId } = event;

    //   this.elements.get(lineId).textContent = this.lines.get(lineId).content;
    //   console.log('[TRANSLATED_UPDATE_COMPLETE]', lineId);
    // })
  }
  // onIds(): Observable<IIdsTranslated> {
  //   this.service.onLo
  // }
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
