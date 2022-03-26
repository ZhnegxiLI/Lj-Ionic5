import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ItemType } from '../data/interface/item-type';
@Injectable({
  providedIn: 'root'
})
export class CommodityStockService {
  baseurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getCommodityStock(params: any): Observable<any> {
    return this.http.post(this.baseurl + 'api/commodity-stock', params);
  }

  getCommodityItemType(): Observable<ItemType[]> {
    return this.http.get<ItemType[]>(this.baseurl +'api/commodity-stock/item-type');
  }
}
