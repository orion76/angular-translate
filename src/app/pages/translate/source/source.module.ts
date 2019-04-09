import {NgModule} from '@angular/core';
import {AppConfigModule} from '@app-library/app-config/module';
import {configs} from './source.config';


@NgModule({

  imports: [
    AppConfigModule.addSource(configs),
  ],

  providers: []
})
export class SourceTranslateModule {
}
