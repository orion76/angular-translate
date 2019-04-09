import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementLabelModule, TLabelPosition } from './label-input';

@Component({
  selector: 'form-element',
  template: `
        <div *ngIf="!hidden" class="form-field ui-g" >
           <label-input [text]="label" [description]="description" [position]="label_position" class="ui-md-2"></label-input>
           <ng-content></ng-content>
      </div>
`
})
export class FormElementComponent {
  @Input() hidden: boolean;
  @Input() label: string;
  @Input() label_position: TLabelPosition;
  @Input() description: string;

}

@NgModule({
  declarations: [FormElementComponent],
  imports: [
    CommonModule,
    FormElementLabelModule,
  ],
  exports: [FormElementComponent]
})
export class FormElementModule { }
