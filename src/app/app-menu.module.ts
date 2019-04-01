import { NgModule } from "@angular/core";
import { MenuMainModule } from '@app-library/menu-main/module';
import { IMenuState } from '@app-library/menu-main/store/types';
import { TestJsonApiMenuModule } from '@pages/test/menu.module';

const home: IMenuState[] = [{
  item: { label: 'Home', routerLink: '/' },
  place: 'left', path: [], id: 'home', weight: -1000,
}]


@NgModule({
  imports: [

    MenuMainModule.forRoot(home),
    TestJsonApiMenuModule
  ],
  exports: []
})
export class AppMenuModule { }
