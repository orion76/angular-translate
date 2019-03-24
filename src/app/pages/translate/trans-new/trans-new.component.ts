import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISourceParseService } from '@app-services/source-parse.service';
import { SOURFCE_PARSE_SERVICE, TRANSLATE_SERVICE } from '@app/services/injection-tokens';
import { ITranslateService } from '@app/services/translate.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TransNewInsertHTMLModule } from './insert-html/insert-html.component';
@Component({
  selector: 'app-trans-new',
  templateUrl: 'trans-new.component.html'
})
export class TransNewComponent implements OnInit {
  public pageTitle = "New source";
  public content = '';
  public Editor = ClassicEditor;
  @ViewChild("source") source: ElementRef;

  public displayInsertDialog = false;

  constructor(
    @Inject(TRANSLATE_SERVICE) protected service: ITranslateService,
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {


  }
  insertHTML() {
    this.displayInsertDialog = true;
  }

}

@NgModule({
  declarations: [TransNewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    CKEditorModule,
    EditorModule,
    InputTextareaModule,
    InputTextModule,
    TransNewInsertHTMLModule,
  ],
  exports: [TransNewComponent]
})
export class TransNewModule { }
