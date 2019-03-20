import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateComponent } from './components/translate/translate.component';
import { TransNewComponent } from './components/trans-new/trans-new.component';

const routes: Routes = [
  { path: 'trans', component: TranslateComponent },
  { path: 'trans-new', component: TransNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
