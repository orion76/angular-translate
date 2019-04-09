import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/primeng';


export type TLabelPosition = 'before' | 'after' | 'inline';

@Component({
  selector: 'label-input',
  template: `
       <label>{{text}}
          <i *ngIf="description" class="fa fa-question-circle"
             [pTooltip]="description" tooltipPosition="bottom">
          </i>
      </label>
`
})
export class FormElementLabelComponent {
  @Input() description = '';
  @Input() text = '';
  @Input() position: TLabelPosition = 'inline';
}

@NgModule({
  declarations: [FormElementLabelComponent],
  imports: [
    CommonModule,
    TooltipModule,
  ],
  exports: [FormElementLabelComponent]
})
export class FormElementLabelModule { }
