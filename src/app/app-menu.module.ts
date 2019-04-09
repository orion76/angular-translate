import {NgModule} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';


@NgModule({
  imports: [
    MenubarModule
    // MenuMainModule.forRoot(home),
  ],
  exports: []
})
export class AppMenuModule {
}
