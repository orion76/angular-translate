import { NgModule } from "@angular/core";
import { MenuMainModule } from '@app-library/menu-main/module';
import { IMenuState } from '@app-library/menu-main/store/types';
import { MenuService as TramslateMenuService } from '@pages/translate/menu.service';

const home: IMenuState = {
  place: 'left', path: [], id: 'home', weight: -1000,
  item: { label: 'Home', routerLink: '/' }
}


@NgModule({
  imports: [

    MenuMainModule.forRoot([home]),
    MenuMainModule.addService(TramslateMenuService),

  ],
  exports: []
})
export class AppMenuModule { }
