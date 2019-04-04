import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG_SERVICE, IAppConfigService } from '@app-library/app-config';

function trimSlash(str: string): string {
  return str.replace(/^\/+|\/+$/g, '');
}

function clearDoubleSlash(str: string): string {
  return str.replace(/\/\//g, '\/');
}


@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor(@Inject(APP_CONFIG_SERVICE) private config: IAppConfigService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let url = [];
    if (this.config.urlPrefix && this.config.urlPrefix.length > 0) {
      url.push(this.config.urlPrefix);
    }


    if (url.length > 0) {
      url.push(req.url);

      const paramReq = req.clone({
        url: clearDoubleSlash(url.join('/'))
      });
      return next.handle(paramReq);
    } else {
      return next.handle(req);
    }
  }
}
