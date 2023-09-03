import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from, lastValueFrom } from 'rxjs';
import { OKTA_AUTH, } from '@okta/okta-angular';
import { Inject, Injectable } from '@angular/core';
import OktaAuth from '@okta/okta-auth-js';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted request:', request);
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const allowedOrigins = [
      /^http:\/\/localhost:8082\/api\/product-categories\/?.*$/,
      /^http:\/\/localhost:8082\/api\/cart\/?.*$/,
      /^http:\/\/localhost:8082\/api\/products\/?.*$/,
      /^http:\/\/localhost:8082\/api\/orders\/?.*$/
    ];
  
    const requestOrigin = request.url.toLowerCase();

    const isOriginAllowed = allowedOrigins.some((allowedOrigin) =>
      allowedOrigin.test(requestOrigin)
    );
  
    if (isOriginAllowed) {
      const accessToken = await this.oktaAuth.getAccessToken();
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
  
    return lastValueFrom(next.handle(request));
  }
}