import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransNewModule } from './components/trans-new/trans-new.component';
import { TransModule } from './components/translate/translate.component';
import { USER_SERVICE } from './services/injection-tokens';
import { TranslatedService } from './services/translated.service';
import { UserService } from './services/user.service';





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    TransModule,
    TransNewModule
  ],
  providers: [
    TranslatedService,
    { provide: USER_SERVICE, useClass: UserService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
