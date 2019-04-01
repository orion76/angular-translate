import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementLabelModule, TLabelPosition } from './label-input';

@Component({
  selector: 'form-element',
  template: `
        <div *ngIf="!hidden" class="form-field" >
           <label-input [text]="label" [description]="description" [position]="label_position" ></label-input>
           <ng-content></ng-content>
      </div>
`
})
export class FormElementComponent {
  @Input() hidden: boolean;
  @Input() label: string;
  @Input() labe_positions: TLabelPosition;
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
