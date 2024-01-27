import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_ENDPOINT } from "../config/app";

  @Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
  
    protected http: HttpClient;

    constructor(http: HttpClient) {
      this.http = http;
    }
  
    public getCategories(): Observable<any>{
        return this.http.get<any>(BASE_ENDPOINT+'/getCategories', {});
    }

}