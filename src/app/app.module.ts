import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppStoreModule } from '@app/app-store/app-store.module';
import { AppComponent } from '@app/app.component';
import { TranslateService } from '@app/services/translate.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuMainService, MENU_MAIN_SERVICE } from '@app-library/menu-main/menu-main.service';
import { AppMenuModule } from '@app/app-menu.module';
import { MenuMainModule } from '@app-library/menu-main/module';
import { TransModule, TransNewModule } from '@pages/translate';
import { USER_SERVICE, UserService } from '@app-library/user';
import { UserHomeModule } from '@pages/user/user-home.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppStoreModule,
    MenuMainModule,
    AppMenuModule,
    MenubarModule,

    TransModule,
    TransNewModule
  ],
  providers: [
    { provide: MENU_MAIN_SERVICE, useClass: MenuMainService },
    TranslateService,
    { provide: USER_SERVICE, useClass: UserService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
