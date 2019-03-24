import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Input, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TransContentAbstract } from '@app-library/trans-content-abstract';
import { TRANSLATE_SERVICE } from '@app/services/injection-tokens';
import { ITranslateService } from '@app/services/translate.service';
import { IEntityOriginal } from '@app/types';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Observable } from 'rxjs';
import { IUserService, USER_SERVICE } from '@app-library/user';



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
  @Input() entity$: Observable<IEntityOriginal>;
  // @Input() lines: Map<string, IOriginalLineEntity>;
  @ViewChild("content") content: ElementRef;


  constructor(

    @Inject(USER_SERVICE) private user: IUserService,
    @Inject(TRANSLATE_SERVICE) protected service: ITranslateService,
    protected renderer: Renderer2
  ) {
    super(service, renderer);
  }

  ngOnInit() {
    super.ngOnInit();
    // this.route.paramMap
    //   .pipe(
    //     map((params: ParamMap) => params.get('originalId')),
    //     filter(Boolean)
    //   )
    //   .subscribe((originalId: string) => {
    //     this.service.completeOriginalId(originalId)
    //   })
  }

  // onIds(): Observable<IIdsOriginal> {
  //   return this.route.paramMap.pipe(
  //     map((params: ParamMap) => params.get('originalId')),
  //     filter(Boolean),
  //     map((entityId: string) => ({ type: EEntityType.original, entityId }))
  //   )
  // }

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
