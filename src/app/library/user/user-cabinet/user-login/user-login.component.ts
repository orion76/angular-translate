import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { IUserService } from '@app-library/user/types';
import { USER_SERVICE } from '@app-library/user/user.service';
import { IUserAuthService, USER_AUTH_SERVICE } from '@app-library/user/auth.service';
import { FormElementModule } from '@app-library/components/form/form-element';
import { DATA_SERVICE } from '@app-services/injection-tokens';
import { IDataService } from '@app-services/data';
import { IEntityRequest, EFilterOperator } from '@xangular-store/entity/types';




@Component({
  selector: 'user-login',
  template: `
    <h1>Login</h1>
    <form [formGroup]="formData" >
      <form-element [label]="loginLabel.text" [description]="loginLabel.descriptions">
        <input type="text" pInputText formControlName="login" class="ui-inputtext" />
      </form-element>
      <form-element [label]="passLabel.text" [description]="passLabel.descriptions">
        <input type="password" formControlName="pass" class="ui-inputtext"/>
    </form-element>
    <div class="form-actions">
    <p-button label="Login" (onClick)="handleLogin($event)" styleClass="ui-button-success"></p-button>
    <p-button label="Cancel" (onClick)="handleCancel($event)" styleClass="ui-button-secondary"></p-button>
    </div>
    </form>
  `
})
export class UserLoginComponent implements OnInit {
  formData: FormGroup;
  loginLabel = {
    text: 'Login',
    description: 'Enter your user name'
  }

  passLabel = {
    text: 'Password',
    description: 'Enter your password'
  }

  constructor(
    @Inject(USER_SERVICE) protected service: IUserService,
    @Inject(USER_AUTH_SERVICE) protected auth: IUserAuthService,
    @Inject(DATA_SERVICE) private data: IDataService,
  ) { }

  ngOnInit() {
    this.formData = new FormGroup({
      login: new FormControl('jsonapi'),
      pass: new FormControl('gufnbgj03'),
    });

  }
  handleLogin(event) {
    const value = this.formData.value;
    this.auth.login(value.login, value.pass).subscribe((response: any) => {
      console.log('[handleLogin]', response);
      const request: IEntityRequest = {
        source: 'user',
        filters: [
          {
            name: 'user-name',
            condition: {
              path: ['name'],
              operator: EFilterOperator.EQUAL,
              value: response['current_user']['name']
            }
          }
        ]
      }

      this.data.getItem(request)
        .subscribe((entity: any) => {
          console.log('[USER LOAD]', entity)
        })
    })
  }

  handleCancel(event) {

  }
}


@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormElementModule,
  ],
  exports: [UserLoginComponent]
})
export class UserLoginModule { }
