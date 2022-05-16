import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Delivery } from './models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }

  getDeliveryUsers() : Observable<Delivery[]> {
    return this.http.get<Delivery[]>(environment.serverURL + '/api/administrator');
  }

  changeDeliveryUser(delivery : Delivery) {
    return this.http.post<Delivery>(environment.serverURL + '/api/administrator', delivery);
  }
}
