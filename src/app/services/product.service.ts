import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_ENDPOINT } from "../config/app";

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
  
    protected http: HttpClient;

    protected cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(http: HttpClient) {
      this.http = http;
    }

    public listarPaginas(page: string, size: string): Observable<any>{
      const params = new HttpParams()
      .set('page', page)
      .set('size', size);
      return this.http.get<any>(BASE_ENDPOINT+'/pagina', {params: params});
    }

}