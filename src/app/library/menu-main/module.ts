import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {MenuMainComponent} from '@app-library/menu-main/menu-main.component';
import {
  MenuMainService,
  MENU_MAIN_SERVICE,
  MENU_MAIN_STATE,
  MENU_MODULE_SERVICE,
  MENU_SECONDARY,
} from '@app-library/menu-main/menu-main.service';
import {IMenuState} from '@app-library/menu-main/store/types';
import {MenubarModule} from '@app-library/primeng/menubar/menubar';
import {IMenuSecondary} from '@app-library/menu-main/types';


const home: IMenuState[] = [{
  item: {label: 'Home', routerLink: '/', weight: -1000},
  menuName: 'main-left', path: [], id: 'home',
}];


@NgModule({
  declarations: [MenuMainComponent],
  imports: [
    CommonModule,
    MenubarModule

  ],
  exports: [MenuMainComponent],
  providers: [
    {provide: MENU_MAIN_SERVICE, useClass: MenuMainService},
    {provide: MENU_MAIN_STATE, multi: true, useValue: home},
    {provide: MENU_SECONDARY, multi: true, useValue: {name: 'main-left'}},
    {provide: MENU_SECONDARY, multi: true, useValue: {name: 'main-middle'}},
    {provide: MENU_SECONDARY, multi: true, useValue: {name: 'main-right'}}
  ]
})
export class MenuMainModule {
  static forRoot(state: IMenuState[]): ModuleWithProviders<MenuMainModule> {
    return {
      ngModule: MenuMainModule, providers: [
        {provide: MENU_MAIN_STATE, multi: true, useValue: state}
      ]
    };
  }

  static addService(serviceClass: any): ModuleWithProviders<MenuMainModule> {
    return {
      ngModule: MenuMainModule, providers: [
        {provide: MENU_MODULE_SERVICE, multi: true, useClass: serviceClass},
      ]
    };
  }

  static addSecondary(menu: IMenuSecondary): ModuleWithProviders<MenuMainModule> {
    return {
      ngModule: MenuMainModule, providers: [
        {provide: MENU_SECONDARY, multi: true, useValue: menu}
      ]
    };
  }

}
