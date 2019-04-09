import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Inject, Input, NgModule, OnInit, Output} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ISourceParseService} from '@app-services/source-parse.service';
import {SOURFCE_PARSE_SERVICE} from '@app/services/injection-tokens';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {EditorModule} from 'primeng/editor';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';

export type IEventType = 'show' | 'done';

export interface IEvent {
  type: IEventType;
  value: any;
}

@Component({
  selector: 'insert-html-dialog',
  templateUrl: 'insert-html-dialog.component.html'
})
export class TransNewInsertHTMLComponent implements OnInit {
  @Input() title = 'Insert HTML';

  @Input() display = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() form: FormGroup;
  @Input() formField: string;

  public url = 'https://www.drupal.org/about';

  constructor(
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService
  ) {
  }

  ngOnInit() {

  }

  onCancel() {
    this.close();
  }

  onDone() {

    this.close();


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
    ReactiveFormsModule,
    EditorModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
  ],
  exports: [TransNewInsertHTMLComponent]
})
export class TransNewInsertHTMLModule {
}
