import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../data/interface/api-response';


const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class OrderValidationService {
  baseurl = environment.apiUrl;
  public companyName$: Observable<ApiResponse>;
  public unitList$: Observable<ApiResponse>;
  public cargoList$: Observable<ApiResponse>;
  public departmentList$: Observable<ApiResponse>;

  private apiUrlGetCargoByName = this.baseurl + 'api/cargo/GetCargo';
  private apiUrlGetOrdersByUserId = this.baseurl + 'api/SalesOrder/GetSalesOrderByUserId';
  private apiUrlGetSalesOrderCategoriesByUserId = this.baseurl + 'api/SalesOrder/GetSalesOrderCategoriesByUserId';
  private apiUrlGetDeptByName = this.baseurl + 'api/Client';
  private apiUrlGetSalesOrderByOrderId = this.baseurl + 'api/SalesOrder/GetSalesOrderByOrderId';

  private apiUrlGetUnitList = this.baseurl + 'api/cargo/GetUnitList';

  private apiUrlGetUserPermissionById = this.baseurl + 'api/Permission/GetUserPermissionById';

  private apiUrlAdvancedSalesOrderSearch = this.baseurl + 'api/SalesOrder/AdvancedSalesOrderSearch';

  constructor(public http: HttpClient) { }

  getSalesOrderValidationContent(orderId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseurl + 'api/SalesOrder/GetSalesOrderValidationContent', {
      params: {
        orderId
      }
    });
  }

  updateSalesOrderStatut(userId, orderId, applicationContent, statusCode) {
    return this.http.post<ApiResponse>(this.baseurl + 'api/SalesOrder/UpdateSalesOrderStatut',
      { userId, applicationContent, orderId, statutCode: statusCode });
  }

  getSalesOrderValidationList(categoryId: number, type: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseurl + 'api/SalesOrder/GetSalesOrderValidationList', { categoryId, type });
  }

  getCompanyName(): Observable<ApiResponse> {
    if (!this.companyName$) {
      this.companyName$ = this.http.get<ApiResponse>(this.baseurl + 'api/Version/GetCompanyName').pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this.companyName$;
  }

  getUnitList(): Observable<any> {
    if (!this.unitList$) {
      this.http.get(this.apiUrlGetUnitList).pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this.unitList$;
  }

  getCargoByName(limit: number): Observable<any> {
    if (limit === null || limit === -1) {
      if (!this.cargoList$) {
        this.cargoList$ = this.http.get<ApiResponse>(this.apiUrlGetCargoByName, {
          params: {
            limit
          }
        }).pipe(
          shareReplay(CACHE_SIZE)
        );
      }
      return this.cargoList$;
    }
    else {
      return this.http.get(this.apiUrlGetCargoByName, {
        params: {
          limit
        }
      });
    }

  }

  getDepartmentByName(limit: number): Observable<ApiResponse> {
    if (limit === null || limit === -1) {
      if (!this.departmentList$) {
        this.departmentList$ = this.http.get<ApiResponse>(this.baseurl + 'api/Client', {
          params: {
            limit
          }
        }).pipe(
          shareReplay(CACHE_SIZE)
        );
      }
      return this.departmentList$;
    }
    else {
      return this.http.get<ApiResponse>(this.baseurl + 'api/Client', {
        params: { limit }
      });
    }
  }

  getUserPermissionById(userId: string): Observable<any> {
    return this.http.get(this.apiUrlGetUserPermissionById, {
      params: {
        userId
      }
    });
  }

  advancedSalesOrderSearch(criteria: object): Observable<any> {
    return this.http.post(this.apiUrlAdvancedSalesOrderSearch, criteria);
  }


  getOrdersByUserId(userId: string, categoryId: string, type: string, step: number, begin: number): Observable<any> {
    return this.http.get(this.apiUrlGetOrdersByUserId, {
      params: {
        userId,
        categoryId,
        type,
        step,
        begin
      }
    });
  }

  getSalesOrderCategoriesByUserId(userId: string, type: string): Observable<any> {
    return this.http.get(this.apiUrlGetSalesOrderCategoriesByUserId, {
      params: {
        userId,
        type
      }
    });
  }

  getDeptByName(limit: number): Observable<any> {
    return this.http.get(this.apiUrlGetDeptByName, {
      params: { limit }
    });
  }

  getSalesOrderByOrderId(orderId: string): Observable<any> {
    return this.http.get(this.apiUrlGetSalesOrderByOrderId, {
      params: { orderId }
    });
  }

  insertSalesOrderByOrderId(orderInfo, products: Array<any>): Observable<any> {
    return this.http.post(this.baseurl + 'api/SalesOrder/InsertSalesOrderByOrderId', { orderInfo, products });
  }


}
