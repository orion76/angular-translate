import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = req.headers;

    // headers = headers.set('', '');

    if (req.url.startsWith('user')) {
      headers = headers.set('Content-type', 'application/json');
    }
    const paramReq = req.clone({
      headers,
      withCredentials: true
    });

    return next.handle(paramReq);
  }
}
