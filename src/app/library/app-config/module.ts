import {ModuleWithProviders, NgModule} from '@angular/core';
import {ISourceConfig} from '@app-library/app-config/types';
import {APP_CONFIG_SERVICE, AppConfigService, SOURCE_CONFIG} from '@app-library/app-config/app-config.service';


@NgModule({})
export class AppConfigModule {
  static forRoot(): ModuleWithProviders<AppConfigModule> {
    return {
      ngModule: AppConfigModule, providers: [
        {provide: APP_CONFIG_SERVICE, useClass: AppConfigService}
      ]
    };
  }

  static addSource(configs: ISourceConfig<any>[]): ModuleWithProviders<AppConfigModule> {
    return {
      ngModule: AppConfigModule, providers: [
        {provide: SOURCE_CONFIG, multi: true, useValue: configs}
      ]
    };
  }


}
