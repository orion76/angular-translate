import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
debugger;
    if (req.url.includes('jsonplaceholder.typicode.com')) {
        const paramReq = req.clone({
            params: req.params.set(
                'userId',
                '7'
            )
        });
        return next.handle(paramReq);
    } else {
        return next.handle(req);
    }

    }
}
