import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TRANSLATE_SERVICE, SOURFCE_PARSE_SERVICE } from '@app/services/injection-tokens';
import { ITranslateService } from '@app/services/translate.service';
import { EditorModule } from 'primeng/editor';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ISourceParseService } from '@app-services/source-parse.service';


@Component({
  selector: 'app-trans-new',
  template: `
<div class="trans-new-component">
  <div class="trans-new-url-wrapper">
    <label for="url">
      <input name="url" type="text" pInputText [(ngModel)]="url"/>
    </label>
  </div>
  <div class="trans-new-button-save-wrapper">
    <button pButton type="button" label="Load" (click)="Load($event)"></button>
  </div>
  <p-toggleButton
    [(ngModel)]="editMode"
    (onChange)="changeMode($event)"
    onLabel="Source"
    offLabel="Edit">
  </p-toggleButton>
  <div *ngIf="editMode" class="trans-source">
    <p-editor [(ngModel)]="content" [style]="{'height':'320px'}"></p-editor>
  </div>
  <div *ngIf="!editMode"  class="trans-new-content-wrapper">
    <textarea  [(ngModel)]="contentSource"
    pInputTextarea
    autoResize="autoResize"
    [rows]="15"
    class="trans-new-content"
    >
    </textarea>
  </div>
</div>
`
})
export class TransNewComponent implements OnInit {

  private _contentEditor = '';
  private _contentSource = '';

  get content() {
    return this._contentEditor;
  }

  set content(content: string) {
    this._contentEditor = content;
  }

  get contentSource() {
    return this._contentSource;
  }

  set contentSource(content: string) {
    this._contentSource = content;
    this.editMode = true;
    this.content = this.contentSource;

    this.parser.prepareLinks(content, this.url);

  }


  public url: string = 'https://drupal.ru/tracker';

  public editMode: boolean = false;

  @ViewChild("source") source: ElementRef;
  constructor(
    @Inject(TRANSLATE_SERVICE) protected service: ITranslateService,
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {


  }

  prepareSource() {

  }

  changeMode(edit: any) {
    if (edit.checked) {
      this.content = this.contentSource;
      this.editMode = true;
    } else {
      this.contentSource = this.content;
      this.editMode = false;
    }
  }

  Load() {

    this.renderer.setAttribute(this.source.nativeElement, 'data', this.url);
  }
  Save() {
    // this.content = '';
  }
}

@NgModule({
  declarations: [TransNewComponent],
  imports: [
    CommonModule,
    FormsModule,
    EditorModule,
    ToggleButtonModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [TransNewComponent]
})
export class TransNewModule { }
