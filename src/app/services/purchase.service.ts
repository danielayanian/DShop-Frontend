import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_ENDPOINT } from "../config/app";

@Injectable({
    providedIn: 'root'
  })
  export class PurchaseService {
  
    constructor(private httpClient: HttpClient) { }
  
    public listarComprasDeUnUsuario(page: string, size: string, idUser: number): Observable<any> {
      const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('idUser', idUser);

      const httpOptions = {
        params: params,
        withCredentials: true
      };

      return this.httpClient.get<any>(BASE_ENDPOINT+'/listarComprasDeUnUsuario', httpOptions);
    }

}
  