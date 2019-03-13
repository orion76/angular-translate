import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Input, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TransContentAbstract } from '../../../library/trans-content-abstract';
import { TRANSLATED_SERVICE, USER_SERVICE } from '../../../services/injection-tokens';
import { ITranslatedService } from '../../../services/translated.service';
import { ILineOriginalEntity } from '../../../types/trans';
import { IUserService } from '../../../types/user';



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
  @Input() dom: HTMLElement;
  @Input() lines: Map<string, ILineOriginalEntity>;
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
    super.ngOnInit();


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
