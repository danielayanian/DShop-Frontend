import { Product } from "./product";

export class Purchase {

    id: number = 0;
    idUser: number = 0;
    idProduct: number = 0;
    fecha: string = '';
    cantidad: number = 0;
    precioUnidad: number = 0;
    product: Product = new Product(0, "", "", "", 0, 0, 0);

    constructor(id: number, idUser: number, idProduct: number, fecha: string, cantidad: number,
        precioUnidad: number, product: Product){
        this.id = id;
        this.idUser = idUser;
        this.idProduct = idProduct;
        this.fecha = fecha;
        this.cantidad = cantidad;
        this.precioUnidad = precioUnidad;
        this.product = product;
        
    }

}