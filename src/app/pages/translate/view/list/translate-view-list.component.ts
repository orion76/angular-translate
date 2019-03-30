import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { TRANSLATE_SERVICE } from '@app-services/injection-tokens';
import { ITranslateService } from '@app-services/translate.service';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';



@Component({
  selector: 'app-trans-view-list',
  template: `
<h1>Translate list</h>


  `
})
export class TransViewListComponent implements OnInit {

  public translated: string;
  public original: string;



  constructor(
    @Inject(TRANSLATE_SERVICE) protected service: ITranslateService,
  ) { }

  ngOnInit() {
  }


  handleOnUpdate(event: any) {
    // this.service.do(ELineEvent.TRANSLATED_UPDATE, this.data.transId, this.translated)
  }

}


@NgModule({
  declarations: [TransViewListComponent],
  imports: [
    CommonModule,
    TreeTableModule,
    ButtonModule,
  ],
  exports: [TransViewListComponent]
})
export class TransViewListModule { }
