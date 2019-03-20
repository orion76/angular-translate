import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Input, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TransContentAbstract } from '@app-lib/trans-content-abstract';
import { TRANSLATE_SERVICE, USER_SERVICE } from '@app/services/injection-tokens';
import { ITranslateService } from '@app/services/translate.service';
import { ActivatedRoute } from '@angular/router';
import { IUserService, IEntityOriginal } from '@app/types';



@Component({
  selector: 'app-trans-original',
  template: `
  <p-scrollPanel styleClass="trans-content" >
    nodesCount: {{nodesCount}}
    <div #content></div>
    </p-scrollPanel>
  `
})
export class TransOriginalComponent extends TransContentAbstract implements OnInit {
  @Input() entity: IEntityOriginal;
  // @Input() lines: Map<string, IOriginalLineEntity>;
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
    super.ngOnInit();
    this.initOriginalId();

  }



}

@NgModule({
  declarations: [TransOriginalComponent],
  imports: [
    CommonModule,
    ScrollPanelModule,
  ],
  exports: [TransOriginalComponent]
})
export class TransOriginalModule { }
