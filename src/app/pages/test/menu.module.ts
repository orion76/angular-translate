import { NgModule } from "@angular/core";
import { MenuMainModule } from '@app-library/menu-main/module';
import { IMenuState } from '@app-library/menu-main/store/types';

const home: IMenuState = {
  item: { label: 'Home', routerLink: '/' },
  place: 'left', path: [], id: 'home', weight: -1000,
}

const menu: IMenuState[] = [
  {
    item: { label: 'Test', routerLink: '/test' },
    place: 'middle', path: [], id: 'test',
  },
  {
    item: { label: 'JsonApi', routerLink: '/test/jsonapi' },
    place: 'middle', path: ['test'], id: 'jsonapi'
  }
]

@NgModule({
  imports: [

    MenuMainModule.forRoot(menu),

  ],
  exports: []
})
export class TestJsonApiMenuModule { }
