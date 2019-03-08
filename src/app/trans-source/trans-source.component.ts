import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-trans-source',
  template: `

<div class="source" [innerHtml]="source"></div>
  `
})
export class TransSourceComponent implements OnInit {

  @Input() source;

  constructor() { }

  ngOnInit() {


  }

}

@NgModule({
  declarations: [TransSourceComponent],
  imports: [
    CommonModule
  ],
  exports: [TransSourceComponent]
})
export class TransSourceModule { }
