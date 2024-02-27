import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Purchase } from "../models/purchase";

@Injectable({
    providedIn: 'root'
  })
  export class PurchaseService {
  
    constructor(private httpClient: HttpClient) { }

    public listarComprasDeUnUsuario(url: string, options: any): Observable<any> {
      return this.httpClient.get<any>(url, options);
    }

    public agregarCompraDeUnUsuario(url: string, purchase: Purchase, options: any): Observable<any> {
      return this.httpClient.post<any>(url, purchase, options);
    }

}
  