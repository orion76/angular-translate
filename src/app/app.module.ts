import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigService, APP_CONFIG_SERVICE } from '@app-library/app-config/app-config.service';
import { MenuMainService, MENU_MAIN_SERVICE } from '@app-library/menu-main/menu-main.service';
import { MenuMainModule } from '@app-library/menu-main/module';
import { UserService, USER_SERVICE } from '@app-library/user';
import { UserAuthService, USER_AUTH_SERVICE } from '@app-library/user/auth.service';
import { AppMenuModule } from '@app/app-menu.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppStoreModule } from '@app/app-store/app-store.module';
import { AppComponent } from '@app/app.component';
import { TranslateService } from '@app/services/translate.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TransModule, TransNewModule } from '@pages/translate';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 5,
      logOnly: true, // Restrict extension to log-only mode
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppStoreModule,
    MenuMainModule,
    AppMenuModule,
    MenubarModule,

    TransModule,
    TransNewModule
  ],
  providers: [
    { provide: APP_CONFIG_SERVICE, useClass: AppConfigService },
    { provide: MENU_MAIN_SERVICE, useClass: MenuMainService },
    TranslateService,
    { provide: USER_AUTH_SERVICE, useClass: UserAuthService },
    { provide: USER_SERVICE, useClass: UserService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
