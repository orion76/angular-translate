import { Component, OnInit, NgModule, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ITranslateData } from '../../../library/common';



@Component({
  selector: 'app-trans-edit',
  template: `
<div class="row">
  <div class="trans-edit-original-view">
    {{original}}
  </div>
<div class="trans-edit-translated-edit">
  <textarea [(ngModel)]="translated" [rows]="5" [cols]="30" pInputTextarea autoResize="autoResize"></textarea>
</div>


</div>
  `
})
export class TransEditComponent implements OnInit, OnChanges {

  public translated: string;
  public original: string;
  @Input() data: ITranslateData;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    const { dataChange } = changes;
    if (dataChange.currentValue) {
      this.initData(dataChange.currentValue);
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
