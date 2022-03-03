import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommodityStockService {
  baseurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getCommodityStock(params: any): Observable<any> {
    return this.http.get(this.baseurl + 'api/commodity-stock', {
      params
    });
  }
}
