import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {IResponseConverterPlugin} from '@app-services/data/response/types';
import {tap} from 'rxjs/internal/operators/tap';
import {APP_CONFIG_SERVICE, IAppConfigService, TEntrypoint} from '@app-library/app-config';
import {of} from 'rxjs/internal/observable/of';


export const RESPONSE_CONVERTER_PLUGIN = new InjectionToken<IResponseConverterPlugin>('RESPONSE_CONVERTER_PLUGIN');

@Injectable()
export class ConvertResponseInterceptor implements HttpInterceptor {
  logEnabled = false;

  constructor(
    @Inject(RESPONSE_CONVERTER_PLUGIN) private plugins: IResponseConverterPlugin[],
    @Inject(APP_CONFIG_SERVICE) private config: IAppConfigService,
  ) {

  }

  log(color: string, ...data: any[]) {
    if (!this.logEnabled) {
      return;
    }
    console.log('%c[INTERCEPTOR]', `color:${color}`, ...data);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return next.handle(req).pipe(
      filter((event) => event instanceof HttpResponse),
      tap((result) => this.log('#d84', '(CONVERT)', result)),
      switchMap((event: HttpResponse<any>) => {

        let converted;
        try {
          converted = this.getPlugin(req.url).convert(event.body);
        } catch (e) {
          console.error(e);
        }

        if ((converted instanceof Observable) === false) {
          converted = of(converted);
        }

        return converted.pipe(map((body: any) => event.clone({body})));
      }),
      tap((result) => this.log('blue', '(CONVERTED)', result)),
    );
    // tap(() => ),
  }

  private getPlugin(url: string): IResponseConverterPlugin {
    const point = this.config.getEntrypoint(url);
    if (!point) {
      console.error('[RESPONSE_CONVERTER_PLUGIN]', 'Entrypoint  for url %s not found', url);
    }
    const candidates = this.plugins
      .filter((plugin: IResponseConverterPlugin) => plugin.entrypoint === point);

    if (candidates.length === 0) {
      console.error('[RESPONSE_CONVERTER_PLUGIN]', 'Converter Plugin for Entrypoint %s not found', point);
    }

    if (candidates.length > 1) {
      console.error('[RESPONSE_CONVERTER_PLUGIN]', 'Found 2 Converter Plugins for Entrypoint %s not found', point, candidates);
    }

    return candidates.pop();
  }
}
