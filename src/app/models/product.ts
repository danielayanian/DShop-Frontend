
export class Product {

    id: number = 0;
    titulo: string = 'a';
    descripcion: string = 'a';
    fotoPrecargada: string = '';
    precio: number = 0;
    idCategoria: number = 0;
    stock: number = 0;

    constructor(id: number, titulo: string, descripcion: string, fotoPrecargada: string, precio: number,
         idCategoria: number, stock: number){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fotoPrecargada = fotoPrecargada;
        this.precio = precio;
        this.idCategoria = idCategoria;
        this.stock = stock;

    }

}