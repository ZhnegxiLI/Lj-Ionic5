import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, ReplaySubject } from 'rxjs';
import { User } from '../data/class/user';
import { ApiResponse } from '../data/interface/api-response';

import { environment } from '../../environments/environment';
import {  shareReplay } from 'rxjs/operators';

const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = environment.apiUrl;
  public userList$: Observable<User[]>;

  constructor(public http: HttpClient) { }

  getUserList(): Observable<User[]> {
    if (!this.userList$) {
      this.userList$ = this.http.get<User[]>(this.baseurl + 'api/Auth/getUserList')
        .pipe(
          shareReplay(CACHE_SIZE)
        );
    }
    return this.userList$;
  }

  login(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseurl + 'api/Auth/Login', user);
  }

  checkAvailabilityOfToken(token: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseurl + 'api/Auth/CheckAvailabilityOfToken', {
      params: {
        token
      }
    });
  }
}
