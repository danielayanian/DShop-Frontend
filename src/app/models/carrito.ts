import { ItemCarrito } from "./itemCarrito";
import { Product } from "./product";

/*export abstract class Carrito {

    public static products: ItemCarrito[] = [];

    public static agregarProducto(id: number, cantidad: number){

        item: ItemCarrito = new ItemCarrito(id, cantidad);

    }

    //Carrito.agregarProducto();

}*/

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

    //Carrito.eliminarItem(posicion);

}