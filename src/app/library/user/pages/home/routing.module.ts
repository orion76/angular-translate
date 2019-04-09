import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeSummaryComponent} from './summary/home-summary.component';


export const routes: Routes = [

  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'summary', component: HomeSummaryComponent},
    ]
  },

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [],
  providers: []
})
export class HomeRoutingModule {
}
