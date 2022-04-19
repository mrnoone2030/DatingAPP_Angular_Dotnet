import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, share, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<string, HttpResponse<unknown>> = new Map<string, HttpResponse<unknown>>();
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.method.toLowerCase() !== 'get' ){
      return next.handle(request);
    }

    if(request.headers.get("reset") || !this.getTokenFromStorage() || this.shouldDeleteCache(request)) {
      this.cache.delete(request.urlWithParams)
  }
    const cachedResponse: HttpResponse<unknown> = this.cache.get(request.urlWithParams);

    if(cachedResponse){
      return of(cachedResponse);
    }else{
      return next.handle(request).pipe(
        tap(stateEvent => {

          if(stateEvent instanceof HttpResponse) {
            this.cache.set(request.urlWithParams, stateEvent.clone())
        }
        }),
        share()
      )
    }

    
  }

  private getTokenFromStorage(){
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    return token ? true: false;
  }

  private shouldDeleteCache(req: HttpRequest<unknown>): boolean{
    const reqMethods = ['put', 'post', 'update', 'delete', 'patch'];
    for(const method in reqMethods){
      if(method === req.method.toLowerCase()) return true;
    }
    return false;
  }
}
