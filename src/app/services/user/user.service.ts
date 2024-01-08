import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public postLogin(url: string , param: any, options: any): Observable<any> {
    return this.httpClient.post(url, param, options);
  }

  public getUser(url: string, options: any): Observable<any> {
    return this.httpClient.get<any>(url, options);
  }

  public postRegist(url: string , param: any, options: any): Observable<any> {
    return this.httpClient.post<any>(url, param , options);
  }

}
