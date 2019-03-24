import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateComponent } from '@pages/translate/translate.component';
import { TransNewComponent } from '@pages/translate';
import { UserHomeComponent, UserHomeModule } from '@pages/user/user-home.component';



const routes: Routes = [
  { path: 'trans', component: TranslateComponent },
  { path: 'trans-new', component: TransNewComponent },
  { path: 'user', component: UserHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    UserHomeModule
  ]
})
export class AppRoutingModule { }
