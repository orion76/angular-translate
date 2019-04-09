import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserModule} from '@app-library/user/user.module';
// import {UserHomeModule} from '@pages/user/user-home.component';

// import {UserTranslationsModule} from '@pages/user/translations/user-translations.component';


@NgModule({
  imports: [RouterModule.forRoot([], {enableTracing: false})],
  exports: [
    RouterModule,
    UserModule,

  ]
})
export class AppRoutingModule {
}
