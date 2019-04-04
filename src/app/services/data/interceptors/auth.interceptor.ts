import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

const debug=true;

    if (req.url.startsWith('/oauth')) {
      // headers = headers.set('Content-type', 'application/x-www-form-urlencoded');
    }
    if (debug) {
        const paramReq = req.clone({
            params: req.params.set(
                'XDEBUG_SESSION_START',
                'PHPSTORM'
            )
        });
        return next.handle(paramReq);
    } else {
        return next.handle(req);
    }

    }
}
