import { Component, OnInit, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from 'selenium-webdriver/http';


@Component({
  selector: 'app-trans-new',
  template: `
  <div>
<label for="url">
  <input name="url" type="text" pInputText [(ngModel)]="url"/>
</label>

<button pButton type="button" label="Download" (click)="Download($event)"></button>
</div>
<div>
<textarea  [(ngModel)]="content"
  [rows]="5"  [cols]="30"
  pInputTextarea
  autoResize="autoResize">
</textarea>
</div>
`
})
export class TransNewComponent implements OnInit {
  public content: string = '';
  public url: string = 'https://www.google.ru';

  constructor() { }

  ngOnInit() {


  }
  Download() {
    const http: XMLHttpRequest = new XMLHttpRequest();;

    http.addEventListener("load", (response: any) => {
debugger;
    });
    http.open("GET", this.url,true);
    http.responseType = "document";
    http.setRequestHeader('Content-Type', 'text/html');
    http.setRequestHeader('Access-Control-Allow-Origin', '*');
    http.withCredentials=true;
    http.send();

    this.content = 'Download';
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
