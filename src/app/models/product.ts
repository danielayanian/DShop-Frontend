
export class Product {

    id: number = 0;
    titulo: string = 'a';
    descripcion: string = 'a';
    precio: string = 'a';

    constructor(id: number, titulo: string, descripcion: string, precio: string){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
    }

}