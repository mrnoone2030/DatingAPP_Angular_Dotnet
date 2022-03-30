import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private tostrService: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if(err){
          switch (err.status) {
            case 400:
              if(err.error.errors){
                const modalStateErrors = [];
                for(const key in err.error.errors){
                  if(err.error.errors[key]){
                    modalStateErrors.push(err.error.errors[key]);
                  }
                  
                }
                throw modalStateErrors.flat();
              }else{
                this.tostrService.error(err.statusText, err.status);
              }
              
              break;
            
              case 401:
                this.tostrService.error(err.statusText, err.status);
                break;
              case 404:
                this.router.navigateByUrl('/not-found');
                break;
              case 500:
                const navigationExtras: NavigationExtras = { state: {error: err.error}};
                this.router.navigateByUrl('/server-error',navigationExtras);
                break;

          
            default:
              this.tostrService.error('Something Unexpected went wrong');
              console.log(err);
              break;
          }
        }
        return throwError(()=> new Error(err));
      })
    )
  }
}
