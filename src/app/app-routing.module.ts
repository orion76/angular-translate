import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransComponent } from './trans/trans.component';

const routes: Routes = [
    {path:'trans',component:TransComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
