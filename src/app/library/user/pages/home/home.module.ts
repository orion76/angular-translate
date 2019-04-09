import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '@app-library/user/pages/home/home.component';
import {HomeRoutingModule} from '@app-library/user/pages/home/routing.module';
import {MenuMainModule} from '@app-library/menu-main/module';
import {UserMenuService} from '@app-library/user/menu.service';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule,
    CommonModule,
    HomeRoutingModule,
    MenuMainModule.addService(UserMenuService),
  ],
  exports: [HomeComponent]
})
export class HomeModule {
}
