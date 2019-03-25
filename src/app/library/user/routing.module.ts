import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent, UserLoginModule } from '@app-library/user/user-cabinet/user-login/user-login.component';
import { UserLogoutComponent, UserLogoutModule } from '@app-library/user/user-cabinet/user-logout/user-logout.component';
import { UserSummaryComponent, UserSummaryModule } from '@app-library/user/user-cabinet/user-summary.component';



const routes: Routes = [
  {
    path: 'user', children: [
      { path: 'login', component: UserLoginComponent },
      { path: 'logout', component: UserLogoutComponent },
      { path: 'summary', component: UserSummaryComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    UserLoginModule,
    UserLogoutModule,
    UserSummaryModule,
  ]
})
export class UserRoutingModule { }
