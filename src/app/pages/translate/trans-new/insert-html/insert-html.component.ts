import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISourceParseService } from '@app-services/source-parse.service';
import { SOURFCE_PARSE_SERVICE } from '@app/services/injection-tokens';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';

export type IEventType = 'show' | 'done';
export interface IEvent {
  type: IEventType,
  value: any
}

@Component({
  selector: 'trans-new-insert-html',
  template: `
  <p-dialog
    [header]="title"
    [(visible)]="display"
    [style]="{width: '90%', height: '90%'}"
    >

    <div class="trans-new-insert-html-component">
      <div class="insert-htm-url-wrapper">
        <label for="url">
        URL:
          <input name="url" type="text" pInputText [(ngModel)]="url"/>
        </label>
      </div>

      <div class="trans-new-content-wrapper">
        <textarea  [(ngModel)]="content"
        pInputTextarea
        [rows]="15"
        class="trans-new-content"
        >
        </textarea>
      </div>
    </div>
  <p-toolbar>
    <div class="ui-toolbar-group-right">
      <button pButton type="button" label="Done" (click)="onDone($event)" class="ui-button-info"></button>
      <button pButton type="button" label="Cancel" (click)="onCancel($event)" class="ui-button-warning"></button>
    </div>
  </p-toolbar>
</p-dialog>
`
})
export class TransNewInsertHTMLComponent implements OnInit {
  @Input() title = 'Insert HTML';

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() content: string;
  @Output() contentChange = new EventEmitter<string>();

  public url: string = 'https://drupal.ru/tracker';

  constructor(
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService
  ) { }

  ngOnInit() {

  }

  onCancel() {
    this.close();
  }
  onDone() {
    if (this.content.length > 0) {
      this.close();
      this.contentChange.emit(this.parser.prepareHTMLSource(this.content, this.url));
    }
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}

@NgModule({
  declarations: [TransNewInsertHTMLComponent],
  imports: [
    CommonModule,
    FormsModule,
    EditorModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
  ],
  exports: [TransNewInsertHTMLComponent]
})
export class TransNewInsertHTMLModule { }
