/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, timeout } from 'rxjs/operators';
import { UtilsService } from './common/utils.service';
import { Router } from '@angular/router';
import { JpushService } from './common/jpush.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private utilsService: UtilsService, private router: Router, private jpush: JpushService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq = request;
    // Set http header
    const token = localStorage.getItem('token');
    if(token){
      cloneReq = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
    }
    // 10 min timeout
    return next.handle(cloneReq).pipe(timeout(30000),catchError(err => this.handleError(err))) as Observable<HttpEvent<any>>;
  }


  private async handleError(error: HttpErrorResponse) {
    if(typeof error.status === 'number'){
      const message = `服务器端发生错误，状态码：${error.status}`;
      const toast = await this.utilsService.createErrorToast(message);
      await toast.present();
      console.error(message);
      if(error.status === 400 || error.status === 401){
        this.jpush.cleanTags();
        this.jpush.getAllTags();
        this.router.navigate(['login'],{ replaceUrl: true});
      }
    }
    else{
      const message = '请求失败';
      const toast = await this.utilsService.createErrorToast(message);
      await toast.present();
      console.error('请求失败');
    }
    return throwError(error);
  }
}


