import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

  @Injectable({
    providedIn: 'root'
  })
  export class ProductService {
  
    protected http: HttpClient;

    protected cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(http: HttpClient) {
      this.http = http;
    }

    public listarDestacados(url: string, params: any): Observable<any>{
      return this.http.get<any>(url, {params: params});
    }

    public listarOfertas(url: string, params: any): Observable<any>{
      return this.http.get<any>(url, {params: params});
    }

    public listarProductosDeUnaCategoria(url: string, params: any): Observable<any>{
      return this.http.get<any>(url, {params: params});
    }
    
    public listarBusqueda(url: string, params: any): Observable<any>{
      return this.http.get<any>(url, {params: params});
    }

    public listarProductosDestPorPrecio(url: string, params: any): Observable<any>{
      return this.http.get<any>(url, {params: params});
    }

    public listarProductosOfertasPorPrecio(url: string, params: any): Observable<any>{
      return this.http.get<any>(url, {params: params});
    }

    public listarProductosDeUnaCategPorPrecio(url: string, params: any): Observable<any>{
      return this.http.get<any>(url, {params: params});
    }

    public listarBusquedaPorPrecio(url: string, params: any): Observable<any>{
      return this.http.get<any>(url, {params: params});
    }

    public getProduct(url: string, params: any): Observable<any>{
      return this.http.get<any>(url, {params: params});
    }

    public updateProduct(url: string, param: any, options: any): Observable<any>{
      return this.http.post<any>(url, param, options);
    }

}