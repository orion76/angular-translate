import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransComponent } from './trans/trans.component';
import {MenubarModule} from 'primeng/menubar';
import { TransSourceComponent } from './trans-source/trans-source.component';
import { TransResultComponent } from './trans-result/trans-result.component';
import { TransEditComponent } from './trans-edit/trans-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TransComponent,
    TransSourceComponent,
    TransResultComponent,
    TransEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
