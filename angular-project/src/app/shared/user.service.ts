import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Register } from './models/register.model';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from './models/login.model';
import { Token } from './models/token.model';
import { ChangePassword } from './models/changePassword.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  register(register:Register) {
    return this.http.post(environment.serverURL + '/api/users', register);
  }

  login(login:Login) : Observable<Token> {
    return this.http.post<Token>(environment.serverURL + '/api/users/login', login);
  }

  changeUserInfo(changedUser:Register){
    return this.http.post<Token>(environment.serverURL + '/api/users/change', changedUser);
  }

  changeUserPassword(changedPassword:ChangePassword){
    return this.http.post<Token>(environment.serverURL + '/api/users/change-password', changedPassword);
  }

  getUserInfo(){
    return this.http.get<Register>(environment.serverURL + '/api/users/user');
  }

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  emitData(data:string) {
    this.observer.next(data);
  }
  
  observerTimeOut = new Subject();
  public subscriber1$ = this.observerTimeOut.asObservable();
  emitData1(data:boolean){
    this.observerTimeOut.next(data);
  }
}
