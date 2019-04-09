import {NgModule} from '@angular/core';
import {MenuMainModule} from '@app-library/menu-main/module';
import {TranslateMenuService} from '@pages/translate/menu.service';
import {RouterModule, Routes} from '@angular/router';
import {TranslateComponent, TransModule} from '@pages/translate/translate.component';
import {UserTranslationsComponent, UserTranslationsModule} from '@pages/user/translations/user-translations.component';
import {TranslateFormComponent, TranslateFormModule} from '@pages/translate/source/translate/form/translate-form.component';


const routes: Routes = [
  {path: 'translate/edit', component: TranslateComponent},
  {path: 'translate/:id/edit', component: TranslateFormComponent},
  {path: 'user/translate', component: UserTranslationsComponent},

];

@NgModule({

  imports: [
    RouterModule.forChild(routes),
    MenuMainModule.addService(TranslateMenuService),
    UserTranslationsModule,
    TranslateFormModule,
    TransModule
  ],

  providers: []
})
export class TranslateRootModule {
}
