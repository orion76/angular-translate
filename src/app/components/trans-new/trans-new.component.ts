import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TRANSLATE_SERVICE } from '@app/services/injection-tokens';
import { ITranslateService } from '@app/services/translate.service';





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
    <button pButton type="button" label="Save" (click)="Save($event)"></button>
  </div>
  <div class="trans-new-content-wrapper">
    <textarea  [(ngModel)]="content"
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
  public content: string = '';
  public url: string = '';

  constructor(
    @Inject(TRANSLATE_SERVICE) protected service: ITranslateService,
  ) { }

  ngOnInit() {


  }
  Save() {
    this.content = '';
  }
}

@NgModule({
  declarations: [TransNewComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [TransNewComponent]
})
export class TransNewModule { }
