import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Input, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IIdsOriginal } from '@app-library/store/types';
import { TransContentAbstract } from '@app-library/trans-content-abstract';
import { TRANSLATE_SERVICE, USER_SERVICE } from '@app/services/injection-tokens';
import { ITranslateService } from '@app/services/translate.service';
import { IEntityOriginal, IUser, IUserService, EEntityType } from '@app/types';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';



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

  }

  onIds(): Observable<IIdsOriginal> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('originalId')),
      filter(Boolean),
      map((entityId: string) => ({ type: EEntityType.original, entityId }))
    )
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
