import { IUrlGenerator } from '@app-services/data/url/jsonapi/types';
import { IEntityRequest } from '@xangular-store/entity/types';
import { ISourceConfig } from '@app-library/app-config/app-config.service';


export abstract class UrlAbstract implements IUrlGenerator {
  constructor(public request: IEntityRequest, public config: ISourceConfig) { }


  path() {
    const path: string[] = this.config.url.split('/').filter(Boolean);
    if (this.request.id) {
      path.push(this.request.id)
    }
    return path.join('/');
  }

  abstract query(): string


  sourceUrl() {
    return this.path()
  }
}
