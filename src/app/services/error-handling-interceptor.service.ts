import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingInterceptorService implements HttpInterceptor {

  constructor(private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req)
    .pipe(catchError(error=> {
      if(error.status == '404') alert("Page not found")
      else alert("An error has ocurred, Please, try again later");
      this.router.navigateByUrl("/");
      return throwError(error);
    }));

  }
}
