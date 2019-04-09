import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuMainModule} from '@app-library/menu-main/module';
import {USER_SERVICE, UserService} from '@app-library/user';
import {AppHTTPModule} from '@app/app-http.module';
import {AppMenuModule} from '@app/app-menu.module';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppStoreModule} from '@app/app-store/app-store.module';
import {AppComponent} from '@app/app.component';
import {TranslateService} from '@app/services/translate.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TranslateRootModule} from '@pages/translate/module';
import {AppConfigModule} from '@app-library/app-config/module';
import {UserModule} from '@app-library/user/user.module';
import {AppSourceModule} from '@app/app-source.module';
import {FORM_SERVICE, FormService} from '@app-library/components/form/form.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 15,
      logOnly: true, // Restrict extension to log-only mode
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppSourceModule,
    AppConfigModule,
    AppHTTPModule,
    AppRoutingModule,
    AppStoreModule,
    MenuMainModule,
    AppMenuModule,
    UserModule,
    TranslateRootModule,
  ],
  providers: [
    TranslateService,
    {provide: USER_SERVICE, useClass: UserService},
    {provide: FORM_SERVICE, useClass: FormService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
