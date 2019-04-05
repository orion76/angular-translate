import { NgModule } from '@angular/core';
import { HTTPAuthModule } from '@app-library/user/auth/module';
import { OAuthPluginService } from '@app-library/user/auth/plugins/oauth.plugin';
import { HTTPDataModule } from '@app-services/data/module';


@NgModule({
  declarations: [

  ],
  imports: [
    HTTPDataModule,
    HTTPDataModule.convert(ResponseJsonapiConverter),
    HTTPAuthModule,
    HTTPAuthModule.Auth(OAuthPluginService)
  ],
  providers: [

  ]
})
export class AppHTTPModule { }
