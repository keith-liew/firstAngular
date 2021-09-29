import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req:any, next:any){
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: 'Bearer e807a4c5db1d88029d8d4379db80f3ef8783f402cd841f948563381623245720'
      }
    })
    return next.handle(tokenizedReq);
  }
}
