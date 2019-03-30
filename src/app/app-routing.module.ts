import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransNewComponent } from '@pages/translate';
import { TranslateComponent } from '@pages/translate/translate.component';
import { UserHomeModule, UserHomeComponent, UserHomeRoutes } from '@pages/user/user-home.component';
import { UserRoutes } from '@app-library/user/routes';
import { UserTranslationsModule } from '@pages/user/translations/user-translations.component';

const routesUser: Routes = UserRoutes;

const routes: Routes = [
  { path: 'trans', component: TranslateComponent },
  { path: 'trans-new', component: TransNewComponent },
  {
    path: 'user', component: UserHomeComponent,
    children: routesUser.concat(UserHomeRoutes)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [
    RouterModule,
    UserHomeModule,
    UserTranslationsModule
  ]
})
export class AppRoutingModule { }
