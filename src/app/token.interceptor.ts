import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') || ''; // Obtén el token desde localStorage

    if (token) {
      // Clona la solicitud y agrega el token en las cabeceras
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `${token}`),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
