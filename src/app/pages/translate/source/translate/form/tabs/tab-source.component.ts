import {CommonModule} from '@angular/common';
import {Component, ElementRef, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ButtonModule} from 'primeng/button';
import {EditorModule} from 'primeng/editor';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';
import {ISourceEntityTranslate} from '@app/types';
import * as Immutable from 'immutable';
import {TransNewInsertHTMLModule} from '../../dialog/insert-html/insert-html-dialog.component';
import {TabViewModule} from 'primeng/tabview';

@Component({
  selector: 'translate-tab-source',
  templateUrl: 'tab-source.component.html'
})
export class TabSourceComponent implements OnInit {
  public pageTitle = 'New source';
  public content = '';
  public editor = ClassicEditor;
  @ViewChild('source') source: ElementRef;
  public displayInsertDialog = false;
  public entity: Immutable.RecordOf<ISourceEntityTranslate>;
  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit() {


  }


  insertHTML() {
    this.displayInsertDialog = true;
  }

  createTranslate() {

  }
}

@NgModule({
  declarations: [TabSourceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    CKEditorModule,
    TabViewModule,
    EditorModule,
    InputTextareaModule,
    InputTextModule,
    TransNewInsertHTMLModule,
  ],
  exports: [TabSourceComponent]
})
export class TabSourceModule {
}
