import { ItemCarrito } from "./itemCarrito";
import { Product } from "./product";

export class Carrito {

    static items: ItemCarrito[] = [];

    static agregarItem(product: Product, cantidad: number){

        this.items.push(new ItemCarrito(product, cantidad));

    }

    static eliminarItem(posicion: number){

        this.items.splice(posicion);

    }

    static obtenerItems(): ItemCarrito[] {
        return this.items;
    }

    static vaciar(){

        this.items = [];

    }

}