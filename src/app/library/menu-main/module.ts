import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MenuMainComponent } from '@app-library/menu-main/menu-main.component';
import { MenuMainService, MENU_MAIN_SERVICE, MENU_MAIN_STATE } from '@app-library/menu-main/menu-main.service';
import { IMenuState } from '@app-library/menu-main/store/types';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [MenuMainComponent],
  imports: [
    CommonModule,
    MenuModule

  ],
  exports: [MenuMainComponent],
  providers: [
    { provide: MENU_MAIN_SERVICE, useClass: MenuMainService }

  ]
})
export class MenuMainModule {
  static forRoot(state: IMenuState): ModuleWithProviders<MenuMainModule> {
    return {
      ngModule: MenuMainModule, providers: [
        { provide: MENU_MAIN_STATE, multi: true, useValue: state }
      ]
    };
  }
}
