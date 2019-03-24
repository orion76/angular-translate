import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransNewInsertHTMLModule } from '@app-components/trans-new/insert-html/insert-html.component';
import { ISourceParseService } from '@app-services/source-parse.service';
import { SOURFCE_PARSE_SERVICE, TRANSLATE_SERVICE } from '@app/services/injection-tokens';
import { ITranslateService } from '@app/services/translate.service';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-trans-new',
  template: `
<div class="trans-new-component">
  <div class="trans-new-url-wrapper">
<p-toolbar>
    <div class="ui-toolbar-group-left">
        <button pButton type="button" label="Insert HTML"  (click)="insertHTML($event)" icon="pi pi-plus"></button>

    </div>

    <div class="ui-toolbar-group-right">
    <button pButton type="button" label="Load" (click)="Load($event)"></button>
    </div>
</p-toolbar>
  </div>
  <div class="trans-new-button-save-wrapper">

  </div>
  <div class="trans-source">
  <ckeditor [(ngModel)]="content" [editor]="Editor" data="<p>Hello, world!</p>"></ckeditor>
    <!-- p-editor [(ngModel)]="content" [style]="{'height':'320px'}"></p-editor -->
  </div>
</div>
<trans-new-insert-html [(display)]="displayInsertDialog" [(content)]="content"></trans-new-insert-html>
`
})
export class TransNewComponent implements OnInit {

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
