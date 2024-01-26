import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_ENDPOINT } from "../config/app";
import { Product } from "../models/product";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
  
    protected http: HttpClient;

    protected cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(http: HttpClient) {
      this.http = http;
    }

    public listarDestacados(page: string, size: string): Observable<any>{
      const params = new HttpParams()
      .set('page', page)
      .set('size', size);
      return this.http.get<any>(BASE_ENDPOINT+'/listarDestacados', {params: params});
    }

    public listarOfertas(page: string, size: string): Observable<any>{
      const params = new HttpParams()
      .set('page', page)
      .set('size', size);
      return this.http.get<any>(BASE_ENDPOINT+'/listarOfertas', {params: params});
    }

    public listarTelevisores(page: string, size: string): Observable<any>{
      const params = new HttpParams()
      .set('page', page)
      .set('size', size);
      return this.http.get<any>(BASE_ENDPOINT+'/listarTelevisores', {params: params});
    }

    public listarCelulares(page: string, size: string): Observable<any>{
      const params = new HttpParams()
      .set('page', page)
      .set('size', size);
      return this.http.get<any>(BASE_ENDPOINT+'/listarCelulares', {params: params});
    }

    public listarNotebooks(page: string, size: string): Observable<any>{
      const params = new HttpParams()
      .set('page', page)
      .set('size', size);
      return this.http.get<any>(BASE_ENDPOINT+'/listarNotebooks', {params: params});
    }

    public getProduct(id: number): Observable<any>{
      //Swal.fire(id+'');
      const params = new HttpParams()
      .set('id', id);
      return this.http.get<any>(BASE_ENDPOINT+'/getProduct', {params: params});
    }

}