import {CommonModule} from '@angular/common';
import {Component, Inject, NgModule, OnInit} from '@angular/core';
import {IUserService, USER_SERVICE} from '@app-library/user';
import {Router, RouterModule} from '@angular/router';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {IEntity} from '@xangular-common/entity';

@Component({
  selector: 'app-user-translations',
  template: `
      <h1>Translations</h1>


      <p-toolbar>
          <div class="ui-toolbar-group-left">
              <button pButton type="button" label="New" (click)="onButton('addNew')" icon="pi pi-plus" class="ui-button-success"></button>

          </div>
      </p-toolbar>
      <p-table [value]="entities" emptymessage="emptyMessage">
          <ng-template pTemplate="header">
              <tr>
                  <th>ID</th>
                  <th>Title</th>
              </tr>
          </ng-template>
          <ng-template pTemplate="body" let-entity>
              <tr>
                  <td>{{entity.id}}</td>
                  <td>{{entity.label}}</td>
              </tr>
          </ng-template>
      </p-table>
  `
})
export class UserTranslationsComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Add new',
      routerLink: 'translate/new/edit',
      styleClass: 'ui-button ui-widget ui-state-default ui-button-text-icon-left'
    }
  ];

  entities: IEntity[] = [];
  emptyMessage = 'Translates is missing';

  constructor(
    private router: Router,
    @Inject(USER_SERVICE) private service: IUserService,
  ) {
  }

  ngOnInit() {

  }

  onButton(name: string) {
    switch (name) {
      case 'addNew':
        this.router.navigate(['/translate/new/edit']);
        break;
    }
  }


}

@NgModule({
  declarations: [UserTranslationsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    TableModule,
    ButtonModule
  ],
  exports: [UserTranslationsComponent],
  providers: []
})
export class UserTranslationsModule {
}
