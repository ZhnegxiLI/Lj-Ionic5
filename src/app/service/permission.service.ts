import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Permission } from '../data/class/permission';
import { ApiResponse } from '../data/interface/api-response';

const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  baseurl = environment.apiUrl;
  public permissionList$: Observable<Permission[]>;

  constructor(public http: HttpClient) { }

  getPermissionList(): Observable<Permission[]> {
    if (!this.permissionList$) {
      this.permissionList$ = this.http.get<Permission[]>(this.baseurl + 'api/Permission/GetPermissionList').pipe(shareReplay(CACHE_SIZE));
    }
    return this.permissionList$;
  }
  saveUserPermission(userPermissionParam: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseurl + 'api/Permission/SaveUserPermission', userPermissionParam);
  }
  getUserPermissionById(userId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseurl + 'api/Permission/GetUserPermissionById', {
      params: {
        userId
      }
    });
  }
}
