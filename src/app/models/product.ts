
export class Product {

    id: number = 0;
    titulo: string = 'a';
    descripcion: string = 'a';
    precio: string = 'a';
    idCategoria: number = 0;

    constructor(id: number, titulo: string, descripcion: string, precio: string, idCategoria: number){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.idCategoria = idCategoria;

    }

}