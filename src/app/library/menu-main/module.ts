import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MenuMainComponent } from '@app-library/menu-main/menu-main.component';
import { MenuMainService, MENU_MAIN_SERVICE, MENU_MAIN_STATE, MENU_SERVICE } from '@app-library/menu-main/menu-main.service';
import { IMenuState } from '@app-library/menu-main/store/types';
import { MenubarModule } from '@app-library/primeng/menubar/menubar';
import { IMenuService } from '@app-library/menu-main/types';

@NgModule({
  declarations: [MenuMainComponent],
  imports: [
    CommonModule,
    MenubarModule

  ],
  exports: [MenuMainComponent],
  providers: [
    { provide: MENU_MAIN_SERVICE, useClass: MenuMainService }

  ]
})
export class MenuMainModule {
  static forRoot(states: IMenuState[]): ModuleWithProviders<MenuMainModule> {
    return {
      ngModule: MenuMainModule, providers: [
        { provide: MENU_MAIN_STATE, multi: true, useValue: states }
      ]
    };
  }
  static addService(service: any): ModuleWithProviders<MenuMainModule> {
    return {
      ngModule: MenuMainModule, providers: [
        { provide: MENU_SERVICE, multi: true, useClass: service }
      ]
    };
  }
}
