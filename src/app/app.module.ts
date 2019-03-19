import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppStoreModule } from '@app/app-store/app-store.module';
import { AppComponent } from '@app/app.component';
import { TransNewModule } from '@app/components/trans-new/trans-new.component';
import { TransModule } from '@app/components/translate/translate.component';
import { USER_SERVICE } from '@app/services/injection-tokens';
import { TranslateService } from '@app/services/translate.service';
import { UserService } from '@app/services/user.service';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppStoreModule,
    MenubarModule,
    TransModule,
    TransNewModule
  ],
  providers: [
    TranslateService,
    { provide: USER_SERVICE, useClass: UserService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
