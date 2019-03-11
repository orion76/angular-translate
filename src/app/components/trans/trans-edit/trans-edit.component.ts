import { Component, OnInit, NgModule, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ITranslateData } from '../../../library/common';
import { TRANS_SERVICE } from '../../../services/injection-tokens';
import { ITransCommonService } from '../../../services/trans-common.service';



@Component({
  selector: 'app-trans-edit',
  template: `

  <div class="trans-edit-original-view">
    {{original}}
  </div>
  <div class="trans-edit-translated-edit">
    <textarea [(ngModel)]="translated" [rows]="5" [cols]="30" pInputTextarea autoResize="autoResize"></textarea>
  </div>

  `
})
export class TransEditComponent implements OnInit, OnChanges {

  public translated: string;
  public original: string;

  @Input() data: ITranslateData;

  constructor(
    @Inject(TRANS_SERVICE) protected service: ITransCommonService,
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;

    if (data.currentValue) {
      this.initData(data.currentValue);
    }
  }

  private initData(data: ITranslateData) {
    this.original = data.original;
    this.translated = data.translated;
  }
}


@NgModule({
  declarations: [TransEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextareaModule,
  ],
  exports: [TransEditComponent]
})
export class TransEditModule { }
