import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { Purchase } from '../../models/purchase';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { customPaginator } from '../custom-paginator-configuration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [ MatPaginatorModule ],
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
  
  constructor(private purchaseService: PurchaseService, private router: Router){}

  purchases: Purchase[] = [];
  pageSize = 6;
  pageIndex = 0;
  totalItems = 0;
  pageSizeOptions: number[] = [6, 12, 24, 36];

  hayCompras : boolean = false;

  idUser: string = '';

  loadPurchases(){

    this.purchaseService.listarComprasDeUnUsuario(this.pageIndex.toString(), this.pageSize.toString(),
    Number(this.idUser)).subscribe((data) => {

      this.purchases = data.content;
      this.totalItems = data.totalElements;

      if(this.totalItems === 0){
        this.hayCompras = false;
      }else{
        this.hayCompras = true;
      }

    });

  }

  ngOnInit(): void {
    
    this.idUser = sessionStorage.getItem('idUser')!;

    this.loadPurchases();

  }

  onPageChange(event: any) {

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPurchases();

  }

  precioAPrecioConPuntos(precio: number){
    return precio.toLocaleString('de-DE');
  }

  openPublication(id: number){

    this.router.navigate(['publication/' + id]);
    return false;

  }

}
