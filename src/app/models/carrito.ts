import { ItemCarrito } from "./itemCarrito";

/*export abstract class Carrito {

    public static products: ItemCarrito[] = [];

    public static agregarProducto(id: number, cantidad: number){

        item: ItemCarrito = new ItemCarrito(id, cantidad);

    }

    //Carrito.agregarProducto();

}*/

export class Carrito {

    static items: ItemCarrito[] = [];

    static agregarItem(id: number, cantidad: number){

        this.items.push(new ItemCarrito(id, cantidad));

    }

    static eliminarItem(posicion: number){

        this.items.splice(posicion); //Sino usar filter

    }

    static obtenerItems(): ItemCarrito[] {
        return this.items;
    }

    //Carrito.eliminarItem(posicion);

}