import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private toaster: ToastrService,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('accessToken');
        request = request.clone({ headers: request.headers.set('api-key', '12345') });
        if (token) {
            request = request.clone({ headers: request.headers.set('authorization', token) });
        }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // }

        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const responseBody = event.body;
                    if (responseBody.errorCode != 0) {
                        this.toaster.error(responseBody.message)
                        return Observable.create(empty);
                    }
                }
                return event;
            }),
            catchError(err => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    // this.authenticationService.logout();
                    //location.reload(true);
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }
}
