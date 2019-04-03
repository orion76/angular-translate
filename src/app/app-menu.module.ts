import { NgModule } from "@angular/core";
import { MenuMainModule } from '@app-library/menu-main/module';
import { IMenuState } from '@app-library/menu-main/store/types';


const home: IMenuState[] = [{
  item: { label: 'Home', routerLink: '/' },
  place: 'left', path: [], id: 'home', weight: -1000,
}]


@NgModule({
  imports: [

    MenuMainModule.forRoot(home),
  ],
  exports: []
})
export class AppMenuModule { }
