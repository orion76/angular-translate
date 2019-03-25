import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent, UserLoginModule } from './user-cabinet/user-login/user-login.component';
import { UserLogoutComponent, UserLogoutModule } from './user-cabinet/user-logout/user-logout.component';
import { UserSummaryComponent, UserSummaryModule } from './user-cabinet/user-summary/user-summary.component';


export const UserRoutes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'logout', component: UserLogoutComponent },
  { path: 'summary', component: UserSummaryComponent },
];


