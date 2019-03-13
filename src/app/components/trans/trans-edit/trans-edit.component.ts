import { CommonModule } from '@angular/common';
import { Component, Inject, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { EEvents, ITranslateData } from '../../../library/common';
import { TRANSLATED_SERVICE } from '../../../services/injection-tokens';
import { ITranslatedService } from '../../../services/translated.service';




@Component({
  selector: 'app-trans-edit',
  template: `


    <p-card header="Original" class="trans-edit-original-view">
      {{original}}
    </p-card>


    <p-card header="Translate" class="trans-edit-translated-edit">
    <p-toolbar>
        <div class="ui-toolbar-group-left">
            <button pButton type="button" label="Update" icon="pi pi-plus" (click)="handleOnUpdate($event)"></button>

        </div>
<!--
        <div class="ui-toolbar-group-right">
            <button pButton type="button" icon="pi pi-search"></button>
            <button pButton type="button" icon="pi pi-calendar" class="ui-button-success"></button>
            <button pButton type="button" icon="pi pi-times" class="ui-button-danger"></button>
        </div>
-->
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
    @Inject(TRANSLATED_SERVICE) protected service: ITranslatedService,
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;

    if (data.currentValue) {
      this.initData(data.currentValue);
    }
  }

  handleOnUpdate(event: any) {
    this.service.do(EEvents.TRANSLATED_UPDATE, this.data.transId, this.translated)
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
