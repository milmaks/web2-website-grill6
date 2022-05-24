import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) { }

  getActiveOrder() : Observable<Order> {
    return this.http.get<Order>(environment.serverURL + '/api/orders/active');
  }
}
