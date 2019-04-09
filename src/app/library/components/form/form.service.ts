import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DATA_SERVICE, IDataService} from '@app-services/data';
import {IEntityRequest} from '@xangular-store/entity/types';
import {createEntity, IEntity} from '@xangular-common/entity';
import {APP_CONFIG_SERVICE, IAppConfigService, ISourceConfig} from '@app-library/app-config';
import {FormFields, IFormFieldType, IFormService, TEntityFields} from '@app-library/components/form/types';
import {FormBuilder, FormGroup} from '@angular/forms';
import {of} from 'rxjs/internal/observable/of';


export const FORM_SERVICE = new InjectionToken<IFormService>('FORM_SERVICE');

@Injectable()
export class FormService implements IFormService {
  constructor(
    @Inject(APP_CONFIG_SERVICE) private config: IAppConfigService,
    @Inject(DATA_SERVICE) private data: IDataService,
    private _fb: FormBuilder
  ) {

  }

  getId(route: ActivatedRoute): Observable<string> {
    return route.params.pipe(map((params: Params) => params['id']));
  }


  getSource<T extends IEntity>(name: string): Observable<ISourceConfig<T>> {
    return this.config.get(name);
  }


  getEntity<T extends IEntity>(config: ISourceConfig<T>, id: string): Observable<T> {
    if (id === 'new') {
      return of(createEntity<T>(config.name, null, config.fields));
    } else {
      const request: IEntityRequest = {source: config.name, id};
      return this.data.getItem<T>(request);
    }

  }

  newEntity<T extends IEntity>(config: ISourceConfig<T>, fields?: any): T {

    return createEntity<T>(config.name, null, fields);
  }

  createForm(): FormGroup {
    return this._fb.group({});
  }


  addControl(form: FormGroup, fieldName: string, config: IFormFieldType) {

    if (config.fields) {
      const group = this._fb.group({});
      form.addControl(fieldName, group);
      this.addControls(group, config.fields);
    } else {
      form.addControl(fieldName, this._fb.control(config.empty));
    }
  }

  addControls<E>(form: FormGroup, fields: TEntityFields<E>) {

    Object.keys(fields).forEach((fieldName) => {
      const fieldType = fields[fieldName];
      const config: IFormFieldType = FormFields[fieldType];
      this.addControl(form, fieldName, config);
    });
  }
}
