import {NgModule} from '@angular/core';
import {SourceUserModule} from '@app-library/user/source/source.module';
import {SourceTranslateModule} from '@pages/translate/source/source.module';
import {AppConfigModule} from '@app-library/app-config/module';


@NgModule({
  imports: [
    SourceUserModule,
    SourceTranslateModule,
    AppConfigModule.forRoot()
  ],
  exports: []
})
export class AppSourceModule {
}
