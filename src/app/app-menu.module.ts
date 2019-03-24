import { NgModule } from "@angular/core";
import { MenuMainModule } from '@app-library/menu-main/module';
import { IMenuState } from '@app-library/menu-main/store/types';

const home: IMenuState = {
  menuId: 'home',
  path: [],
  place: 'left',
  weight: -1000,
  items: [{ label: 'Home', routerLink: '/' }]
}


@NgModule({
  imports: [

    MenuMainModule.forRoot(home),

  ],
  exports: []
})
export class AppMenuModule { }
