import { UrlAbstract } from '@app-services/data/url/url-abstract';
import { IEntityRequestFilter, IEntityRequestFilterCondition } from '@xangular-store/entity/types';

export class UrlJsonApi extends UrlAbstract {
  query() {
    return this.filters();
  }

  filters_full() {
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


  filters() {
    if (!this.request.filters) {
      return '';
    }

    const config = this.request.filters;
    let filters: string[] = [];
    config.forEach((filter: IEntityRequestFilter) => {
      filters.push(`filter[${filter.condition.path.join('][')}]=${filter.condition.value}`);
    });
    return filters.join('&');

  }


  condition(condition: IEntityRequestFilterCondition) {
    const items: string[] = [];

    items.push(`[path]=${condition.path.join('.')}`);
    items.push(`[operator]=${encodeURIComponent(condition.operator)}`);
    items.push(`[value]=${condition.value}`);

    return items;
  }

}
