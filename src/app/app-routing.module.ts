import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransComponent } from './components/translate/translate.component';
import { TransNewComponent } from './components/trans-new/trans-new.component';

const routes: Routes = [
  { path: 'trans', component: TransComponent },
  { path: 'trans-new', component: TransNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
