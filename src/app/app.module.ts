import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarModule } from 'primeng/menubar';
import { TransComponent, TransModule } from './components/trans/trans.component';
import { TransOriginalComponent } from './components/trans/trans-original/trans-original.component';
import { TransTranslatedComponent } from './components/trans/trans-translated/trans-translated.component';
import { TransEditComponent } from './components/trans/trans-edit/trans-edit.component';
import { TransCommonService } from './services/trans-common.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    TransModule
  ],
  providers: [TransCommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
