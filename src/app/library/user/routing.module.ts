import {RouterModule, Routes} from '@angular/router';
import {UserLoginComponent} from './pages/user/user-login/user-login.component';
import {UserLogoutComponent} from './pages/user/user-logout/user-logout.component';
import {HomeSummaryComponent} from './pages/home/summary/home-summary.component';
import {NgModule} from '@angular/core';
import {UserComponent} from '@app-library/user/user.component';
import {HomeComponent} from '@app-library/user/pages/home/home.component';


export const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'login', component: UserLoginComponent},
      {path: 'logout', component: UserLogoutComponent},

    ]

  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule'
  },

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: []
})
export class UserRoutingModule {
}
