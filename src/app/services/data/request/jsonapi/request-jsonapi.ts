import { RequestAbstract } from '../request-abstract';
import { IEntityRequestFilter, IEntityRequestFilterCondition } from '@xangular-store/entity/types';
import { HttpParams } from '@angular/common/http';
import { isArray } from 'util';

export class RequestJsonApi extends RequestAbstract {



  query() {
    let params = new HttpParams();
    params = this.setFilters(params)
    return params;
  }
  path() {
    const path: string[] = this.config.url.split('/').filter(Boolean);
    if (this.request.id) {
      path.push(this.request.id)
    }
    return path.join('/');
  }
  __filters() {
    if (!this.request.filters) {
      return '';
    }

    const config = this.request.filters;
    let filters: string[] = [];
    config.forEach((filter: IEntityRequestFilter) => {
      const root = `filter[${filter.name}][condition]`;
      filters = filters.concat(
        this.condition(filter.condition)
          .map((filter: string) => `${root}${filter}`)
      )
    });
    return filters.join('&');

  }


  setFilters(params: HttpParams): HttpParams {

    if (!this.request.filters) {
      return params;
    }

    const config = this.request.filters;

    config.forEach((filter: IEntityRequestFilter) => {

      const name = `filter[${filter.condition.path.join('][')}]`;
      const value = filter.condition.value;

      params = params.set(name, isArray(value) ? (<string[]>value).join(',') : <string>value);
    });

    return params;
  }


  condition(condition: IEntityRequestFilterCondition) {
    const items: string[] = [];

    items.push(`[path]=${condition.path.join('.')}`);
    items.push(`[operator]=${encodeURIComponent(condition.operator)}`);
    items.push(`[value]=${condition.value}`);

    return items;
  }

}
