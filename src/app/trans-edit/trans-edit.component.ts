import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trans-edit',
  template: `

  `
})
export class TransEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


@NgModule({
  declarations: [TransEditComponent],
  imports: [
    CommonModule
  ],
  exports: [TransEditComponent]
})
export class TransEditModule { }
