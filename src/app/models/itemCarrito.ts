import { Product } from "./product";

export class ItemCarrito {

    public product: Product = new Product(0, '', '', '', 0, 0, 0);
    public cantidad: number = 0;

    constructor(product: Product, cantidad: number){

        this.product = product;
        this.cantidad = cantidad;

    }

}