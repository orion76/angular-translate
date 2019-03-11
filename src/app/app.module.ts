import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarModule } from 'primeng/menubar';
import { TransModule } from './components/trans/trans.component';



import { TransCommonService } from './services/trans-common.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    TransModule
  ],
  providers: [TransCommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
