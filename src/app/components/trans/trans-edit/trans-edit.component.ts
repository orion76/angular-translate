import { Component, OnInit, NgModule, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CardModule} from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

import { ITranslateData } from '../../../library/common';
import { TRANS_SERVICE } from '../../../services/injection-tokens';
import { ITransCommonService } from '../../../services/trans-common.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-trans-edit',
  template: `


    <p-card header="Original" class="trans-edit-original-view">
      {{original}}
    </p-card>


    <p-card header="Translate" class="trans-edit-translated-edit">
    <p-toolbar>
        <div class="ui-toolbar-group-left">
            <button pButton type="button" label="New" icon="pi pi-plus"></button>
            <button pButton type="button" label="Upload" icon="pi pi-upload" class="ui-button-success"></button>
        </div>

        <div class="ui-toolbar-group-right">
            <button pButton type="button" icon="pi pi-search"></button>
            <button pButton type="button" icon="pi pi-calendar" class="ui-button-success"></button>
            <button pButton type="button" icon="pi pi-times" class="ui-button-danger"></button>
        </div>
    </p-toolbar>
    <textarea [(ngModel)]="translated" [rows]="5" [cols]="30" pInputTextarea autoResize="autoResize"></textarea>
    </p-card>

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
    CardModule,
    ToolbarModule,
    ButtonModule,
    InputTextareaModule,
  ],
  exports: [TransEditComponent]
})
export class TransEditModule { }
