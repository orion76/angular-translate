import { Component, OnInit, NgModule } from '@angular/core';
import { transSource } from './source';
import { CommonModule } from '@angular/common';
import { TransSourceModule } from '../trans-source/trans-source.component';
import { TransResultModule } from '../trans-result/trans-result.component';
import { TransEditModule } from '../trans-edit/trans-edit.component';

@Component({
  selector: 'app-trans',
  template: `
  <app-trans-source [source]="source"></app-trans-source>
  <app-trans-result></app-trans-result>
  <app-trans-edit></app-trans-edit>
  `
})
export class TransComponent implements OnInit {

  source: string;

  constructor() { }

  ngOnInit() {
    this.source = transSource;
  }

}

@NgModule({
  declarations: [TransComponent],
  imports: [
    CommonModule, TransSourceModule, TransResultModule, TransEditModule
  ],
  exports: [TransComponent]
})
export class TransModule { }
